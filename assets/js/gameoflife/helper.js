// helper.js

// Count the number of live neighbors for a cell at (x, y)
export function countNeighbors(grid, x, y) {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  directions.forEach(([dx, dy]) => {
    const newX = x + dx;
    const newY = y + dy;
    if (
      newX >= 0 &&
      newX < rows &&
      newY >= 0 &&
      newY < cols &&
      grid[newX][newY] === 1
    ) {
      count++;
    }
  });

  return count;
}

// Map the old grid to a new grid size
export function mapOldGridToNewGrid(oldGrid, newGrid) {
  const oldRows = oldGrid.length;
  const oldCols = oldGrid[0].length;
  const newRows = newGrid.length;
  const newCols = newGrid[0].length;

  for (let i = 0; i < Math.min(oldRows, newRows); i++) {
    for (let j = 0; j < Math.min(oldCols, newCols); j++) {
      newGrid[i][j] = oldGrid[i][j];
    }
  }

  return newGrid;
}

// In this pattern, two gliders approach each other and collide to represent an addition operation.
// Gliders moving in opposite directions represent binary numbers.
// The result of the collision can be interpreted as a sum depending on the glider output.

export const additionPattern = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
];

// Here, the "1"s represent cells that will interact when gliders arrive.
// When both inputs are "1", the pattern will change to reflect the AND operation output.


export const andGatePattern = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

// This pattern is known as a "block" in the Game of Life, a stable structure.
// It represents a "bit" of data in memory.
// When struck by a glider, it can toggle to a different stable pattern to represent a bit change. (0 to 1 or 1 to 0)

export const memoryCellPattern = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
];



// This pattern is a small glider gun setup that sends gliders periodically.
// These gliders can act as "clock pulses" to trigger specific operations.

export const controlUnitPattern = [
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
];