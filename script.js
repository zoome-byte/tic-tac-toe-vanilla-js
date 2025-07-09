const board = document.getElementById("board");
const status = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let cells = Array(9).fill("");

const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function handleClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    status.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
  } else if (cells.every(cell => cell)) {
    status.textContent = "It's a Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  return winCombos.some(combo => {
    return combo.every(i => cells[i] === currentPlayer);
  });
}

function restartGame() {
  cells.fill("");
  document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
  currentPlayer = "X";
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s Turn`;
}

document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", handleClick);
});
restartBtn.addEventListener("click", restartGame);
