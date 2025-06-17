from flask import Flask, request, jsonify
from flask_cors import CORS
import chess
import chess.engine
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
    # Compara só a parte da FEN que representa a posição das peças
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

            # Interpreta o score do lado da vez
            if is_white_to_move:
                analysis_score = score.white()
            else:
                analysis_score = score.black()

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
                "turn": "white" if is_white_to_move else "black"
            })

    except Exception as e:
        return jsonify({"error": f"Erro ao analisar: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
