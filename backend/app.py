import io
from flask import Flask, request, jsonify
from flask_cors import CORS
import chess
import chess.engine
import chess.pgn
import os
import json

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STOCKFISH_PATH = os.path.join(BASE_DIR, "stockfish.exe")
OPENINGS_PATH = os.path.join(BASE_DIR, "aberturas.json")

# Carregar aberturas na inicialização
with open(OPENINGS_PATH, 'r', encoding='utf-8') as f:
    OPENINGS = json.load(f)

def match_opening(fen_position):
    fen_board = fen_position.split(' ')[0]
    for opening in OPENINGS:
        opening_fen = opening['fen'].split(' ')[0]
        if fen_board == opening_fen:
            return opening['name']
    return "Abertura desconhecida"

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    fen = data.get("fen")
    if not fen:
        return jsonify({"error": "FEN não fornecida"}), 400

    try:
        board = chess.Board(fen)
        is_white_to_move = board.turn == chess.WHITE

        with chess.engine.SimpleEngine.popen_uci(STOCKFISH_PATH) as engine:
            result = engine.analyse(board, chess.engine.Limit(depth=15))
            best_move = result.get("pv")[0].uci() if "pv" in result else None
            score = result["score"]

            pv_lines = []
            if "pv" in result:
                for move in result["pv"]:
                    pv_lines.append(move.uci())

            analysis_score = score.white() if is_white_to_move else score.black()

            if analysis_score.is_mate():
                mate_in = analysis_score.mate()
                evaluation = None
            else:
                mate_in = None
                evaluation = analysis_score.score(mate_score=10000) / 100.0

            opening = match_opening(fen)

            return jsonify({
                "bestmove": best_move,
                "evaluation": evaluation,
                "mate_in": mate_in,
                "opening": opening,
                "turn": "white" if is_white_to_move else "black",
                "pv_lines": pv_lines
            })

    except Exception as e:
        return jsonify({"error": f"Erro ao analisar: {str(e)}"}), 500

@app.route('/analyze_pgn', methods=['POST'])
def analyze_pgn():
    data = request.get_json()
    pgn_text = data.get('pgn', '')

    if not pgn_text:
        return jsonify({'error': 'PGN não fornecido'}), 400

    try:
        pgn_io = chess.pgn.read_game(io.StringIO(pgn_text))
        board = pgn_io.board()
        move_count = 0
        correct_moves = 0
        mistakes = 0
        blunders = 0
        inaccuracies = 0
        best_moves_list = []

        with chess.engine.SimpleEngine.popen_uci(STOCKFISH_PATH) as engine:
            for move in pgn_io.mainline_moves():
                move_count += 1

                # Obtem análise antes da jogada
                analysis = engine.analyse(board, chess.engine.Limit(depth=15))
                best_move = analysis["pv"][0]
                best_moves_list.append(best_move.uci())

                # Verifica se foi a melhor jogada
                if move == best_move:
                    correct_moves += 1
                else:
                    # Avaliação após jogada para medir o impacto
                    board.push(move)
                    new_analysis = engine.analyse(board, chess.engine.Limit(depth=15))
                    score_before = analysis["score"].white().score(mate_score=10000)
                    score_after = new_analysis["score"].white().score(mate_score=10000)
                    diff = (score_after - score_before) if score_before and score_after else 0

                    # Classificação do erro
                    if diff <= -300:
                        blunders += 1
                    elif diff <= -100:
                        mistakes += 1
                    elif diff <= -50:
                        inaccuracies += 1

                    continue  # move já foi dado com push
                board.push(move)

        score = round((correct_moves / move_count) * 100, 1)
        final_fen = board.fen()

        return jsonify({
            "total_moves": move_count,
            "correct_moves": correct_moves,
            "mistakes": mistakes,
            "blunders": blunders,
            "inaccuracies": inaccuracies,
            "score": score,
            "level": "Avançado" if score >= 90 else "Intermediário" if score >= 60 else "Iniciante",
            "precision": f"{score}%",
            "best_moves": best_moves_list,
            "final_fen": final_fen
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
