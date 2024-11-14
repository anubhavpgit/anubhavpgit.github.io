import {
  initState,
  pauseState,
  resetState,
  playGame,
  updateState,
} from "./game.js";
import {
  mapOldGridToNewGrid,
  additionPattern,
  andGatePattern,
  memoryCellPattern,
  controlUnitPattern,
  gliderGunPattern,
  lessThanTwoGrid,
  lessThanTwoDeadGrid,
  twoOrThreeGrid,
  twoOrThreeLiveGrid,
  moreThanThreeGrid,
  moreThanThreeDeadGrid,
  threeGrid,
  threeLiveGrid,
} from "./helper.js";

const lessThanTwoCanvas = document.getElementById("lessthantwo");
const lessThanTwoDeadCanvas = document.getElementById("lessthantwodead");

const twoOrThreeCanvas = document.getElementById("twoorthree");
const twoOrThreeLiveCanvas = document.getElementById("twoorthreelive");

const moreThanThreeCanvas = document.getElementById("morethanthree");
const moreThanThreeDeadCanvas = document.getElementById("morethanthreedead");

const deadThreeCanvas = document.getElementById("three");
const deadThreeLiveCanvas = document.getElementById("threelive");

const aluAddition = document.getElementById("alu-addition");
const aluAnd = document.getElementById("alu-andgate");
const memoryCell = document.getElementById("memory");
const controlUnit = document.getElementById("control");

const gliderGun = document.getElementById("glider");

let addState = initState(additionPattern, 1, 20);
let andState = initState(andGatePattern, 1, 20);
let memoryState = initState(memoryCellPattern, 1, 20);
let controlState = initState(controlUnitPattern, 1, 20);

let gliderGunState = initState(gliderGunPattern, 20, 7);

let gameOfLife = Array.from({ length: 10 }, () =>
  Array.from({ length: 10 }, () => 0)
);

function drawGrid(grid, cellSize, canvas, lineWidth = 1) {
  if (!canvas || !canvas.getContext) {
    throw new Error("Canvas not found");
  }
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
      ctx.lineWidth = lineWidth;
      ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
    });
  });
}

drawGrid(addState.grid, addState.config.cellSize, aluAddition);
drawGrid(andState.grid, andState.config.cellSize, aluAnd);
drawGrid(memoryState.grid, memoryState.config.cellSize, memoryCell);
drawGrid(controlState.grid, controlState.config.cellSize, controlUnit);

drawGrid(lessThanTwoGrid, 20, lessThanTwoCanvas);
drawGrid(lessThanTwoDeadGrid, 20, lessThanTwoDeadCanvas);

drawGrid(twoOrThreeGrid, 20, twoOrThreeCanvas);
drawGrid(twoOrThreeLiveGrid, 20, twoOrThreeLiveCanvas);

drawGrid(moreThanThreeGrid, 20, moreThanThreeCanvas);
drawGrid(moreThanThreeDeadGrid, 20, moreThanThreeDeadCanvas);

drawGrid(threeGrid, 20, deadThreeCanvas);
drawGrid(threeLiveGrid, 20, deadThreeLiveCanvas);

drawGrid(gliderGunState.grid, gliderGunState.config.cellSize, gliderGun, 0.2);
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
  gameCanvas.style.cursor = "pointer";
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

aluAddition.addEventListener("mousemove", function (_event) {
  aluAddition.style.cursor = "pointer";
});

aluAnd.addEventListener("mousemove", function (_event) {
  aluAnd.style.cursor = "pointer";
});

memoryCell.addEventListener("mousemove", function (_event) {
  memoryCell.style.cursor = "pointer";
});

controlUnit.addEventListener("mousemove", function (_event) {
  controlUnit.style.cursor = "pointer";
});

gliderGun.addEventListener("mousemove", function (_event) {
  gliderGun.style.cursor = "pointer";
});

aluAddition.onclick = function () {
  addState.paused = !addState.paused;
  if (!addState.paused) {
    if (addState.generation > 10) {
      addState = resetState(addState, addState.config, additionPattern);
      drawGrid(addState.grid, addState.config.cellSize, aluAddition);
    }
    playGame(addState, drawGrid, aluAddition);
  }
};

aluAnd.onclick = function () {
  andState.paused = !andState.paused;
  if (!andState.paused) {
    if (andState.generation > 10) {
      andState = resetState(andState, andState.config, andGatePattern);
      drawGrid(andState.grid, andState.config.cellSize, aluAnd);
    }
    playGame(andState, drawGrid, aluAnd);
  }
};

memoryCell.onclick = function () {
  memoryState.paused = !memoryState.paused;
  if (!memoryState.paused) {
    if (memoryState.generation > 10) {
      memoryState = resetState(
        memoryState,
        memoryState.config,
        memoryCellPattern
      );
      drawGrid(memoryState.grid, memoryState.config.cellSize, memoryCell);
    }
    playGame(memoryState, drawGrid, memoryCell);
  }
};

controlUnit.onclick = function () {
  controlState.paused = !controlState.paused;
  if (!controlState.paused) {
    if (controlState.generation > 10) {
      controlState = resetState(
        controlState,
        controlState.config,
        controlUnitPattern
      );
      drawGrid(controlState.grid, controlState.config.cellSize, controlUnit);
    }
    playGame(controlState, drawGrid, controlUnit);
  }
};

gliderGun.onclick = function () {
  gliderGunState.paused = !gliderGunState.paused;
  if (!gliderGunState.paused) {
    if (gliderGunState.generation > 10) {
      gliderGunState = resetState(
        gliderGunState,
        gliderGunState.config,
        gliderGunPattern
      );
      drawGrid(
        gliderGunState.grid,
        gliderGunState.config.cellSize,
        gliderGun,
        0.2
      );
    }
    playGame(gliderGunState, drawGrid, gliderGun, 0.2);
  }
};
