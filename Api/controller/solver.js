function isValid(grid, row, col, num) {
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num || grid[x][col] === num || grid[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
        return false;
      }
    }
    return true;
  }
  
  function solveSudoku(grid) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === '') {
          for (let num = 1; num <= 9; num++) {
            if (isValid(grid, row, col, num.toString())) {
              grid[row][col] = num.toString();
              if (solveSudoku(grid)) return grid;
              grid[row][col] = '';
            }
          }
          return false;
        }
      }
    }
    return grid;
  }
  
  function generateSudoku() {
    // Basic Sudoku generation logic
    const emptyGrid = Array(9).fill('').map(() => Array(9).fill(''));
    // Add some pre-filled values for a valid puzzle
    emptyGrid[0][0] = '5';
    emptyGrid[1][1] = '6';
    return emptyGrid;
  }
  
export { solveSudoku, generateSudoku };
  