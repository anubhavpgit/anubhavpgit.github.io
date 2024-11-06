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
