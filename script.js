// Select elements
const gameBoard = document.getElementById("game-board");
const statusDiv = document.getElementById("status");
const restartButton = document.getElementById("restart-btn");

// Variables to track the game
let currentPlayer = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize the game board
function createBoard() {
  gameBoard.innerHTML = ""; // Clear board
  boardState = ["", "", "", "", "", "", "", "", ""]; // Reset board state
  currentPlayer = "X"; // Reset to player X
  gameActive = true; // Reset game status
  statusDiv.textContent = `Player ${currentPlayer}'s turn`; // Update status

  // Create 9 cells
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i; // Store index for tracking
    cell.addEventListener("click", handleCellClick);
    gameBoard.appendChild(cell);
  }
}

// Handle cell click
function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  // Ignore click if cell is already taken or game is inactive
  if (boardState[index] !== "" || !gameActive) return;

  // Mark the cell and update the state
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  // Check for winner or tie
  if (checkWinner()) {
    statusDiv.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
  } else if (boardState.every((cell) => cell !== "")) {
    statusDiv.textContent = "It's a tie! 🤝";
    gameActive = false;
  } else {
    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check for a winner
function checkWinner() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => boardState[index] === currentPlayer);
  });
}

// Restart the game
restartButton.addEventListener("click", createBoard);

// Start the game
createBoard();
