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

// all zeros
let gameOfLife = Array.from({ length: 10 }, () =>
  Array.from({ length: 10 }, () => 0)
);

// replace the canvas with the grid
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

const speedSlider = document.getElementById("speed-slider");
const gridSlider = document.getElementById("grid-slider");
const startStopButton = document.getElementById("start-stop");
const resetButton = document.getElementById("reset");
const timeSpan = document.getElementById("time");
const populationSpan = document.getElementById("population");
let paused = true;

const gameCanvas = document.getElementById("game-of-life");
drawGrid(gameOfLife, 40, gameCanvas);

//initialize game state
let state = initState(gameOfLife, speedSlider.value, 40);
const gameHeight = gameCanvas.height;
let isMouseDown = false;

gameCanvas.onmousemove = function (event) {
  const cellSize = state.config.cellSize;
  const x = Math.floor(event.offsetX / cellSize);
  const y = Math.floor(event.offsetY / cellSize);

  if (x >= 0 && x < state.config.cols && y >= 0 && y < state.config.rows) {
    // Clear the canvas
    const ctx = gameCanvas.getContext("2d");
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    // Redraw the grid
    drawGrid(state.grid, cellSize, gameCanvas);

    // Highlight the hovered cell
    ctx.fillStyle = "darkgreen";
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);

    // Redraw the grid lines over the highlighted cell
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
  }
};

gameCanvas.onmousedown = function (event) {
  isMouseDown = true;
  const cellSize = state.config.cellSize;
  const x = Math.floor(event.offsetX / cellSize);
  const y = Math.floor(event.offsetY / cellSize);

  if (x >= 0 && x < state.config.cols && y >= 0 && y < state.config.rows) {
    if (state.grid[y][x]) state.grid[y][x] = 0;
    else state.grid[y][x] = 1;
    drawGrid(state.grid, cellSize, gameCanvas);
  }
};

gameCanvas.onmouseup = function () {
  isMouseDown = false;
};

gridSlider.oninput = function () {
  if (paused) {
    const heightInCells = 40 * 10; //cell size * number of cells in a row
    const sliderValue = parseInt(gridSlider.value);

    const newCellSize = heightInCells / sliderValue;
    const newRows = Math.ceil(gameHeight / newCellSize);
    const newColumns = newRows;

    let newGameGrid = Array.from({ length: newRows }, () =>
      Array.from({ length: newColumns }, () => 0)
    );
    newGameGrid = mapOldGridToNewGrid(state.grid, newGameGrid);
    let config = {
      rows: newRows,
      cols: newColumns,
      cellSize: newCellSize,
      speed: gameSpeed,
    };
    state = updateState(state, newGameGrid, config);
    drawGrid(state.grid, newCellSize, gameCanvas);
  } else {
    pauseState(state);
    throw new Error("Cannot change grid size while game is running");
  }
};

speedSlider.oninput = function () {
  gameSpeed = parseInt(speedSlider.value);
  state.config.speed = gameSpeed;
  updateState(state, state.grid, state.config);
};

resetButton.onclick = function () {
  paused = true;
  let resetGrid = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => 0)
  );
  state = resetState(state, state.config, resetGrid);
  drawGrid(state.grid, 40, gameCanvas);
};

startStopButton.onclick = function () {
  if (paused) {
    paused = false;
    gameSpeed = parseInt(speedSlider.value);
    state.config.speed = gameSpeed;
    playGame(state);
  } else {
    paused = true;
    pauseState(state);
  }
};
