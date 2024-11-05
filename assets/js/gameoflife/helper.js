export function mapOldGridToNewGrid(oldGrid, newGrid) {
  const oldRows = oldGrid.length;
  const oldCols = oldGrid[0].length;
  const newRows = newGrid.length;
  const newCols = newGrid[0].length;

  const rowOffset = Math.floor((oldRows - newRows) / 2);
  const colOffset = Math.floor((oldCols - newCols) / 2);

  for (let row = 0; row < newRows; row++) {
    for (let col = 0; col < newCols; col++) {
      const oldRow = row + rowOffset;
      const oldCol = col + colOffset;
      if (oldRow >= 0 && oldRow < oldRows && oldCol >= 0 && oldCol < oldCols) {
        newGrid[row][col] = oldGrid[oldRow][oldCol];
      }
    }
  }

  return newGrid;
}
