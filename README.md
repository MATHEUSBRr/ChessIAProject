# ♟️ ChessIAProject

## 🎯 Objetivo do Projeto

O objetivo deste projeto é criar um sistema interativo de análise de partidas de xadrez, onde o usuário pode:
- Mover peças em um tabuleiro gerado por SVG no navegador.
- Enviar a posição atual em FEN para o backend.
- Receber a melhor jogada sugerida pelo motor **Stockfish**.
- Obter a **avaliação numérica** da posição.
- Saber se existe **mate em X lances**.
- Identificar automaticamente a **abertura** da partida.

Esse projeto pode ser utilizado como ferramenta de estudo para jogadores de xadrez ou como base para futuros sistemas de treinamento ou análise.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

### Backend:
- Python 3.12
- Flask
- Flask-CORS
- python-chess
- Stockfish (motor UCI, `stockfish.exe`)

### Frontend:
- HTML5
- CSS3
- JavaScript puro
- SVG (para renderização do tabuleiro e peças)

---

## 🔧 Descrição do Funcionamento

1. O tabuleiro é renderizado usando SVG no navegador.
2. O usuário pode arrastar ou clicar para mover peças.
3. Após um lance, a posição é convertida para FEN.
4. Ao clicar no botão **Analisar**, o frontend envia a FEN via `POST` para o backend.
5. O backend utiliza o **motor Stockfish** para:
   - Avaliar a posição.
   - Sugerir a **melhor jogada** para o jogador da vez.
   - Detectar se há **mate em X lances**.
   - Comparar a posição com um banco de dados `aberturas.json` e retornar a abertura correspondente.
6. Os resultados são exibidos no navegador.

---

## ▶️ Como Executar/Testar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/MATHEUSBRr/ChessIAProject.git
cd ChessIAProject
2. Instale as dependências do backend
Use o terminal e instale as bibliotecas necessárias (recomenda-se Python 3.12 ou superior):

pip install --user -r backend/requirements.txt
3. Baixe o motor Stockfish
Coloque o executável stockfish.exe na pasta backend.

Você pode baixá-lo aqui: https://stockfishchess.org/download/

⚠️ Certifique-se de que o nome do arquivo seja exatamente stockfish.exe.

4. Rode o servidor backend
cd backend
python app.py
O backend estará disponível em http://localhost:5000.

5. Abra o frontend
Abra o arquivo frontend/index.html no navegador (clique duas vezes ou use um servidor local como o Live Server do VS Code).

O frontend se comunica com o backend local para analisar as jogadas.