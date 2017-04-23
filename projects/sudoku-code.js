const HIGHLIGHT_COLOUR = "#ADD8E6",
      FIXED_NUMBER_COLOUR = "#DDDDDD",
      SOLVED_SUDOKU = [[1, 3, 2, 5, 7, 9, 4, 6, 8],
                       [4, 9, 8, 2, 6, 1, 3, 7, 5],
                       [7, 5, 6, 3, 8, 4, 2, 1, 9],
                       [6, 4, 3, 1, 5, 8, 7, 9, 2],
                       [5, 2, 1, 7, 9, 3, 8, 4, 6],
                       [9, 8, 7, 4, 2, 6, 5, 3, 1],
                       [2, 1, 4, 9, 3, 5, 6, 8, 7],
                       [3, 6, 5, 8, 1, 7, 9, 2, 4],
                       [8, 7, 9, 6, 4, 2, 1, 5, 3]];

var displayTimer = document.getElementById("displayTime"),
    changeDimensions = document.getElementsByTagName("td"),
    seconds = 0, minutes = 0, hours = 0, totalTime = 0, timeLoop,
    isRevealed = false,
    isGenerated = false,
    finalBoard, hiddenBoard,
    currentObj, previousObj;

if (typeof(Storage) !== "undefined") {
  var correctSolutions = localStorage.correctSolutions ? +localStorage.correctSolutions : 0,
      attempts = localStorage.attempts ? +localStorage.attempts : 0,
      givenUp = localStorage.givenUp ? +localStorage.givenUp : 0,
      shortestTime = localStorage.shortestTime ? +localStorage.shortestTime : null;
}

function showStatistics(){
  alert(`Statistics\n------------\n\n`
      + `Attempts: ${attempts}\n`
      + `Correct Solutions: ${correctSolutions}\n`
      + `Given Up: ${givenUp}\n`
      + `Shortest Time: ${shortestTime}`
    );
}

function showRules(){
  alert(`Rules\n-------\n\n`
      + `1. No duplicates of the numbers 1-9 horizontally\n`
      + `2. No duplicates of the numbers 1-9 vertically\n`
      + `3. No duplicates of the numbers 1-9 in the 3x3 cell groups`
    );
}


document.getElementById("inputHeight").addEventListener("input", () => {
  const elementHeight = +document.getElementById("inputHeight").value;
  if (elementHeight < 10 || elementHeight > 80) return false;

  for (var i = 0; i < changeDimensions.length; i++) {
    changeDimensions[i].style.height = elementHeight + "px";
  }
}, false);

document.getElementById("inputWidth").addEventListener("input", () => {
  const elementWidth = +document.getElementById("inputWidth").value;
  if (elementWidth < 10 || elementWidth > 80) return false;

  for (var i = 0; i < changeDimensions.length; i++) {
    changeDimensions[i].style.width = elementWidth + "px";
  }
}, false);


function initialise(e){
  currentObj = this;
  if (previousObj && previousObj.style.backgroundColor == "rgb(221, 221, 221)")
    previousObj = currentObj;

  currentObj.style.backgroundColor = HIGHLIGHT_COLOUR;

  if (previousObj === undefined)
    previousObj = currentObj;
  else
    previousObj.style.backgroundColor = "";

  if (previousObj.id == currentObj.id)
    currentObj.style.backgroundColor = HIGHLIGHT_COLOUR;

  previousObj = currentObj;

	document.documentElement.onkeydown = insertNumber;
}

function insertNumber(e){
  if (isRevealed) return false;

  if (previousObj.style.backgroundColor == "rgb(221, 221, 221)") return false;

  if (e.keyCode)
    code = e.keyCode;
  else if (e.which)
    code = e.which;

  if (code == 8)
    currentObj.innerHTML = ""

  if (code >= 37 && code <= 40){
    var [i, _, j] = currentObj.id,
        i = +i, j = +j,
        nextObject;

    if (code == 39){
      nextObject = document.getElementById(`${i}x${j + 1}`);
      if (j < 8){
        if(nextObject.style.backgroundColor){
					while (j <= 8 && nextObject.style.backgroundColor)
						nextObject = document.getElementById(`${i}x${++j}`);
        }
      }
    }
    else if (code == 37){
      nextObject = document.getElementById(`${i}x${j - 1}`);
      if (j > 0){
        if(nextObject.style.backgroundColor){
          while (j >= 0 && nextObject.style.backgroundColor)
            nextObject = document.getElementById(`${i}x${--j}`);
        }
      }
    }
    else if (code == 40){
      nextObject = document.getElementById(`${i + 1}x${j}`);
      if (i < 8){
        if(nextObject.style.backgroundColor){
          while (i <= 8 && nextObject.style.backgroundColor)
            nextObject = document.getElementById(`${++i}x${j}`);
        }
      }
    }
    else{
      nextObject = document.getElementById(`${i - 1}x${j}`);
      if (i > 0){
        if(nextObject.style.backgroundColor){
          while (i >= 0 && nextObject.style.backgroundColor)
            nextObject = document.getElementById(`${--i}x${j}`);
        }
      }
    }

    if (!nextObject || nextObject.style.backgroundColor) return false;

    currentObj = nextObject;
    currentObj.style.backgroundColor = HIGHLIGHT_COLOUR
    previousObj.style.backgroundColor = "";
    previousObj = currentObj;
  }

  var theChar = String.fromCharCode(code);
  if (/[1-9]/.test(theChar))
    currentObj.innerHTML = theChar;
}

function getSudoku(){
  var matrix = [],
      temp = [],
      boxes = document.getElementsByTagName("td");

  for (var i = 0; i < boxes.length; i++){
    temp.push(+boxes[i].innerHTML)
    if (i % 9 == 8){
      matrix.push(temp);
      temp = [];
    }
  }
  return matrix;
}

function createSudoku(board, isReset=false){
  var hiddenBoard = [],
      revealedCount = 0;

  const getDifficulty = document.getElementsByName("difficulty-setting"),
        difficulty = getDifficulty[0].checked ? 0.40 : getDifficulty[1].checked ? 0.35 : getDifficulty[2].checked ? 0.25 : 0.3,
        difficultyLimit = getDifficulty[0].checked ? 40 : getDifficulty[1].checked ? 35 : getDifficulty[2].checked ? 25 : 25;

  for (var i = 1; i <= 9; i++){
    var temp = [];
    for (var j = 1; j <= 9; j++){
      var element = document.getElementById(i+"x"+j);
      if (isReset){
        if (board[i-1][j-1] === 0){
          element.innerHTML = "";
          element.style.backgroundColor = "";
          element.onclick = initialise;
        }
        else{
          element.innerHTML = board[i-1][j-1];
          element.style.backgroundColor = FIXED_NUMBER_COLOUR;
          element.onclick = null;
        }
        continue;
      }

      if (Math.random() <= difficulty && revealedCount <= difficultyLimit){
		    revealedCount++;
        temp.push(board[i-1][j-1])
        element.innerHTML = board[i-1][j-1];
        element.style.backgroundColor = FIXED_NUMBER_COLOUR;
        element.onclick = null;
      }
      else{
        temp.push(0);
        element.innerHTML = "";
        element.style.backgroundColor = "";
        element.onclick = initialise;
      }
    }
    hiddenBoard.push(temp);
  }
  return hiddenBoard;
}

function revealNumbers(hiddenBoard, finalBoard){
  for (var i = 1; i <= 9; i++){
    for (var j = 1; j <= 9; j++){
      const element = document.getElementById(i+"x"+j)
      element.innerHTML = finalBoard[i-1][j-1];
      if (hiddenBoard[i-1][j-1] !== 0)
        element.style.backgroundColor = FIXED_NUMBER_COLOUR;
      else
        element.style.backgroundColor = "";
    }
  }
  isRevealed = true;
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

function getSolution(puzzle) {
    const findNext = (line, col) => {
        while (line <= 8) {
            while (++col <= 8) {
                if (puzzle[line][col] === 0)
                    return [line, col];
            }
            line++;
            col = -1;
        }
        return undefined;
    };

    const valid = (line, col, i) => {
        for (var k = 0; k < 9; k++) {
            if (puzzle[line][k] === i || puzzle[k][col] === i)
                return false;
        }

        var blockY = line - line % 3;
        var blockX = col - col % 3;
        for (var k = 0; k < 3; k++) {
            for (var j = 0; j < 3; j++) {
                if (puzzle[blockY + k][blockX + j] === i)
                    return false;
            }
        }

        return true;
    };

    const DFS = (line, col) => {
        for (var i = 1; i <= 9; i++) {
            if (valid(line, col, i)) {
                puzzle[line][col] = i;
                var pos = findNext(line, col);
                if (pos === undefined || DFS(pos[0], pos[1]))
                    return true;
                puzzle[line][col] = 0;
            }
        }
        return false;
    };

    var pos = findNext(0, -1);
    if (pos !== undefined)
        DFS(pos[0], pos[1]);
    return puzzle;
}


const getDisplay = time => time > 9 ? time : "0" + time;

function add() {
  seconds++;
  totalTime++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }

  displayTimer.innerHTML = (hours ? getDisplay(hours) : "00")
                         + ":" + (minutes ? getDisplay(minutes) : "00")
                         + ":" + getDisplay(seconds);
  timer();
}

function timer() {
  timeLoop = setTimeout(add, 1000);
}

function resetClock(){
  if (!isGenerated) return false;
  document.getElementById("displayTime").innerHTML = "00:00:00";
  seconds = 0, minutes = 0, hours = 0, totalTime = 0;
}


function generateSudoku(matrix){
	for (var i = 0; i < 9; i += 3){
		for (let _ = 0; _ < 3; _++){
			let row1 = Math.floor(Math.random()*3);
			let row2 = Math.floor(Math.random()*3);
			while (row1 == row2)
				row2 = Math.floor(Math.random()*3);

			row1 += i;
			row2 += i;

			let temp = matrix[row1];
			matrix[row1] = matrix[row2];
			matrix[row2] = temp;

			let col1 = Math.floor(Math.random()*3);
			let col2 = Math.floor(Math.random()*3);
			while (col1 == col2)
				col2 = Math.floor(Math.random()*3);

			col1 += i;
			col2 += i;

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


function newGame(){
  hiddenBoard = undefined;
  isGenerated = true;
  hasGivenUp = false;
  isRevealed = false;
  totalTime = 0;

  resetClock();
  clearTimeout(timeLoop);

  var squareElement = document.getElementsByTagName("td"),
      getGen = document.getElementsByName("generation-algorithm");

  if (getGen[0].checked){
    finalBoard = generateSudoku(SOLVED_SUDOKU);
  }
  if (getGen[1].checked){
    for (var i = 0; i < squareElement.length; i++){
      squareElement[i].onclick = initialise;
      squareElement[i].innerHTML = "";
      squareElement[i].style.backgroundColor = "";
    }
    return false;
  }

  localStorage.attempts = ++attempts;
  timer();
  hiddenBoard = createSudoku(finalBoard);
}

function validate(){
  if (isRevealed) return false;
  if (!isGenerated) return false;

  const isCompleted = validSolution(getSudoku());

  if (isCompleted){
    clearTimeout(timeLoop);
    alert("That's right. Well done!");
    localStorage.correctSolutions = ++correctSolutions;

    if (shortestTime === null || totalTime < shortestTime){
      shorestTime = totalTime;
      localStorage.shortestTime = totalTime;
    }
  }
  else{
    alert("That's wrong. Try again.");
  }
}

function restart(){
  if (!isGenerated) return false;

  var isCustom = document.getElementsByName("generation-algorithm")[1].checked;
  if (isCustom)
    isRevealed = false;

  if (isRevealed) return false;
  resetClock();
  createSudoku(hiddenBoard, true);
}

function showSolution(){
  if (!isGenerated) return false;
  if (document.getElementsByName("generation-algorithm")[1].checked){
    hiddenBoard = getSudoku();
    var hiddenCustomBoard = getSudoku(),
        finalCustomBoard = getSolution(hiddenCustomBoard);

    revealNumbers(hiddenBoard, finalCustomBoard);
  }
  else {
    localStorage.givenUp = ++givenUp;
    clearTimeout(timeLoop);
    isRevealed = false;
    revealNumbers(hiddenBoard, finalBoard);
  }
  var squareElement = document.getElementsByTagName("td");

  for (var i = 0; i < squareElement.length; i++)
    squareElement[i].onclick = null;
}
