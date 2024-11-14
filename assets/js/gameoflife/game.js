// game.js

import { countNeighbors } from "./helper.js";

const generationElement = document.getElementById("generation");
const timeElapsedElement = document.getElementById("time-elapsed");

export function initState(grid, speed, cellSize) {
  const initConfig = {
    rows: grid.length,
    cols: grid[0].length,
    cellSize: cellSize,
    speed: speed,
  };
  const state = {
    generation: 0,
    config: initConfig,
    grid: grid,
    paused: true,
  };
  return state;
}

export function pauseState(state) {
  state.paused = true;
  return state;
}

export function updateState(state, grid, config) {
  state.config = config;
  state.grid = grid;
  return state;
}

export function resetState(state, config, resetGrid) {
  state.generation = 0;
  state.grid = resetGrid;
  state.config = config;
  state.paused = true;
  return state;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function playGame(state, drawGrid, gameCanvas, lineWidth = 1) {
  const { rows, cols } = state.config;
  console.log("playGame called");
  async function gameLoop() {
    if (!state.paused) {
      const newGrid = Array.from({ length: rows }, () => Array(cols).fill(0));

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const neighbors = countNeighbors(state.grid, i, j);
          if (state.grid[i][j] === 1) {
            // Any live cell with two or three live neighbors survives.
            if (neighbors === 2 || neighbors === 3) {
              newGrid[i][j] = 1;
            } else {
              // All other live cells die in the next generation.
              newGrid[i][j] = 0;
            }
          } else {
            // Any dead cell with three live neighbors becomes a live cell.
            if (neighbors === 3) {
              newGrid[i][j] = 1;
            } else {
              newGrid[i][j] = 0;
            }
          }
        }
      }

      state.grid = newGrid;
      drawGrid(state.grid, state.config.cellSize, gameCanvas, lineWidth);
      state.generation++;

      console.log("speed", state.config.speed);

      await sleep(1000 / state.config.speed);
      generationElement.textContent = state.generation;
      gameLoop();
    }
  }

  gameLoop();
}
