const board = document.getElementById("board");
const status = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "○";
let cells = [];
let gameOver = false;

// 勝利パターンの定義
const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // 横
  [0,3,6], [1,4,7], [2,5,8], // 縦
  [0,4,8], [2,4,6]           // 斜め
];

// 初期化
function init() {
  board.innerHTML = "";
  cells = [];
  gameOver = false;
  currentPlayer = "○";
  status.textContent = "○の番です";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
    cells.push(cell);
  }
}

// クリック処理
function handleClick(e) {
  if (gameOver) return;

  const cell = e.target;
  if (cell.textContent !== "") return;

  cell.textContent = currentPlayer;

  if (checkWinner(currentPlayer)) {
    status.textContent = `${currentPlayer}の勝ち！`;
    gameOver = true;
  } else if (cells.every(c => c.textContent !== "")) {
    status.textContent = "引き分け！";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "○" ? "×" : "○";
    status.textContent = `${currentPlayer}の番です`;
  }
}

// 勝敗判定
function checkWinner(player) {
  return winPatterns.some(pattern => {
    if (pattern.every(i => cells[i].textContent === player)) {
      pattern.forEach(i => cells[i].classList.add("winner"));
      return true;
    }
    return false;
  });
}

// リセットボタン
resetBtn.addEventListener("click", init);

// 初期起動
init();
