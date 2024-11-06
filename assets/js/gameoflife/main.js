import {
  initState,
  pauseState,
  resetState,
  playGame,
  updateState,
} from "./game.js";
import { mapOldGridToNewGrid } from "./helper.js";

const lessThanTwoGrid = [
  [1, 0, 0, 0, 0],
  [1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const lessThanTwoDeadGrid = [
  [1, 0, 0, 0, 0],
  [1, 1, -1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const twoOrThreeGrid = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const twoOrThreeLiveGrid = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const moreThanThreeGrid = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const moreThanThreeDeadGrid = [
  [0, 0, 0, 0, 0],
  [0, 1, -1, 0, 0],
  [0, 1, -1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const threeGrid = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 1, -1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const threeLiveGrid = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

let gameOfLife = Array.from({ length: 10 }, () =>
  Array.from({ length: 10 }, () => 0)
);

function drawGrid(grid, cellSize, canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = grid[0].length * cellSize;
  canvas.height = grid.length * cellSize;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 1) {
        ctx.fillStyle = "lightgreen";
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      } else if (cell === -1) {
        ctx.fillStyle = "gray";
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
    });
  });
}

const lessThanTwoCanvas = document.getElementById("lessthantwo");
const lessThanTwoDeadCanvas = document.getElementById("lessthantwodead");

const twoOrThreeCanvas = document.getElementById("twoorthree");
const twoOrThreeLiveCanvas = document.getElementById("twoorthreelive");

const moreThanThreeCanvas = document.getElementById("morethanthree");
const moreThanThreeDeadCanvas = document.getElementById("morethanthreedead");

const deadThreeCanvas = document.getElementById("three");
const deadThreeLiveCanvas = document.getElementById("threelive");

drawGrid(lessThanTwoGrid, 20, lessThanTwoCanvas);
drawGrid(lessThanTwoDeadGrid, 20, lessThanTwoDeadCanvas);

drawGrid(twoOrThreeGrid, 20, twoOrThreeCanvas);
drawGrid(twoOrThreeLiveGrid, 20, twoOrThreeLiveCanvas);

drawGrid(moreThanThreeGrid, 20, moreThanThreeCanvas);
drawGrid(moreThanThreeDeadGrid, 20, moreThanThreeDeadCanvas);

drawGrid(threeGrid, 20, deadThreeCanvas);
drawGrid(threeLiveGrid, 20, deadThreeLiveCanvas);

let gameSpeed = 0;

// Initialize game state
const gameCanvas = document.getElementById("game-of-life");
const generationSpan = document.getElementById("generation");
let state = initState(gameOfLife, 1, 40);
drawGrid(state.grid, state.config.cellSize, gameCanvas);

// Event listeners
const speedSlider = document.getElementById("speed-slider");
const gridSlider = document.getElementById("grid-slider");
const startStopButton = document.getElementById("start-stop");
const resetButton = document.getElementById("reset");

gameCanvas.addEventListener("mousemove", function (event) {
  if (!state.paused) return;

  const cellSize = state.config.cellSize;
  const x = Math.floor(event.offsetX / cellSize);
  const y = Math.floor(event.offsetY / cellSize);

  if (x >= 0 && x < state.config.cols && y >= 0 && y < state.config.rows) {
    const ctx = gameCanvas.getContext("2d");

    // Redraw the grid
    drawGrid(state.grid, cellSize, gameCanvas);

    // Highlight the hovered cell
    ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
  }
});

gameCanvas.addEventListener("mousedown", function (event) {
  if (!state.paused) return;

  const cellSize = state.config.cellSize;
  const x = Math.floor(event.offsetX / cellSize);
  const y = Math.floor(event.offsetY / cellSize);

  if (x >= 0 && x < state.config.cols && y >= 0 && y < state.config.rows) {
    state.grid[y][x] = state.grid[y][x] ? 0 : 1;
    drawGrid(state.grid, cellSize, gameCanvas);
  }
});

gridSlider.oninput = function () {
  if (state.paused) {
    const sliderValue = parseInt(gridSlider.value);
    const newCellSize = gameCanvas.height / sliderValue;
    const newRows = sliderValue;
    const newColumns = sliderValue;

    let newGameGrid = Array.from({ length: newRows }, () =>
      Array.from({ length: newColumns }, () => 0)
    );
    newGameGrid = mapOldGridToNewGrid(state.grid, newGameGrid);
    let config = {
      rows: newRows,
      cols: newColumns,
      cellSize: newCellSize,
      speed: state.config.speed,
    };
    state = updateState(state, newGameGrid, config);
    drawGrid(state.grid, newCellSize, gameCanvas);
  } else {
    alert("Cannot change grid size while game is running");
  }
};

speedSlider.oninput = function () {
  state.config.speed = parseInt(speedSlider.value);
};

resetButton.onclick = function () {
  const resetGrid = Array.from({ length: state.config.rows }, () =>
    Array.from({ length: state.config.cols }, () => 0)
  );
  state = resetState(state, state.config, resetGrid);
  drawGrid(state.grid, state.config.cellSize, gameCanvas);
  generationSpan.textContent = "0";
  timeElapsedSpan.textContent = "0s";
};

startStopButton.onclick = function () {
  state.paused = !state.paused;
  if (!state.paused) {
    playGame(state, drawGrid, gameCanvas);
    startStopButton.textContent = "Pause";
  } else {
    startStopButton.textContent = "Start";
  }
};
