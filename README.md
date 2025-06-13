# Chess Analyzer Backend

Backend completo para análise de xadrez com integração ao motor Stockfish, WebSockets em tempo real e API REST.

## 🚀 Funcionalidades

- **Motor Stockfish**: Análise profunda de posições de xadrez
- **WebSocket**: Comunicação em tempo real para análises
- **API REST**: Endpoints para manipulação de jogos e análises
- **Gerenciamento de Jogos**: Sistema completo para múltiplos jogos simultâneos
- **Rate Limiting**: Proteção contra spam e sobrecarga
- **Validação de FEN**: Validação robusta de posições de xadrez
- **Parser PGN**: Importação e exportação de jogos em formato PGN

## 📋 Pré-requisitos

- Node.js 16+ 
- NPM 8+
- Stockfish (motor de xadrez)

### Instalação do Stockfish

**Ubuntu/Debian:**
```bash
sudo apt-get install stockfish
```

**macOS:**
```bash
brew install stockfish
```

**Windows:**
1. Baixe o Stockfish de [https://stockfishchess.org/download/](https://stockfishchess.org/download/)
2. Extraia e adicione ao PATH do sistema

## 🛠️ Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/your-username/chess-analyzer-backend.git
cd chess-analyzer-backend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
# Edite o arquivo .env conforme necessário
```

4. **Inicie o servidor:**
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 📡 API Endpoints

### Health Check
```http
GET /api/health
```
Retorna o status do servidor e motor Stockfish.

### Análise de Posição
```http
POST /api/analyze
Content-Type: application/json

{
  "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  "depth": 15
}
```

### Validação de FEN
```http
POST /api/validate-fen
Content-Type: application/json

{
  "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
}
```

### Parser PGN
```http
POST /api/parse-pgn
Content-Type: application/json

{
  "pgn": "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6"
}
```

### Geração de PGN
```http
POST /api/generate-pgn
Content-Type: application/json

{
  "moves": ["e4", "e5", "Nf3", "Nc6"],
  "headers": {
    "Event": "Casual Game",
    "White": "Player 1",
    "Black": "Player 2"
  }
}
```

### Gerenciamento de Jogos

#### Criar Jogo
```http
POST /api/games
Content-Type: application/json

{
  "gameId": "game_123",
  "initialFen": "