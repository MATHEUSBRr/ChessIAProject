const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs').promises;
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middlewares de segurança e configuração
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requests por IP
    message: { error: 'Muitas requisições. Tente novamente em 15 minutos.' }
});
app.use('/api/', limiter);

// Rate limiting mais restritivo para análise
const analysisLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 10, // máximo 10 análises por minuto
    message: { error: 'Limite de análises excedido. Aguarde 1 minuto.' }
});

// Classe para gerenciar o motor Stockfish
class StockfishEngine {
    constructor() {
        this.process = null;
        this.ready = false;
        this.analyzing = false;
        this.callbacks = new Map();
        this.currentAnalysisId = null;
    }

    async initialize() {
        try {
            // Tentar encontrar o Stockfish no sistema
            const stockfishPath = await this.findStockfish();
            
            this.process = spawn(stockfishPath, [], {
                stdio: ['pipe', 'pipe', 'pipe']
            });

            this.process.stdout.on('data', (data) => {
                this.handleOutput(data.toString());
            });

            this.process.stderr.on('data', (data) => {
                console.error('Stockfish stderr:', data.toString());
            });

            this.process.on('close', (code) => {
                console.log(`Stockfish process exited with code ${code}`);
                this.ready = false;
            });

            // Inicializar UCI
            this.sendCommand('uci');
            
            return new Promise((resolve) => {
                this.callbacks.set('uciok', () => {
                    this.sendCommand('isready');
                    this.callbacks.set('readyok', () => {
                        this.ready = true;
                        console.log('Stockfish engine ready');
                        resolve(true);
                    });
                });
            });
        } catch (error) {
            console.error('Failed to initialize Stockfish:', error);
            return false;
        }
    }

    async findStockfish() {
        const possiblePaths = [
            'stockfish',
            '/usr/bin/stockfish',
            '/usr/local/bin/stockfish',
            '/opt/homebrew/bin/stockfish',
            'C:\\stockfish\\stockfish.exe',
            './stockfish/stockfish'
        ];

        for (const path of possiblePaths) {
            try {
                const testProcess = spawn(path, ['--help'], { stdio: 'ignore' });
                await new Promise((resolve) => {
                    testProcess.on('close', resolve);
                });
                return path;
            } catch (error) {
                continue;
            }
        }
        
        throw new Error('Stockfish not found. Please install Stockfish and ensure it\'s in your PATH.');
    }

    sendCommand(command) {
        if (this.process && this.process.stdin.writable) {
            this.process.stdin.write(command + '\n');
        }
    }

    handleOutput(output) {
        const lines = output.trim().split('\n');
        
        for (const line of lines) {
            console.log('Stockfish:', line);
            
            if (line.includes('uciok')) {
                const callback = this.callbacks.get('uciok');
                if (callback) callback();
            } else if (line.includes('readyok')) {
                const callback = this.callbacks.get('readyok');
                if (callback) callback();
            } else if (line.includes('bestmove')) {
                this.handleBestMove(line);
            } else if (line.includes('info')) {
                this.handleAnalysisInfo(line);
            }
        }
    }

    handleBestMove(line) {
        if (this.currentAnalysisId) {
            const parts = line.split(' ');
            const bestMove = parts[1];
            const ponderMove = parts[3];
            
            io.emit('analysis_complete', {
                id: this.currentAnalysisId,
                bestMove: bestMove,
                ponderMove: ponderMove
            });
            
            this.analyzing = false;
            this.currentAnalysisId = null;
        }
    }

    handleAnalysisInfo(line) {
        if (this.currentAnalysisId) {
            const info = this.parseInfoLine(line);
            if (info) {
                io.emit('analysis_info', {
                    id: this.currentAnalysisId,
                    ...info
                });
            }
        }
    }

    parseInfoLine(line) {
        const info = {};
        const parts = line.split(' ');
        
        for (let i = 0; i < parts.length; i++) {
            switch (parts[i]) {
                case 'depth':
                    info.depth = parseInt(parts[i + 1]);
                    break;
                case 'score':
                    if (parts[i + 1] === 'cp') {
                        info.evaluation = parseInt(parts[i + 2]) / 100;
                    } else if (parts[i + 1] === 'mate') {
                        info.mate = parseInt(parts[i + 2]);
                    }
                    break;
                case 'nodes':
                    info.nodes = parseInt(parts[i + 1]);
                    break;
                case 'nps':
                    info.nps = parseInt(parts[i + 1]);
                    break;
                case 'time':
                    info.time = parseInt(parts[i + 1]);
                    break;
                case 'pv':
                    info.principalVariation = parts.slice(i + 1).join(' ');
                    break;
            }
        }
        
        return Object.keys(info).length > 0 ? info : null;
    }

    async analyzePosition(fen, depth = 15, analysisId = null) {
        if (!this.ready || this.analyzing) {
            throw new Error('Engine not ready or already analyzing');
        }

        this.analyzing = true;
        this.currentAnalysisId = analysisId;

        this.sendCommand(`position fen ${fen}`);
        this.sendCommand(`go depth ${depth}`);
    }

    stop() {
        if (this.process) {
            this.sendCommand('quit');
            this.process.kill();
        }
    }
}

// Instância global do motor
const engine = new StockfishEngine();

// Classe para gerenciar jogos
class GameManager {
    constructor() {
        this.games = new Map();
        this.gameHistory = new Map();
    }

    createGame(gameId, initialFen = null) {
        const game = {
            id: gameId,
            fen: initialFen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            moves: [],
            currentMove: -1,
            players: [],
            spectators: [],
            createdAt: new Date(),
            lastActivity: new Date()
        };
        
        this.games.set(gameId, game);
        return game;
    }

    getGame(gameId) {
        return this.games.get(gameId);
    }

    updateGame(gameId, updates) {
        const game = this.games.get(gameId);
        if (game) {
            Object.assign(game, updates);
            game.lastActivity = new Date();
            return game;
        }
        return null;
    }

    deleteGame(gameId) {
        // Salvar histórico antes de deletar
        const game = this.games.get(gameId);
        if (game) {
            this.gameHistory.set(gameId, {
                ...game,
                deletedAt: new Date()
            });
        }
        return this.games.delete(gameId);
    }

    cleanupInactiveGames() {
        const now = new Date();
        const maxAge = 24 * 60 * 60 * 1000; // 24 horas
        
        for (const [gameId, game] of this.games.entries()) {
            if (now - game.lastActivity > maxAge) {
                this.deleteGame(gameId);
            }
        }
    }
}

// Instância global do gerenciador de jogos
const gameManager = new GameManager();

// Utilitários para xadrez
class ChessUtils {
    static isValidFEN(fen) {
        const fenRegex = /^([rnbqkpRNBQKP1-8]+\/){7}[rnbqkpRNBQKP1-8]+\s[bw]\s(-|[KQkq]+)\s(-|[a-h][36])\s\d+\s\d+$/;
        return fenRegex.test(fen);
    }

    static parsePGN(pgn) {
        // Remover comentários e metadados
        let cleanPgn = pgn.replace(/\{[^}]*\}/g, '');
        cleanPgn = cleanPgn.replace(/\[[^\]]*\]/g, '');
        
        // Extrair movimentos
        const moveRegex = /(\d+\.+\s*)([NBRQK]?[a-h]?[1-8]?x?[a-h][1-8](?:=[NBRQ])?[+#]?|O-O(?:-O)?[+#]?)\s*([NBRQK]?[a-h]?[1-8]?x?[a-h][1-8](?:=[NBRQ])?[+#]?|O-O(?:-O)?[+#]?)?/g;
        
        const moves = [];
        let match;
        
        while ((match = moveRegex.exec(cleanPgn)) !== null) {
            if (match[2]) moves.push(match[2]);
            if (match[3]) moves.push(match[3]);
        }
        
        return moves;
    }

    static generatePGN(moves, headers = {}) {
        let pgn = '';
        
        // Adicionar cabeçalhos
        const defaultHeaders = {
            Event: 'Casual Game',
            Site: 'Chess Analyzer',
            Date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
            Round: '1',
            White: 'Player 1',
            Black: 'Player 2',
            Result: '*'
        };
        
        const allHeaders = { ...defaultHeaders, ...headers };
        
        for (const [key, value] of Object.entries(allHeaders)) {
            pgn += `[${key} "${value}"]\n`;
        }
        
        pgn += '\n';
        
        // Adicionar movimentos
        for (let i = 0; i < moves.length; i += 2) {
            const moveNumber = Math.floor(i / 2) + 1;
            pgn += `${moveNumber}. ${moves[i]}`;
            if (moves[i + 1]) {
                pgn += ` ${moves[i + 1]}`;
            }
            pgn += ' ';
        }
        
        pgn += allHeaders.Result;
        
        return pgn;
    }
}

// Rotas da API
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        engine: engine.ready,
        timestamp: new Date().toISOString()
    });
});

app.post('/api/analyze', analysisLimiter, async (req, res) => {
    try {
        const { fen, depth = 15 } = req.body;
        
        if (!fen || !ChessUtils.isValidFEN(fen)) {
            return res.status(400).json({ error: 'FEN inválido' });
        }
        
        if (!engine.ready) {
            return res.status(503).json({ error: 'Motor de análise não disponível' });
        }
        
        const analysisId = `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        try {
            await engine.analyzePosition(fen, depth, analysisId);
            res.json({ 
                success: true, 
                analysisId,
                message: 'Análise iniciada'
            });
        } catch (error) {
            res.status(409).json({ error: error.message });
        }
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.post('/api/validate-fen', (req, res) => {
    try {
        const { fen } = req.body;
        const isValid = ChessUtils.isValidFEN(fen);
        
        res.json({ 
            valid: isValid,
            fen: fen
        });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao validar FEN' });
    }
});

app.post('/api/parse-pgn', (req, res) => {
    try {
        const { pgn } = req.body;
        
        if (!pgn || typeof pgn !== 'string') {
            return res.status(400).json({ error: 'PGN inválido' });
        }
        
        const moves = ChessUtils.parsePGN(pgn);
        
        res.json({
            success: true,
            moves: moves,
            moveCount: moves.length
        });
    } catch (error) {
        console.error('PGN parse error:', error);
        res.status(400).json({ error: 'Erro ao processar PGN' });
    }
});

app.post('/api/generate-pgn', (req, res) => {
    try {
        const { moves, headers } = req.body;
        
        if (!Array.isArray(moves)) {
            return res.status(400).json({ error: 'Lista de movimentos inválida' });
        }
        
        const pgn = ChessUtils.generatePGN(moves, headers);
        
        res.json({
            success: true,
            pgn: pgn
        });
    } catch (error) {
        console.error('PGN generation error:', error);
        res.status(500).json({ error: 'Erro ao gerar PGN' });
    }
});

// Rotas para gerenciamento de jogos
app.post('/api/games', (req, res) => {
    try {
        const { gameId, initialFen } = req.body;
        
        if (!gameId) {
            return res.status(400).json({ error: 'ID do jogo é obrigatório' });
        }
        
        if (gameManager.getGame(gameId)) {
            return res.status(409).json({ error: 'Jogo já existe' });
        }
        
        const game = gameManager.createGame(gameId, initialFen);
        
        res.json({
            success: true,
            game: game
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar jogo' });
    }
});

app.get('/api/games/:gameId', (req, res) => {
    try {
        const { gameId } = req.params;
        const game = gameManager.getGame(gameId);
        
        if (!game) {
            return res.status(404).json({ error: 'Jogo não encontrado' });
        }
        
        res.json({
            success: true,
            game: game
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar jogo' });
    }
});

app.put('/api/games/:gameId', (req, res) => {
    try {
        const { gameId } = req.params;
        const updates = req.body;
        
        const game = gameManager.updateGame(gameId, updates);
        
        if (!game) {
            return res.status(404).json({ error: 'Jogo não encontrado' });
        }
        
        // Notificar outros clientes sobre a atualização
        io.to(gameId).emit('game_updated', game);
        
        res.json({
            success: true,
            game: game
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar jogo' });
    }
});

// WebSocket handlers
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    socket.on('join_game', (gameId) => {
        socket.join(gameId);
        const game = gameManager.getGame(gameId);
        if (game) {
            socket.emit('game_state', game);
        }
    });
    
    socket.on('leave_game', (gameId) => {
        socket.leave(gameId);
    });
    
    socket.on('make_move', (data) => {
        const { gameId, move, fen } = data;
        const game = gameManager.getGame(gameId);
        
        if (game) {
            game.moves.push(move);
            game.fen = fen;
            game.currentMove = game.moves.length - 1;
            
            io.to(gameId).emit('move_made', {
                move: move,
                fen: fen,
                moveNumber: game.moves.length
            });
        }
    });
    
    socket.on('request_analysis', async (data) => {
        const { fen, depth = 15 } = data;
        
        if (!ChessUtils.isValidFEN(fen)) {
            socket.emit('analysis_error', { error: 'FEN inválido' });
            return;
        }
        
        if (!engine.ready) {
            socket.emit('analysis_error', { error: 'Motor não disponível' });
            return;
        }
        
        const analysisId = `ws_${socket.id}_${Date.now()}`;
        
        try {
            await engine.analyzePosition(fen, depth, analysisId);
            socket.emit('analysis_started', { analysisId });
        } catch (error) {
            socket.emit('analysis_error', { error: error.message });
        }
    });
    
    socket.on('stop_analysis', () => {
        if (engine.analyzing && engine.currentAnalysisId?.includes(socket.id)) {
            engine.sendCommand('stop');
            engine.analyzing = false;
            engine.currentAnalysisId = null;
        }
    });
    
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        
        // Parar análise se foi iniciada por este cliente
        if (engine.analyzing && engine.currentAnalysisId?.includes(socket.id)) {
            engine.sendCommand('stop');
            engine.analyzing = false;
            engine.currentAnalysisId = null;
        }
    });
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
});

// Limpeza automática de jogos inativos
setInterval(() => {
    gameManager.cleanupInactiveGames();
}, 60 * 60 * 1000); // A cada hora

// Inicialização do servidor
async function startServer() {
    const PORT = process.env.PORT || 3000;
    
    try {
        // Inicializar motor Stockfish
        console.log('Inicializando motor Stockfish...');
        const engineReady = await engine.initialize();
        
        if (!engineReady) {
            console.warn('Aviso: Motor Stockfish não foi inicializado. Funcionalidade de análise limitada.');
        }
        
        // Iniciar servidor
        server.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
            console.log(`📊 Motor Stockfish: ${engineReady ? 'Ativo' : 'Inativo'}`);
            console.log(`🔗 WebSocket ativo para análise em tempo real`);
        });
        
    } catch (error) {
        console.error('Erro ao iniciar servidor:', error);
        process.exit(1);
    }
}

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('Recebido SIGTERM, fechando servidor...');
    engine.stop();
    server.close(() => {
        console.log('Servidor fechado.');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('Recebido SIGINT, fechando servidor...');
    engine.stop();
    server.close(() => {
        console.log('Servidor fechado.');
        process.exit(0);
    });
});

// Exportar para testes
module.exports = { app, server, engine, gameManager, ChessUtils };

// Iniciar servidor se executado diretamente
if (require.main === module) {
    startServer();
}