 // SVG das peças de xadrez
        const pieceSVGs = {
            'K': `<svg viewBox="0 0 45 45"><g fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6M20 8h5"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#fff"/><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-3.5-7.5-13-10.5-16-4-3 6 5 10 5 10V37z"/><path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0"/></g></svg>`,
            'Q': `<svg viewBox="0 0 45 45"><g fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM16 8.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM33 9a2 2 0 1 1-4 0 2 2 0 1 1 4 0z"/><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25L7 14l2 12z"/><path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"/><path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none"/></g></svg>`,
            'R': `<svg viewBox="0 0 45 45"><g fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5"/><path d="M34 14l-3 3H14l-3-3"/><path d="M31 17v12.5H14V17" stroke-dasharray="1,1"/><path d="M31 29.5l1.5 2.5h-20l1.5-2.5"/><path d="M11 14h23" fill="none" stroke-linejoin="miter"/></g></svg>`,
            'B': `<svg viewBox="0 0 45 45"><g fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><g fill="#fff"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.46 3-2 3-2z"/><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/><path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/></g><path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" stroke-linejoin="miter"/></g></svg>`,
            'N': `<svg viewBox="0 0 45 45"><g fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"/><path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 .01-4.21 2.94-6 4-1.23 1.74-1.22 4-.94 6.25.91 1.04 3.1 2.33 4.94.94 1.56-.47 1.47-.67 2.88-.38 2.51.81 4.81 0 5.94-2.38 1.36-1.41.42-3.87.61-4.62-.44-1.31-4.57-3.87-6.31-3.75-.69-.15-2.06-1.06-.62-1.94 1.1-.71 3.65-.38 4.56-1.62.72-1.25 1.09-2.84 1.06-4.44-.16-2.31.16-2.33-.25-2.69z"/><circle cx="13.5" cy="29.5" r="1" fill="#000"/><circle cx="15" cy="15.5" r=".5" fill="#000"/></g></svg>`,
            'P': `<svg viewBox="0 0 45 45"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38-1.95 1.12-3.28 3.21-3.28 5.62 0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round"/></svg>`,
            'k': `<svg viewBox="0 0 45 45"><g fill="#000" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6M20 8h5"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#000" stroke="#fff"/><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-3.5-7.5-13-10.5-16-4-3 6 5 10 5 10V37z"/><path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0"/></g></svg>`,
            'q': `<svg viewBox="0 0 45 45"><g fill="#000" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><g fill="#000"><path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM16 8.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM33 9a2 2 0 1 1-4 0 2 2 0 1 1 4 0z"/></g><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25L7 14l2 12z"/><path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"/><path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none" stroke="#fff"/></g></svg>`,
            'r': `<svg viewBox="0 0 45 45"><g fill="#000" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z"/><path d="M14 29.5v-13h17v13H14z"/><path d="M14 16.5L11 14h23l-3 2.5H14zM11 14V9h4v2h5V9h5v2h5V9h4v5H11z" fill="#000"/><path d="M12 35.5h21m-20-4h19m-18-2h17m-17-13h17M11 14h23" fill="none" stroke="#fff" stroke-width="1" stroke-linejoin="miter"/></g></svg>`,
            'b': `<svg viewBox="0 0 45 45"><g fill="#000" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><g fill="#000"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.46 3-2 3-2z"/><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/><path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/></g><path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" stroke="#fff" stroke-linejoin="miter"/></g></svg>`,
            'n': `<svg viewBox="0 0 45 45"><g fill="#000" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"/><path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 .01-4.21 2.94-6 4-1.23 1.74-1.22 4-.94 6.25.91 1.04 3.1 2.33 4.94.94 1.56-.47 1.47-.67 2.88-.38 2.51.81 4.81 0 5.94-2.38 1.36-1.41.42-3.87.61-4.62-.44-1.31-4.57-3.87-6.31-3.75-.69-.15-2.06-1.06-.62-1.94 1.1-.71 3.65-.38 4.56-1.62.72-1.25 1.09-2.84 1.06-4.44-.16-2.31.16-2.33-.25-2.69z"/><circle cx="13.5" cy="29.5" r="1" fill="#fff"/><circle cx="15" cy="15.5" r=".5" fill="#fff"/></g></svg>`,
            'p': `<svg viewBox="0 0 45 45"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38-1.95 1.12-3.28 3.21-3.28 5.62 0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#000" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>`
        };

        // Estado do jogo completo
        let gameState = {
            board: null,
            currentPlayer: 'white',
            selectedSquare: null,
            validMoves: [],
            moveHistory: [],
            gameStatus: 'playing',
            moveNumber: 1,
            lastMove: null,
            pendingPromotion: null,
            vsAI: false,
            humanColor: null,
            isThinking: false,

            castlingRights: {
                whiteKingSide: true,
                whiteQueenSide: true,
                blackKingSide: true,
                blackQueenSide: true
            },
            enPassantTarget: null,
            halfMoveClock: 0
        };

        // Posição inicial do xadrez
        const initialBoard = [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ];

        function initGame() {
            gameState.vsAI = false;
            gameState.humanColor = null;
            gameState.isThinking = false;
            gameState.board = JSON.parse(JSON.stringify(initialBoard));
            createBoard();
            updateGameInfo();
            updateMoveList();
            attachEventListeners();
        }

        // Criar o tabuleiro visual
        function createBoard() {
            const boardElement = document.getElementById('chessBoard');
            boardElement.innerHTML = '';

            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    const square = document.createElement('div');
                    const squareName = getSquareName(row, col);
                    
                    square.className = `square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                    square.dataset.row = row;
                    square.dataset.col = col;
                    square.dataset.square = squareName;
                    
                    const piece = gameState.board[row][col];
                    if (piece) {
                        const pieceElement = document.createElement('div');
                        pieceElement.className = 'piece';
                        pieceElement.innerHTML = pieceSVGs[piece];
                        square.appendChild(pieceElement);
                    }
                    
                    square.addEventListener('click', () => handleSquareClick(row, col));
                    boardElement.appendChild(square);
                }
            }
        }

        // Converter coordenadas para nome da casa 
        function getSquareName(row, col) {
            const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
            return files[col] + ranks[row];
        }

        // Converter nome da casa para coordenadas
        function getSquareCoords(squareName) {
            const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
            const col = files.indexOf(squareName[0]);
            const row = ranks.indexOf(squareName[1]);
            return { row, col };
        }

        function handleSquareClick(row, col) {
            if (gameState.vsAI) {
                if (gameState.isThinking) return;
                if (gameState.currentPlayer !== gameState.humanColor) return;
            }
            if (gameState.pendingPromotion) return;

            const piece = gameState.board[row][col];
            const sq = getSquareName(row, col);

            if (gameState.selectedSquare) {
                const ok = gameState.validMoves.some(m => m.to === sq);
                if (ok) {
                makeMove(gameState.selectedSquare, sq);
                } else {
                clearSelection();
                if (piece && isPieceOwnedByCurrentPlayer(piece)) {
                    selectSquare(row, col);
                }
                }
            } else {
                if (piece && isPieceOwnedByCurrentPlayer(piece)) {
                selectSquare(row, col);
                }
            }
        }

        // Verificar se a peça pertence ao jogador atual
        function isPieceOwnedByCurrentPlayer(piece) {
            const isWhitePiece = piece === piece.toUpperCase();
            return (gameState.currentPlayer === 'white' && isWhitePiece) ||
                   (gameState.currentPlayer === 'black' && !isWhitePiece);
        }

        function selectSquare(row, col) {
            gameState.selectedSquare = getSquareName(row, col);
            gameState.validMoves = getValidMoves(row, col);
            updateBoard();
        }

        function clearSelection() {
            gameState.selectedSquare = null;
            gameState.validMoves = [];
            updateBoard();
        }

        // Atualizar visualização do tabuleiro
        function updateBoard() {
            const squares = document.querySelectorAll('.square');
            squares.forEach(square => {
                square.classList.remove('selected', 'valid-move', 'last-move');
                
                if (gameState.selectedSquare && square.dataset.square === gameState.selectedSquare) {
                    square.classList.add('selected');
                }
                
                if (gameState.validMoves.some(move => move.to === square.dataset.square)) {
                    square.classList.add('valid-move');
                }

                if (gameState.lastMove && 
                    (square.dataset.square === gameState.lastMove.from || 
                     square.dataset.square === gameState.lastMove.to)) {
                    square.classList.add('last-move');
                }
            });
        }

        // Obter jogadas válidas para uma peça
        function getValidMoves(row, col) {
            const piece = gameState.board[row][col];
            if (!piece) return [];

            const moves = [];
            const pieceType = piece.toLowerCase();

            switch (pieceType) {
                case 'p':
                    moves.push(...getPawnMoves(row, col, piece));
                    break;
                case 'r':
                    moves.push(...getRookMoves(row, col, piece));
                    break;
                case 'n':
                    moves.push(...getKnightMoves(row, col, piece));
                    break;
                case 'b':
                    moves.push(...getBishopMoves(row, col, piece));
                    break;
                case 'q':
                    moves.push(...getQueenMoves(row, col, piece));
                    break;
                case 'k':
                    moves.push(...getKingMoves(row, col, piece));
                    break;
            }

            // Filtrar jogadas que deixam o rei em xeque
            return moves.filter(move => !isMoveLeavingKingInCheck(move, piece));
        }

        // #region Movimento e regras do Peão
        function getPawnMoves(row, col, piece) {
        const moves = [];
        const isWhite = piece === piece.toUpperCase();
        const direction = isWhite ? -1 : 1;
        const startRow = isWhite ? 6 : 1;
        const enPassantRow = isWhite ? 3 : 4;

        // Movimento para frente (um passo)
        if (isValidPosition(row + direction, col) && !gameState.board[row + direction][col]) {
            moves.push({
                from: getSquareName(row, col),
                to: getSquareName(row + direction, col),
                piece: piece
            });

            // Movimento duplo inicial (dois passos)
            if (row === startRow && !gameState.board[row + 2 * direction][col]) {
                moves.push({
                    from: getSquareName(row, col),
                    to: getSquareName(row + 2 * direction, col),
                    piece: piece,
                    isDoubleStep: true
                });
            }
        }

        // Capturas diagonais normais
        for (const dcol of [-1, 1]) {
            const targetRow = row + direction;
            const targetCol = col + dcol;
            if (isValidPosition(targetRow, targetCol)) {
                const targetPiece = gameState.board[targetRow][targetCol];
                if (targetPiece && isOpponentPiece(piece, targetPiece)) {
                    moves.push({
                        from: getSquareName(row, col),
                        to: getSquareName(targetRow, targetCol),
                        piece: piece,
                        capture: targetPiece
                    });
                }
            }
        }

        // Captura en passant
        if (gameState.enPassantTarget) {
            const epCoords = getSquareCoords(gameState.enPassantTarget);
            if (row === enPassantRow && Math.abs(col - epCoords.col) === 1 && epCoords.row === row + direction) {
                const adjacentPiece = gameState.board[row][epCoords.col];
                if (
                    adjacentPiece &&
                    isOpponentPiece(piece, adjacentPiece) &&
                    (adjacentPiece === 'p' || adjacentPiece === 'P') // opcional: garante que seja peão
                ) {
                    moves.push({
                        from: getSquareName(row, col),
                        to: gameState.enPassantTarget,
                        piece: piece,
                        capture: adjacentPiece,
                        isEnPassant: true
                    });
                }
            }
        }

        return moves;
    }
// #endregion

        //#region Movimento das peças

        // Jogadas da torre
        function getRookMoves(row, col, piece) {
            const moves = [];
            const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

            for (const [drow, dcol] of directions) {
                for (let i = 1; i < 8; i++) {
                    const newRow = row + i * drow;
                    const newCol = col + i * dcol;

                    if (!isValidPosition(newRow, newCol)) break;

                    const targetPiece = gameState.board[newRow][newCol];
                    
                    if (!targetPiece) {
                        moves.push({
                            from: getSquareName(row, col),
                            to: getSquareName(newRow, newCol),
                            piece: piece
                        });
                    } else {
                        if (isOpponentPiece(piece, targetPiece)) {
                            moves.push({
                                from: getSquareName(row, col),
                                to: getSquareName(newRow, newCol),
                                piece: piece,
                                capture: targetPiece
                            });
                        }
                        break;
                    }
                }
            }

            return moves;
        }

        // Jogadas do cavalo
        function getKnightMoves(row, col, piece) {
            const moves = [];
            const knightMoves = [
                [-2, -1], [-2, 1], [-1, -2], [-1, 2],
                [1, -2], [1, 2], [2, -1], [2, 1]
            ];

            for (const [drow, dcol] of knightMoves) {
                const newRow = row + drow;
                const newCol = col + dcol;

                if (isValidPosition(newRow, newCol)) {
                    const targetPiece = gameState.board[newRow][newCol];
                    
                    if (!targetPiece || isOpponentPiece(piece, targetPiece)) {
                        moves.push({
                            from: getSquareName(row, col),
                            to: getSquareName(newRow, newCol),
                            piece: piece,
                            capture: targetPiece
                        });
                    }
                }
            }

            return moves;
        }

        // Jogadas do bispo
        function getBishopMoves(row, col, piece) {
            const moves = [];
            const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

            for (const [drow, dcol] of directions) {
                for (let i = 1; i < 8; i++) {
                    const newRow = row + i * drow;
                    const newCol = col + i * dcol;

                    if (!isValidPosition(newRow, newCol)) break;

                    const targetPiece = gameState.board[newRow][newCol];
                    
                    if (!targetPiece) {
                        moves.push({
                            from: getSquareName(row, col),
                            to: getSquareName(newRow, newCol),
                            piece: piece
                        });
                    } else {
                        if (isOpponentPiece(piece, targetPiece)) {
                            moves.push({
                                from: getSquareName(row, col),
                                to: getSquareName(newRow, newCol),
                                piece: piece,
                                capture: targetPiece
                            });
                        }
                        break;
                    }
                }
            }

            return moves;
        }

        // Jogadas da rainha
        function getQueenMoves(row, col, piece) {
            return [...getRookMoves(row, col, piece), ...getBishopMoves(row, col, piece)];
        }
// #endregion

        // #region Movimento do rei e regras do roque
        // Jogadas do rei 
        function getKingMoves(row, col, piece) {
            const moves = [];
            const directions = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1],           [0, 1],
                [1, -1],  [1, 0],  [1, 1]
            ];

            // Movimentos normais do rei (um quadrado em qualquer direção)
            for (const [drow, dcol] of directions) {
                const newRow = row + drow;
                const newCol = col + dcol;

                if (isValidPosition(newRow, newCol)) {
                    const targetPiece = gameState.board[newRow][newCol];

                    if (!targetPiece || isOpponentPiece(piece, targetPiece)) {
                        moves.push({
                            from: getSquareName(row, col),
                            to: getSquareName(newRow, newCol),
                            piece: piece,
                            capture: targetPiece || null
                        });
                    }
                }
            }

            const isWhite = piece === 'K'; //'K' = Rei branco 'k' = Rei preto
            const backRank = isWhite ? 7 : 0;
            const enemyColor = isWhite ? 'black' : 'white';

            if (row === backRank && col === 4) { 
                // Roque curto (lado do rei)
                if (gameState.castlingRights[isWhite ? 'whiteKingSide' : 'blackKingSide']) {
                    if (!gameState.board[backRank][5] && !gameState.board[backRank][6]) {
                        if (!isSquareAttacked(backRank, 4, enemyColor) &&
                            !isSquareAttacked(backRank, 5, enemyColor) &&
                            !isSquareAttacked(backRank, 6, enemyColor)) {
                            
                            moves.push({
                                from: getSquareName(row, col),
                                to: getSquareName(backRank, 6),
                                piece: piece,
                                castle: 'king'
                            });
                        }
                    }
                }

                // Roque longo (lado da rainha)
                if (gameState.castlingRights[isWhite ? 'whiteQueenSide' : 'blackQueenSide']) {
                    if (!gameState.board[backRank][1] && 
                        !gameState.board[backRank][2] &&
                        !gameState.board[backRank][3]) {
                        
                        if (!isSquareAttacked(backRank, 2, enemyColor) &&
                            !isSquareAttacked(backRank, 3, enemyColor) &&
                            !isSquareAttacked(backRank, 4, enemyColor)) {

                            moves.push({
                                from: getSquareName(row, col),
                                to: getSquareName(backRank, 2),
                                piece: piece,
                                castle: 'queen'
                            });
                        }
                    }
                }
            }

            return moves;
        }

        function isValidPosition(row, col) {
            return row >= 0 && row < 8 && col >= 0 && col < 8;
        }

        function isOpponentPiece(piece1, piece2) {
            const isWhite1 = piece1 === piece1.toUpperCase();
            const isWhite2 = piece2 === piece2.toUpperCase();
            return isWhite1 !== isWhite2;
        }

        // Verificar se a jogada deixa o rei em xeque
        function isMoveLeavingKingInCheck(move, piece) {
            const fromCoords = getSquareCoords(move.from);
            const toCoords = getSquareCoords(move.to);
            
            const originalPiece = gameState.board[toCoords.row][toCoords.col];
            gameState.board[fromCoords.row][fromCoords.col] = null;
            gameState.board[toCoords.row][toCoords.col] = piece;

            // Tratar captura en passant
            if (move.isEnPassant) {
                const isWhite = piece === piece.toUpperCase();
                const capturedRow = isWhite ? toCoords.row + 1 : toCoords.row - 1;
                gameState.board[capturedRow][toCoords.col] = null;
            }

            // Verificar se o rei está em xeque
            const isInCheck = isKingInCheck(piece === piece.toUpperCase() ? 'white' : 'black');

            // Desfazer a jogada
            gameState.board[fromCoords.row][fromCoords.col] = piece;
            gameState.board[toCoords.row][toCoords.col] = originalPiece;
            
            // Restaurar peça capturada em en passant
            if (move.isEnPassant) {
                const capturedRow = piece === 'P' ? toCoords.row + 1 : toCoords.row - 1;
                gameState.board[capturedRow][toCoords.col] = piece === 'P' ? 'p' : 'P';
            }

            return isInCheck;
        }

        // Verificar se o rei está em xeque
        function isKingInCheck(color) {
            const kingPiece = color === 'white' ? 'K' : 'k';
            let kingPos = null;

            // Encontrar o rei
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    if (gameState.board[row][col] === kingPiece) {
                        kingPos = { row, col };
                        break;
                    }
                }
            }

            if (!kingPos) return false;

            // Verificar se alguma peça inimiga pode atacar o rei
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    const piece = gameState.board[row][col];
                    if (piece && isOpponentPiece(kingPiece, piece)) {
                        const moves = getValidMovesWithoutCheckValidation(row, col, piece);
                        if (moves.some(move => move.to === getSquareName(kingPos.row, kingPos.col))) {
                            return true;
                        }
                    }
                }
            }

            return false;
        }
//#endregion

        function getValidMovesWithoutCheckValidation(row, col, piece) {
            const pieceType = piece.toLowerCase();

            switch (pieceType) {
                case 'p': return getPawnMoves(row, col, piece);
                case 'r': return getRookMoves(row, col, piece);
                case 'n': return getKnightMoves(row, col, piece);
                case 'b': return getBishopMoves(row, col, piece);
                case 'q': return getQueenMoves(row, col, piece);
                case 'k': return getKingMoves(row, col, piece);
                default: return [];
            }
        }

        // Função para mostrar o modal de promoção
        function showPromotionModal(to, piece) {
            gameState.pendingPromotion = { to, piece };
            
            const modal = document.createElement('div');
            modal.className = 'promotion-modal';
            
            const options = document.createElement('div');
            options.className = 'promotion-options';
            
            const pieces = ['Q', 'R', 'B', 'N'];
            const color = piece === 'P' ? 'white' : 'black';
            
            pieces.forEach(p => {
                const option = document.createElement('div');
                option.className = 'promotion-option';
                option.innerHTML = pieceSVGs[color === 'white' ? p : p.toLowerCase()];
                option.addEventListener('click', () => {
                    const coords = getSquareCoords(to);
                    gameState.board[coords.row][coords.col] = color === 'white' ? p : p.toLowerCase();
                    
                    modal.remove();
                    gameState.pendingPromotion = null;
                    
                    gameState.currentPlayer = gameState.currentPlayer === 'white' ? 'black' : 'white';
                    if (gameState.currentPlayer === 'white') {
                        gameState.moveNumber++;
                    }
                    
                    createBoard();
                    updateGameInfo();
                    updateMoveList();
                });
                options.appendChild(option);
            });
            
            modal.appendChild(options);
            document.body.appendChild(modal);
        }

        function makeMove(from, to) {            
            const fromCoords = getSquareCoords(from);
            const toCoords = getSquareCoords(to);

            const piece = gameState.board[fromCoords.row][fromCoords.col];
            const capturedPiece = gameState.board[toCoords.row][toCoords.col];
            const isWhite = piece === piece.toUpperCase();

            const move = {
                from: from,
                to: to,
                piece: piece,
                capture: capturedPiece || null,
                moveNumber: gameState.moveNumber
            };

            // Detectar Roque
            if (piece.toLowerCase() === 'k' && Math.abs(toCoords.col - fromCoords.col) === 2) {
                move.castle = (toCoords.col === 6) ? 'king' : 'queen';
            }

            // Executar o movimento do rei
            gameState.board[fromCoords.row][fromCoords.col] = null;
            gameState.board[toCoords.row][toCoords.col] = piece;

            if (move.castle) {
                const backRank = isWhite ? 7 : 0;

                if (move.castle === 'king') {
                    // Torre do lado do rei: h1 → f1 ou h8 → f8
                    gameState.board[backRank][7] = null;
                    gameState.board[backRank][5] = isWhite ? 'R' : 'r';
                    move.rookMove = {
                        from: getSquareName(backRank, 7),
                        to: getSquareName(backRank, 5)
                    };
                } else if (move.castle === 'queen') {
                    gameState.board[backRank][0] = null;
                    gameState.board[backRank][3] = isWhite ? 'R' : 'r';
                    move.rookMove = {
                        from: getSquareName(backRank, 0),
                        to: getSquareName(backRank, 3)
                    };
                }
            }

            // Tratar En Passant
            if (piece.toLowerCase() === 'p' && gameState.enPassantTarget === to) {
                const capturedRow = isWhite ? toCoords.row + 1 : toCoords.row - 1;
                gameState.board[capturedRow][toCoords.col] = null;
                move.capture = isWhite ? 'p' : 'P';
                move.isEnPassant = true;
            }

            // Promoção
            if (piece.toLowerCase() === 'p') {
                if ((piece === 'P' && toCoords.row === 0) || (piece === 'p' && toCoords.row === 7)) {
                    showPromotionModal(to, piece);
                    move.promotion = true;
                }
            }

            // Atualizar direitos de roque
            if (piece === 'K') {
                gameState.castlingRights.whiteKingSide = false;
                gameState.castlingRights.whiteQueenSide = false;
            } else if (piece === 'k') {
                gameState.castlingRights.blackKingSide = false;
                gameState.castlingRights.blackQueenSide = false;
            } else if (piece === 'R') {
                if (from === 'h1') gameState.castlingRights.whiteKingSide = false;
                if (from === 'a1') gameState.castlingRights.whiteQueenSide = false;
            } else if (piece === 'r') {
                if (from === 'h8') gameState.castlingRights.blackKingSide = false;
                if (from === 'a8') gameState.castlingRights.blackQueenSide = false;
            }

            // Atualizar alvo de en passant
            gameState.enPassantTarget = null;
            if (piece.toLowerCase() === 'p' && Math.abs(toCoords.row - fromCoords.row) === 2) {
                const enPassantRow = fromCoords.row + (isWhite ? -1 : 1);
                gameState.enPassantTarget = getSquareName(enPassantRow, fromCoords.col);
                move.isDoubleStep = true;
            }

            // Registrar jogada
            gameState.moveHistory.push(move);
            gameState.lastMove = move;

            // Trocar jogador (caso não seja promoção ainda pendente)
            if (!move.promotion) {
                gameState.currentPlayer = gameState.currentPlayer === 'white' ? 'black' : 'white';
                if (gameState.currentPlayer === 'white') {
                    gameState.moveNumber++;
                }
            }

            if (gameState.vsAI && gameState.currentPlayer !== gameState.humanColor) {
                setTimeout(playAIMove, 300);
            }

            updateGameStatus();
            clearSelection();
            createBoard();
            updateGameInfo();
            updateMoveList();
        }

        function isSquareAttacked(row, col, byColor) {
            const squareName = getSquareName(row, col);

            for (let r = 0; r < 8; r++) {
                for (let c = 0; c < 8; c++) {
                    const piece = gameState.board[r][c];
                    if (piece) {
                        const isWhitePiece = piece === piece.toUpperCase();
                        if ((byColor === 'white' && isWhitePiece) || 
                            (byColor === 'black' && !isWhitePiece)) {
                            const moves = getValidMovesWithoutCheckValidation(r, c, piece);
                            if (moves.some(move => move.to === squareName)) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        }

        // Atualizar status do jogo
        function updateGameStatus() {
            const inCheck = isKingInCheck(gameState.currentPlayer);
            const hasValidMoves = hasAnyValidMoves(gameState.currentPlayer);

            if (inCheck && !hasValidMoves) {
                gameState.gameStatus = gameState.currentPlayer === 'white' ? 'black_wins' : 'white_wins';
            } else if (!hasValidMoves) {
                gameState.gameStatus = 'stalemate';
            } else if (inCheck) {
                gameState.gameStatus = 'check';
            } else {
                gameState.gameStatus = 'playing';
            }
        }

        function hasAnyValidMoves(color) {
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    const piece = gameState.board[row][col];
                    if (piece && 
                        ((color === 'white' && piece === piece.toUpperCase()) ||
                         (color === 'black' && piece === piece.toLowerCase()))) {
                        const moves = getValidMoves(row, col);
                        if (moves.length > 0) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        function updateGameInfo() {
            const statusElement = document.getElementById('gameStatus');
            const moveNumberElement = document.getElementById('moveNumber');

            let statusText = '';
            switch (gameState.gameStatus) {
                case 'playing':
                    statusText = gameState.currentPlayer === 'white' ? 'Vez das Brancas' : 'Vez das Pretas';
                    break;
                case 'check':
                    statusText = (gameState.currentPlayer === 'white' ? 'Brancas' : 'Pretas') + ' em Xeque!';
                    break;
                case 'white_wins':
                    statusText = 'Brancas Vencem por Xeque-Mate!';
                    break;
                case 'black_wins':
                    statusText = 'Pretas Vencem por Xeque-Mate!';
                    break;
                case 'stalemate':
                    statusText = 'Empate por Afogamento!';
                    break;
            }

            statusElement.textContent = statusText;
            moveNumberElement.textContent = gameState.moveNumber;
        }

        function updateMoveList() {
            const moveListElement = document.getElementById('moveList');
            
            if (gameState.moveHistory.length === 0) {
                moveListElement.innerHTML = '<div style="color: #999; text-align: center; padding: 20px;">Nenhuma jogada ainda</div>';
                return;
            }

            let html = '';
            for (let i = 0; i < gameState.moveHistory.length; i += 2) {
                const whiteMove = gameState.moveHistory[i];
                const blackMove = gameState.moveHistory[i + 1];
                
                const moveNumber = Math.floor(i / 2) + 1;
                html += `<div class="move-item">`;
                html += `<strong>${moveNumber}.</strong> `;
                html += formatMove(whiteMove);
                
                if (blackMove) {
                    html += ` ${formatMove(blackMove)}`;
                }
                html += `</div>`;
            }
            
            moveListElement.innerHTML = html;
            moveListElement.scrollTop = moveListElement.scrollHeight;
        }

        // Formatar jogada para notação
        function formatMove(move) {
            let notation = '';
            
            if (move.castle === 'king') {
                return 'O-O';
            } else if (move.castle === 'queen') {
                return 'O-O-O';
            }
            
            if (move.capture) {
                if (move.piece.toLowerCase() === 'p') {
                    notation = move.from[0] + 'x' + move.to;
                } else {
                    notation = move.piece.toUpperCase() + 'x' + move.to;
                }
            } else {
                if (move.piece.toLowerCase() === 'p') {
                    notation = move.to;
                } else {
                    notation = move.piece.toUpperCase() + move.to;
                }
            }

            if (move.promotion) {
                notation += '=Q';
            }

            return notation;
        }

        function generateFEN() {
            let fen = '';
            
            // Posição das peças
            for (let row = 7; row >= 0; row--) {
                let emptyCount = 0;
                for (let col = 0; col < 8; col++) {
                    const piece = gameState.board[row][col];
                    if (piece) {
                        if (emptyCount > 0) {
                            fen += emptyCount;
                            emptyCount = 0;
                        }
                        fen += piece;
                    } else {
                        emptyCount++;
                    }
                }
                if (emptyCount > 0) {
                    fen += emptyCount;
                }
                if (row > 0) fen += '/';
            }

            // Jogador ativo
            fen += ' ' + (gameState.currentPlayer === 'white' ? 'w' : 'b');
            
            // Direitos de roque
            let castling = '';
            if (gameState.castlingRights.whiteKingSide) castling += 'K';
            if (gameState.castlingRights.whiteQueenSide) castling += 'Q';
            if (gameState.castlingRights.blackKingSide) castling += 'k';
            if (gameState.castlingRights.blackQueenSide) castling += 'q';
            fen += ' ' + (castling || '-');
            
            fen += ' ' + (gameState.enPassantTarget || '-');
            
            fen += ' 0 ' + gameState.moveNumber;

            return fen;
        }

        function loadFEN() {
            const fen = document.getElementById('fenInput').value.trim();
            if (!fen) return;

            try {
                const parts = fen.split(' ');
                const position = parts[0];
                const activePlayer = parts[1];
                
                gameState.board = Array(8).fill(null).map(() => Array(8).fill(null));
                
                const rows = position.split('/');
                for (let row = 0; row < 8; row++) {
                    let col = 0;
                    for (const char of rows[7 - row]) {
                        if (isNaN(char)) {
                            gameState.board[row][col] = char;
                            col++;
                        } else {
                            col += parseInt(char);
                        }
                    }
                }

                // Definir jogador ativo
                gameState.currentPlayer = activePlayer === 'w' ? 'white' : 'black';
                
                gameState.selectedSquare = null;
                gameState.validMoves = [];
                gameState.moveHistory = [];
                gameState.lastMove = null;
                gameState.pendingPromotion = null;
                
                updateGameStatus();
                createBoard();
                updateGameInfo();
                updateMoveList();
                
                alert('Posição carregada com sucesso!');
            } catch (error) {
                alert('FEN inválido!');
            }
        }

        function resetGame() {
            gameState.board = JSON.parse(JSON.stringify(initialBoard));
            gameState.currentPlayer = 'white';
            gameState.selectedSquare = null;
            gameState.validMoves = [];
            gameState.moveHistory = [];
            gameState.gameStatus = 'playing';
            gameState.moveNumber = 1;
            gameState.lastMove = null;
            gameState.pendingPromotion = null;
            gameState.castlingRights = {
                whiteKingSide: true,
                whiteQueenSide: true,
                blackKingSide: true,
                blackQueenSide: true
            };
            gameState.enPassantTarget = null;
            gameState.halfMoveClock = 0;

            createBoard();
            updateGameInfo();
            updateMoveList();
            updateEvaluation(0, '-');
        }

        function startVsAI() {
            const sel = document.getElementById('playerColor');
            gameState.humanColor = sel.value; 
            gameState.vsAI = true;
            gameState.isThinking = false; 

            resetGame();

            console.log("Cor humano:", gameState.humanColor, 
                        "Jogador atual:", gameState.currentPlayer,
                        "vsAI:", gameState.vsAI);

            if (gameState.humanColor === 'black') {
                gameState.currentPlayer = 'white';
                
                console.log("Chamando IA para jogar...");

                setTimeout(() => {
                    if (gameState.currentPlayer === 'white' && gameState.vsAI) {
                        playAIMove();
                    }
                }, 100);
            }
        }

        function undoMove() {
            if (gameState.moveHistory.length === 0 || gameState.pendingPromotion) return;

            const lastMove = gameState.moveHistory.pop();
            const fromCoords = getSquareCoords(lastMove.from);
            const toCoords = getSquareCoords(lastMove.to);

            gameState.board[fromCoords.row][fromCoords.col] = lastMove.piece;
            gameState.board[toCoords.row][toCoords.col] = lastMove.capture || null;

            if (lastMove.castle) {
                const backRank = lastMove.piece === 'K' ? 7 : 0;
                
                if (lastMove.castle === 'king') {
                    gameState.board[backRank][5] = null;
                    gameState.board[backRank][7] = lastMove.piece === 'K' ? 'R' : 'r';
                } else {
                    gameState.board[backRank][3] = null;
                    gameState.board[backRank][0] = lastMove.piece === 'K' ? 'R' : 'r';
                }
            }

            if (lastMove.isEnPassant) {
                const capturedRow = lastMove.piece === 'P' ? toCoords.row + 1 : toCoords.row - 1;
                gameState.board[capturedRow][toCoords.col] = lastMove.piece === 'P' ? 'p' : 'P';
            }

            gameState.currentPlayer = gameState.currentPlayer === 'white' ? 'black' : 'white';
            
            if (gameState.currentPlayer === 'black') {
                gameState.moveNumber--;
            }

            gameState.lastMove = gameState.moveHistory[gameState.moveHistory.length - 1] || null;
            gameState.gameStatus = 'playing';

            clearSelection();
            createBoard();
            updateGameInfo();
            updateMoveList();
        }

            let openings = [];

            async function loadOpenings() {
            try {
                const res = await fetch('aberturas.json');
                openings = await res.json();
            } catch (e) {
                console.error('Erro ao carregar aberturas:', e);
            }
            }

          function normalizeFen(fen) {
            return fen.split(' ')[0];
            }


            function findOpening(fen) {
            const normFen = normalizeFen(fen);
            for (const opening of openings) {
                if (normalizeFen(opening.fen) === normFen) {
                return opening.name;
                }
            }
            return 'Desconhecida';
            }

            function updateOpening(openingName) {
            const openingElement = document.getElementById('openingName');
            if (openingElement) {
                openingElement.textContent = openingName;
            }
        }


            // Analisar posição com Stockfish
            function updateEvaluation(evaluation, bestMove, mateIn) {
                let evalText = evaluation !== null ? (evaluation > 0 ? `+${evaluation.toFixed(2)}` : evaluation.toFixed(2)) : "Mate";
                if (mateIn !== null) evalText += ` em ${Math.abs(mateIn)} lances`;

                document.getElementById('evaluation').textContent = evalText;
                document.getElementById('bestMove').textContent = bestMove || '-';

                // Atualizar barra de avaliação
                if (evaluation !== null) {
                    const percentage = Math.min(Math.max((evaluation + 5) / 10 * 100, 0), 100);
                    document.getElementById('evalBarFill').style.width = percentage + '%';
                    document.getElementById('evalText').textContent = evalText;
                } else {
                    document.getElementById('evalBarFill').style.width = evaluation > 0 ? '100%' : '0%';
                    document.getElementById('evalText').textContent = evalText;
                }
            }


            async function analyzePosition() {
            const button = document.getElementById('analyzeBtn');
            button.disabled = true;
            button.innerHTML = '<span class="loading">⟳</span> Analisando...';

            try {
                const fen = generateFEN();

                const response = await fetch("http://localhost:5000/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ fen })
                });

                const data = await response.json();

                if (data.error) throw new Error(data.error);

                updateEvaluation(data.evaluation, data.bestmove, data.mate_in);
                updateOpening(data.opening);
                updatePvLines(data.pv_lines);
            } catch (error) {
                console.error("Erro na análise:", error);
                alert("Erro ao conectar ao Stockfish!");
            } finally {
                button.disabled = false;
                button.textContent = "Analisar";
            }
        }

            function generateFEN() {
            const pieceMap = {
                'P': 'P', 'N': 'N', 'B': 'B', 'R': 'R', 'Q': 'Q', 'K': 'K',
                'p': 'p', 'n': 'n', 'b': 'b', 'r': 'r', 'q': 'q', 'k': 'k'
            };

            let fen = '';
            for (let row = 0; row < 8; row++) {
                let emptyCount = 0;
                for (let col = 0; col < 8; col++) {
                    const piece = gameState.board[row][col];
                    if (!piece) {
                        emptyCount++;
                    } else {
                        if (emptyCount > 0) {
                            fen += emptyCount;
                            emptyCount = 0;
                        }
                        fen += pieceMap[piece] || '?'; // Mapeia para FEN ou ? se indefinido
                    }
                }
                if (emptyCount > 0) fen += emptyCount;
                if (row < 7) fen += '/';
            }

           const turn = gameState.currentPlayer === 'black' ? 'b' : 'w';

            const castling = '-';
            const enPassant = '-';

            const halfmoveClock = 0;
            const fullmoveNumber = gameState.fullmove || 1;

            return `${fen} ${turn} ${castling} ${enPassant} ${halfmoveClock} ${fullmoveNumber}`;
        }


            document.getElementById('analyzeBtn').addEventListener('click', analyzePosition);

            loadOpenings();

            function updatePvLines(lines) {
            const pvContainer = document.getElementById("pvLines");
            pvContainer.innerHTML = "";

            if (!lines || lines.length === 0) {
                pvContainer.innerHTML = `<div style="color: #999; text-align: center; padding: 20px;">Nenhuma análise ainda</div>`;
                return;
            }

            lines.forEach((line, index) => {
                const div = document.createElement("div");
                div.className = "pv-line-item";
                div.textContent = `Linha ${index + 1}: ${line}`;
                pvContainer.appendChild(div);
            });
        }
        
            function importPGN() {
                const input = document.getElementById('pgnInput');
                const file = input.files[0];
                const resultDiv = document.getElementById('pgnResult');
                resultDiv.innerHTML = 'Analisando...';

                if (!file) {
                    resultDiv.innerHTML = '<span style="color: red;">Nenhum arquivo selecionado.</span>';
                    return;
                }

                const reader = new FileReader();
                reader.onload = function (e) {
                    const pgn = e.target.result;

                    fetch('http://127.0.0.1:5000/analyze_pgn', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ pgn })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            resultDiv.innerHTML = `<span style="color: red;">Erro: ${data.error}</span>`;
                            return;
                        }

                        const {
                            total_moves,
                            correct_moves,
                            mistakes,
                            blunders,
                            inaccuracies,
                            score,
                            level,
                            precision,
                            best_moves,
                            final_fen,
                            moves 
                        } = data;

                        resultDiv.innerHTML = `
                            <div class="result-item">Total de jogadas: <strong>${total_moves}</strong></div>
                            <div class="result-item">Acertos: <strong>${correct_moves}</strong></div>
                            <div class="result-item">Erros: <strong>${mistakes}</strong></div>
                            <div class="result-item">Erros graves (blunders): <strong>${blunders}</strong></div>
                            <div class="result-item">Imprecisões: <strong>${inaccuracies}</strong></div>
                            <div class="result-item">Pontuação final: <strong>${score}</strong></div>
                            <div class="result-item">Precisão estimada: <strong>${precision}</strong></div>
                            <div class="result-item">Nível estimado: <strong>${level}</strong></div>
                        `;

                        if (moves && moves.length > 0) {
                            moveList = moves;
                            currentMoveIndex = -1;
                            renderMoveHistory();
                        }

                        if (final_fen && typeof updateBoard === "function") {
                            updateBoard(final_fen);
                        }
                    })
                    .catch(err => {
                        resultDiv.innerHTML = `<span style="color: red;">Erro ao processar o PGN.</span>`;
                        console.error(err);
                    });
                };

                reader.readAsText(file);
            }
        
            function playAIMove() {
            if (gameState.isThinking) return;
                gameState.isThinking = true;

                const fen = generateFEN();
                fetch("http://127.0.0.1:5000/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ fen })
                })
                .then(res => res.json())
                .then(data => {
                    if (!data.bestmove) return;
                    const from = data.bestmove.slice(0, 2);
                    const to   = data.bestmove.slice(2, 4);
                    makeMove(from, to);
                })
                .catch(console.error)
                .finally(() => {
                    gameState.isThinking = false;
                });
            }

            function canHumanMovePiece(from) {
                if (!vsAI) return true;

                const fromCoords = getSquareCoords(from);
                const piece = gameState.board[fromCoords.row][fromCoords.col];
                if (!piece) return false;

                const isWhite = piece === piece.toUpperCase();

                if (humanColor === 'white' && isWhite) return true;
                if (humanColor === 'black' && !isWhite) return true;

                return false;
            }

        function attachEventListeners() {
            document.getElementById('analyzeBtn').addEventListener('click', analyzePosition);
            document.getElementById('undoBtn').addEventListener('click', undoMove);
            document.getElementById('btnStartAI').addEventListener('click', startVsAI);
        }

        window.addEventListener('load', initGame);