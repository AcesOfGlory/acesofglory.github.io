const HIGHLIGHT_COLOUR = "#ADD8E6",
      FIXED_NUMBER_COLOUR = "#DDDDDD",
      DIFFICULTIES = {
        "Easy": [0.5, 50],
        "Medium": [0.4, 40],
        "Hard": [0.3, 30]
      },
      TO_NUM = {
        'K': 11, 'Y': 25, 'H': 8, 'E': 5, 'B': 2, 'X': 24, 'P': 16, 'W': 23, 'N': 14, 'I': 9,
        'J': 10, 'U': 21, 'A': 1, 'Q': 17, 'T': 20, 'V': 22, 'C': 3, 'M': 13, 'Z': 26,
        'F': 6, 'L': 12, 'G': 7, 'R': 18, 'S': 19, 'O': 15, 'D': 4
      },
      TO_CHAR = {
        1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'F', 7: 'G', 8: 'H', 9: 'I', 10: 'J', 11: 'K', 12: 'L',
        13: 'M', 14: 'N', 15: 'O', 16: 'P', 17: 'Q', 18: 'R', 19: 'S', 20: 'T', 21: 'U', 22: 'V', 23: 'W',
        24: 'X', 25: 'Y', 26: 'Z'
      },
      SOLVED_SUDOKU = [[1, 3, 2, 5, 7, 9, 4, 6, 8],
                       [4, 9, 8, 2, 6, 1, 3, 7, 5],
                       [7, 5, 6, 3, 8, 4, 2, 1, 9],
                       [6, 4, 3, 1, 5, 8, 7, 9, 2],
                       [5, 2, 1, 7, 9, 3, 8, 4, 6],
                       [9, 8, 7, 4, 2, 6, 5, 3, 1],
                       [2, 1, 4, 9, 3, 5, 6, 8, 7],
                       [3, 6, 5, 8, 1, 7, 9, 2, 4],
                       [8, 7, 9, 6, 4, 2, 1, 5, 3]];

var seconds = 0, minutes = 0, hours = 0, totalTime = 0, timeLoop,
    isRevealed = false,
    isGenerated = false,
    currentObj, previousObj,
    type;

if (typeof(Storage) !== "undefined") {
  var correctSolutions = localStorage.correctSolutions ? +localStorage.correctSolutions : 0,
      attempts = localStorage.attempts ? +localStorage.attempts : 0,
      givenUp = localStorage.givenUp ? +localStorage.givenUp : 0,
      shortestTime = localStorage.shortestTime ? +localStorage.shortestTime : null;
}


function createHiddenBoard(final, difficulty, difficultyLimit){
  var revealedCount = 0;
  var hidden = [];

  for (var i = 0; i < 9; i++){
    var temp = [];
    for (var j = 0; j < 9; j++){
      if (Math.random() <= difficulty && revealedCount <= difficultyLimit){
        revealedCount++;
        temp.push(final[i][j]);
      }
      else {
        temp.push(0);
      }
    }
    hidden.push(temp);
  }
  return hidden;
}

function validSolution(board){
  const isDuplicate = board => {
    return board.every(x => new Set(x).size == 9);
  };

  const validateColumns = board => {
    var column = [];
    for(var i = 0; i < 9; i++){
      var temp = [];
      for(var j = 0; j < 9; j++){
        temp.push(board[j][i]);
      }
      column.push(temp);
    }
    return isDuplicate(column);
  };

  const validateBoxes = board => {
    var sudoku = [];
    for (var i = 0; i < 9; i += 3){
      for (var j = 0; j < 9; j += 3){
        var nums = [...board[i].slice(j, j+3),
                    ...board[i+1].slice(j, j+3),
                    ...board[i+2].slice(j, j+3)];
        sudoku.push(nums);
      }
    }
    return isDuplicate(sudoku);
  };

  return isDuplicate(board) && validateColumns(board) && validateBoxes(board);
}

function getSolution(sudoku) {
  const checkRow = (sudoku, row, value) => {
    for (var i = 0; i < 9; i++){
      if (sudoku[row][i] == value)
        return false;
    }
    return true;
  }

  const checkColumn = (sudoku, col, value) => {
    for (var j = 0; j < 9; j++){
      if (sudoku[j][col] == value)
        return false;
    }
    return true;
  }

  const checkBox = (sudoku, row, col, value) => {
    const colDifference = (col - col % 3),
          rowDifference = (row - row % 3);

    for (var i = 0; i < 3; i++){
      for (var j = 0; j < 3; j++){
        if (sudoku[rowDifference+i][colDifference+j] == value)
          return false;
      }
    }
    return true;
  }

  const sudokuSolver = (sudoku, row=0, column=0) => {
    if (row == 9) {
      row = 0;
      if (++column == 9)
        return true;
    }

    if (sudoku[row][column] > 0)
      return sudokuSolver(sudoku, row+1, column);

    for (var n = 1; n <= 9; n++) {
      const isCorrect = checkRow(sudoku, row, n)
                     && checkColumn(sudoku, column, n)
                     && checkBox(sudoku, row, column, n);

      if (isCorrect) {
        sudoku[row][column] = n;
        if (sudokuSolver(sudoku, row+1, column))
          return true;
      }
    }
    sudoku[row][column] = 0;
    return false;
  }


  return sudokuSolver(sudoku) ? sudoku : null;
}

function generateSudoku(matrix){
	for (var i = 0; i < 9; i += 3){
		for (let _ = 0; _ < 3; _++){
			let row1 = Math.floor(Math.random()*3),
			    row2 = Math.floor(Math.random()*3),
          col1 = Math.floor(Math.random()*3),
			    col2 = Math.floor(Math.random()*3);

			while (row1 == row2)
				row2 = Math.floor(Math.random()*3);

      while (col1 == col2)
				col2 = Math.floor(Math.random()*3);

			row1 += i;
			row2 += i;
      col1 += i;
			col2 += i;

      let temp = matrix[row1];
			matrix[row1] = matrix[row2];
			matrix[row2] = temp;

			temp = [];
			for (let x = 0; x < matrix.length; x++){
				let tempValue = matrix[x][col1];
				matrix[x][col1] = matrix[x][col2];
				matrix[x][col2] = tempValue;
			}
		}
	}
  return matrix;
}
