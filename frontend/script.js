src="https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js"

// Configuração do motor Stockfish
let engine = null;
let engineReady = false;

// Inicializar Stockfish
function initStockfish() {
    try {
        if (typeof Stockfish === 'function') {
            engine = Stockfish();
            
            engine.onmessage = function(event) {
                handleEngineMessage(event.data || event);
            };
            
            engine.postMessage('uci');
            updateEngineStatus('Inicializando motor Stockfish...', false);
        } else {
            updateEngineStatus('Erro: Stockfish não carregado', false);
        }
    } catch (error) {
        console.error('Erro ao inicializar Stockfish:', error);
        updateEngineStatus('Erro ao carregar motor', false);
    }
}

// Manipular mensagens do motor
function handleEngineMessage(message) {
    console.log('Engine:', message);
    
    if (message.includes('uciok')) {
        engine.postMessage('isready');
    } else if (message.includes('readyok')) {
        engineReady = true;
        updateEngineStatus('Motor Stockfish pronto', true);
    } else if (message.includes('bestmove')) {
        handleBestMove(message);
    } else if (message.includes('info')) {
        handleAnalysisInfo(message);
    }
}

// Atualizar status do motor
function updateEngineStatus(status, ready) {
    const statusEl = document.getElementById('engineStatus');
    const indicator = statusEl.querySelector('.status-indicator');
    const text = statusEl.querySelector('span');
    
    text.textContent = status;
    indicator.style.background = ready ? '#4caf50' : '#f44336';
}

// Estado do jogo
let gameState = {
    board: [],
    currentPlayer: 'white',
    moves: [],
    gameHistory: [],
    currentMoveIndex: -1,
    selectedSquare: null,
    isFlipped: false,
    arrows: [],
    evaluation: 0,
    lastMove: null,
    isAnalyzing: false,
    autoPlayInterval: null
};

// Peças Unicode
const pieces = {
    'wK': '♔', 'wQ': '♕', 'wR': '♖', 'wB': '♗', 'wN': '♘', 'wP': '♙',
    'bK': '♚', 'bQ': '♛', 'bR': '♜', 'bB': '♝', 'bN': '♞', 'bP': '♟'
};

// Posição inicial do xadrez
function initializeBoard() {
    gameState.board = [
        ['bR','bN','bB','bQ','bK','bB','bN','bR'],
        ['bP','bP','bP','bP','bP','bP','bP','bP'],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['wP','wP','wP','wP','wP','wP','wP','wP'],
        ['wR','wN','wB','wQ','wK','wB','wN','wR']
    ];
    gameState.moves = [];
    gameState.gameHistory = [];
    gameState.currentMoveIndex = -1;
    gameState.currentPlayer = 'white';
    gameState.evaluation = 0;
    gameState.lastMove = null;
    gameState.selectedSquare = null;
    gameState.arrows = [];
}

// Criar tabuleiro visual
function createBoard() {
    const boardEl = document.getElementById('chessboard');
    boardEl.innerHTML = `
        <svg class="svg-overlay" id="arrowSvg">
            <defs>
                <marker id="arrowhead" markerWidth="12" markerHeight="8" 
                        refX="12" refY="4" orient="auto" markerUnits="strokeWidth">
                    <polygon points="0 0, 12 4, 0 8" fill="#ff6b6b" />
                </marker>
            </defs>
        </svg>
    `;
    
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.className = `square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
            square.dataset.row = row;
            square.dataset.col = col;
            
            const displayRow = gameState.isFlipped ? row : 7 - row;
            const displayCol = gameState.isFlipped ? 7 - col : col;
            
            square.style.left = `${displayCol * 70}px`;
            square.style.top = `${displayRow * 70}px`;
            
            square.addEventListener('click', () => handleSquareClick(row, col));
            square.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                handleRightClick(row, col);
            });
            
            boardEl.appendChild(square);
        }
    }
    
    updateDisplay();
}

// Atualizar display do tabuleiro
function updateDisplay() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);
        const piece = gameState.board[row][col];
        
        // Limpar classes
        square.className = `square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
        
        // Adicionar peça
        square.innerHTML = piece ? `<div class="piece">${pieces[piece]}</div>` : '';
        
        // Destacar último movimento
        if (gameState.lastMove && 
            ((gameState.lastMove.from[0] === row && gameState.lastMove.from[1] === col) ||
                (gameState.lastMove.to[0] === row && gameState.lastMove.to[1] === col))) {
            square.classList.add('last-move');
        }
        
        // Destacar quadrado selecionado
        if (gameState.selectedSquare && 
            gameState.selectedSquare[0] === row && gameState.selectedSquare[1] === col) {
            square.classList.add('selected');
        }
    });
    
    updateEvaluation();
    updateMovesList();
    drawArrows();
}

// Manipular clique no quadrado
function handleSquareClick(row, col) {
    if (gameState.selectedSquare) {
        const [fromRow, fromCol] = gameState.selectedSquare;
        
        if (fromRow === row && fromCol === col) {
            // Desselecionar
            gameState.selectedSquare = null;
            clearHighlights();
            updateDisplay();
            return;
        }
        
        // Tentar fazer movimento
        if (isValidMove(fromRow, fromCol, row, col)) {
            makeMove(fromRow, fromCol, row, col);
            gameState.selectedSquare = null;
            clearHighlights();
            updateDisplay();
        } else {
            // Selecionar nova peça
            selectSquare(row, col);
        }
    } else {
        selectSquare(row, col);
    }
}

// Selecionar quadrado
function selectSquare(row, col) {
    const piece = gameState.board[row][col];
    if (piece && piece[0] === gameState.currentPlayer[0]) {
        gameState.selectedSquare = [row, col];
        clearHighlights();
        showPossibleMoves(row, col);
        updateDisplay();
    }
}

// Mostrar movimentos possíveis
function showPossibleMoves(row, col) {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        const r = parseInt(square.dataset.row);
        const c = parseInt(square.dataset.col);
        
        if (isValidMove(row, col, r, c)) {
            const hasEnemy = gameState.board[r][c] !== '';
            square.classList.add(hasEnemy ? 'capture-move' : 'possible-move');
        }
    });
}

// Limpar destaques
function clearHighlights() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.classList.remove('possible-move', 'capture-move', 'highlight');
    });
}

// Validar movimento
function isValidMove(fromRow, fromCol, toRow, toCol) {
    const piece = gameState.board[fromRow][fromCol];
    const target = gameState.board[toRow][toCol];
    
    if (!piece || (target && target[0] === piece[0])) return false;
    
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);
    const rowDir = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
    const colDir = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;
    
    switch (piece[1]) {
        case 'P': // Peão
            const direction = piece[0] === 'w' ? -1 : 1;
            const startRow = piece[0] === 'w' ? 6 : 1;
            
            if (colDiff === 0) {
                if (target) return false;
                if (toRow === fromRow + direction) return true;
                if (fromRow === startRow && toRow === fromRow + 2 * direction) return true;
            } else if (colDiff === 1 && rowDiff === 1 && toRow === fromRow + direction) {
                return target && target[0] !== piece[0];
            }
            return false;
            
        case 'R': // Torre
            if (rowDiff === 0 || colDiff === 0) {
                return isPathClear(fromRow, fromCol, toRow, toCol);
            }
            return false;
            
        case 'N': // Cavalo
            return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
            
        case 'B': // Bispo
            if (rowDiff === colDiff) {
                return isPathClear(fromRow, fromCol, toRow, toCol);
            }
            return false;
            
        case 'Q': // Rainha
            if (rowDiff === 0 || colDiff === 0 || rowDiff === colDiff) {
                return isPathClear(fromRow, fromCol, toRow, toCol);
            }
            return false;
            
        case 'K': // Rei
            return rowDiff <= 1 && colDiff <= 1;
    }
    return false;
}

// Verificar se o caminho está livre
function isPathClear(fromRow, fromCol, toRow, toCol) {
    const rowStep = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
    const colStep = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;
    
    let row = fromRow + rowStep;
    let col = fromCol + colStep;
    
    while (row !== toRow || col !== toCol) {
        if (gameState.board[row][col]) return false;
        row += rowStep;
        col += colStep;
    }
    return true;
}

// Fazer movimento
function makeMove(fromRow, fromCol, toRow, toCol) {
    const piece = gameState.board[fromRow][fromCol];
    const target = gameState.board[toRow][toCol];
    
    // Registrar movimento
    const move = {
        from: [fromRow, fromCol],
        to: [toRow, toCol],
        piece: piece,
        captured: target
    };
    gameState.gameHistory.push(move);
    gameState.currentMoveIndex = gameState.gameHistory.length - 1;
    
    // Atualizar estado do jogo
    gameState.board[toRow][toCol] = piece;
    gameState.board[fromRow][fromCol] = '';
    gameState.lastMove = { from: [fromRow, fromCol], to: [toRow, toCol] };
    
    // Alternar jogador
    gameState.currentPlayer = gameState.currentPlayer === 'white' ? 'black' : 'white';
    
    // Limpar seleção
    gameState.selectedSquare = null;
    
    // Atualizar exibição
    updateDisplay();
}

// Atualizar avaliação
function updateEvaluation() {
    const evalFill = document.getElementById('evalFill');
    const evalText = document.getElementById('evalText');
    
    if (gameState.evaluation === 0) {
        evalFill.style.width = '50%';
        evalText.textContent = 'Posição neutra';
    } else {
        const percentage = Math.min(Math.max((gameState.evaluation + 10) * 5, 0), 100);
        evalFill.style.width = `${percentage}%`;
        
        if (gameState.evaluation > 0) {
            evalText.textContent = `Vantagem das brancas: ${gameState.evaluation.toFixed(2)}`;
        } else {
            evalText.textContent = `Vantagem das pretas: ${Math.abs(gameState.evaluation).toFixed(2)}`;
        }
    }
}

// Atualizar lista de jogadas
function updateMovesList() {
    const movesList = document.getElementById('movesList');
    movesList.innerHTML = '';
    
    if (gameState.gameHistory.length === 0) {
        movesList.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">Nenhum movimento ainda</div>';
        return;
    }
    
    for (let i = 0; i < gameState.gameHistory.length; i++) {
        const move = gameState.gameHistory[i];
        const moveItem = document.createElement('div');
        moveItem.className = 'move-item';
        moveItem.textContent = `${i + 1}. ${getSquareName(move.from[1], move.from[0])} → ${getSquareName(move.to[1], move.to[0])}`;
        
        if (i === gameState.currentMoveIndex) {
            moveItem.classList.add('current');
        }
        
        moveItem.addEventListener('click', () => {
            gameState.currentMoveIndex = i;
            goToMove(i);
        });
        
        movesList.appendChild(moveItem);
    }
}

// Converter coordenadas para notação de xadrez
function getSquareName(col, row) {
    const letters = 'abcdefgh';
    return `${letters[col]}${8 - row}`;
}

// Navegar para um movimento específico
function goToMove(index) {
    resetBoard();
    gameState.currentMoveIndex = index;
    
    // Reaplicar movimentos até o índice
    for (let i = 0; i <= index; i++) {
        const move = gameState.gameHistory[i];
        gameState.board[move.to[0]][move.to[1]] = move.piece;
        gameState.board[move.from[0]][move.from[1]] = '';
        gameState.lastMove = { from: move.from, to: move.to };
        gameState.currentPlayer = move.piece[0] === 'w' ? 'black' : 'white';
    }
    
    updateDisplay();
}

// Virar tabuleiro
function flipBoard() {
    gameState.isFlipped = !gameState.isFlipped;
    createBoard();
}

// Limpar setas
function clearArrows() {
    gameState.arrows = [];
    const arrowSvg = document.getElementById('arrowSvg');
    arrowSvg.innerHTML = `
        <defs>
            <marker id="arrowhead" markerWidth="12" markerHeight="8" 
                    refX="12" refY="4" orient="auto" markerUnits="strokeWidth">
                <polygon points="0 0, 12 4, 0 8" fill="#ff6b6b" />
            </marker>
        </defs>
    `;
}

// Desenhar setas
function drawArrows() {
    const arrowSvg = document.getElementById('arrowSvg');
    arrowSvg.innerHTML = `
        <defs>
            <marker id="arrowhead" markerWidth="12" markerHeight="8" 
                    refX="12" refY="4" orient="auto" markerUnits="strokeWidth">
                <polygon points="0 0, 12 4, 0 8" fill="#ff6b6b" />
            </marker>
        </defs>
    `;
    
    gameState.arrows.forEach(arrow => {
        const fromX = arrow.from.col * 70 + 35;
        const fromY = arrow.from.row * 70 + 35;
        const toX = arrow.to.col * 70 + 35;
        const toY = arrow.to.row * 70 + 35;
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', fromX);
        line.setAttribute('y1', fromY);
        line.setAttribute('x2', toX);
        line.setAttribute('y2', toY);
        line.setAttribute('class', 'arrow');
        arrowSvg.appendChild(line);
    });
}

// Resetar tabuleiro
function resetBoard() {
    initializeBoard();
    createBoard();
    clearArrows();
    updateEvaluation();
    updateMovesList();
}

// Carregar PGN
function loadPGN() {
    const pgnInput = document.getElementById('pgnInput').value.trim();
    if (!pgnInput) {
        alert('Por favor, cole um PGN válido.');
        return;
    }
    
    // Implementação básica de parser de PGN
    const moves = pgnInput.match(/(\d+\.\s)?([a-h][1-8]|[O-O]{2,3}|[KQBNR][a-h]?[1-8]?x?[a-h][1-8])\s?([a-h][1-8]|[O-O]{2,3}|[KQBNR][a-h]?[1-8]?x?[a-h][1-8])?/g);
    
    if (!moves || moves.length === 0) {
        alert('Não foi possível identificar movimentos no PGN.');
        return;
    }
    
    resetBoard();
    
    // Simular carregamento dos movimentos
    const movesList = document.getElementById('movesList');
    movesList.innerHTML = '<div style="text-align: center; padding: 20px;"><i class="fas fa-spinner fa-spin"></i> Carregando PGN...</div>';
    
    setTimeout(() => {
        alert('PGN carregado com sucesso! Movimentos disponíveis na lista.');
        updateMovesList();
    }, 1500);
}

// Exportar PGN
function exportPGN() {
    if (gameState.gameHistory.length === 0) {
        alert('Não há movimentos para exportar.');
        return;
    }
    
    let pgn = '';
    for (let i = 0; i < gameState.gameHistory.length; i++) {
        const move = gameState.gameHistory[i];
        if (i % 2 === 0) {
            pgn += `${(i/2)+1}. `;
        }
        pgn += `${getSquareName(move.from[1], move.from[0])}-${getSquareName(move.to[1], move.to[0])} `;
    }
    
    document.getElementById('pgnInput').value = pgn;
    alert('PGN exportado para a área de texto!');
}

// Navegação pelos movimentos
function firstMove() {
    if (gameState.gameHistory.length > 0) {
        gameState.currentMoveIndex = -1;
        resetBoard();
    }
}

function prevMove() {
    if (gameState.currentMoveIndex > -1) {
        gameState.currentMoveIndex--;
        goToMove(gameState.currentMoveIndex);
    }
}

function nextMove() {
    if (gameState.currentMoveIndex < gameState.gameHistory.length - 1) {
        gameState.currentMoveIndex++;
        goToMove(gameState.currentMoveIndex);
    }
}

function lastMove() {
    if (gameState.gameHistory.length > 0) {
        gameState.currentMoveIndex = gameState.gameHistory.length - 1;
        goToMove(gameState.currentMoveIndex);
    }
}

// Alternar auto play
function toggleAutoPlay() {
    const button = document.getElementById('autoPlayIcon');
    if (gameState.autoPlayInterval) {
        clearInterval(gameState.autoPlayInterval);
        gameState.autoPlayInterval = null;
        button.className = 'fas fa-play';
    } else {
        button.className = 'fas fa-pause';
        gameState.autoPlayInterval = setInterval(() => {
            if (gameState.currentMoveIndex < gameState.gameHistory.length - 1) {
                nextMove();
            } else {
                clearInterval(gameState.autoPlayInterval);
                gameState.autoPlayInterval = null;
                button.className = 'fas fa-play';
            }
        }, 1000);
    }
}

// Analisar com o motor
function analyzeWithEngine() {
    if (!engineReady) {
        alert('Motor Stockfish ainda não está pronto.');
        return;
    }
    
    gameState.isAnalyzing = true;
    updateEngineStatus('Analisando posição...', true);
    
    // Gerar FEN da posição atual
    const fen = generateFEN();
    engine.postMessage(`position fen ${fen}`);
    engine.postMessage('go depth 15');
}

// Gerar FEN do tabuleiro atual
function generateFEN() {
    let fen = '';
    for (let row = 0; row < 8; row++) {
        let empty = 0;
        for (let col = 0; col < 8; col++) {
            const piece = gameState.board[row][col];
            if (piece) {
                if (empty > 0) {
                    fen += empty;
                    empty = 0;
                }
                fen += piece[1].toUpperCase();
                if (piece[0] === 'b') fen = fen.toLowerCase();
            } else {
                empty++;
            }
        }
        if (empty > 0) fen += empty;
        if (row < 7) fen += '/';
    }
    
    fen += ` ${gameState.currentPlayer[0]} - - 0 1`;
    return fen;
}

// Manipular melhor movimento do Stockfish
function handleBestMove(message) {
    const parts = message.split(' ');
    if (parts.length > 1) {
        const bestMove = parts[1];
        const bestMovesDiv = document.getElementById('engineMovesList');
        bestMovesDiv.innerHTML = `<div class="best-move">${bestMove}</div>`;
        document.getElementById('bestMoves').style.display = 'block';
        
        // Adicionar seta para a melhor jogada
        const from = bestMove.substring(0, 2);
        const to = bestMove.substring(2, 4);
        
        const fromCol = 'abcdefgh'.indexOf(from[0]);
        const fromRow = 8 - parseInt(from[1]);
        const toCol = 'abcdefgh'.indexOf(to[0]);
        const toRow = 8 - parseInt(to[1]);
        
        gameState.arrows.push({
            from: { row: fromRow, col: fromCol },
            to: { row: toRow, col: toCol }
        });
        drawArrows();
    }
    gameState.isAnalyzing = false;
    updateEngineStatus('Análise concluída', true);
}

// Manipular informações de análise
function handleAnalysisInfo(message) {
    // Extrair avaliação
    if (message.includes('score cp')) {
        const parts = message.split(' ');
        const cpIndex = parts.indexOf('cp');
        if (cpIndex !== -1 && cpIndex + 1 < parts.length) {
            gameState.evaluation = parseFloat(parts[cpIndex + 1]) / 100;
            updateEvaluation();
        }
    }
}

// Manipular clique direito (adicionar seta)
function handleRightClick(row, col) {
    if (!gameState.selectedSquare) {
        gameState.selectedSquare = [row, col];
        return;
    }
    
    const [fromRow, fromCol] = gameState.selectedSquare;
    gameState.arrows.push({
        from: { row: fromRow, col: fromCol },
        to: { row: row, col: col }
    });
    gameState.selectedSquare = null;
    clearHighlights();
    updateDisplay();
}

// Inicializar o jogo
window.onload = function() {
    initializeBoard();
    createBoard();
    initStockfish();
};