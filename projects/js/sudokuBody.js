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


function createSudoku(board, isReset=false){
  const getDifficulty = document.getElementsByName("difficulty-setting");

  for (var i = 0; i < getDifficulty.length; i++){
    if (getDifficulty[i].checked)
      var [difficulty, limit] = DIFFICULTIES[getDifficulty[i].id];
  }
  var hidden = createHiddenBoard(board, difficulty, limit);

  for (var i = 1; i <= 9; i++){
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

      if (hidden[i-1][j-1] !== 0){
        element.innerHTML = hidden[i-1][j-1];
        element.style.backgroundColor = FIXED_NUMBER_COLOUR;
        element.onclick = null;
      }
      else{
        element.innerHTML = "";
        element.style.backgroundColor = "";
        element.onclick = initialise;
      }
    }
  }
  return hidden;
}


function revealNumbers(hiddenBoard, finalBoard){
  for (var i = 1; i <= 9; i++){
    for (var j = 1; j <= 9; j++){
      var element = document.getElementById(i+"x"+j);
      element.innerHTML = finalBoard[i-1][j-1];
      if (hiddenBoard[i-1][j-1] !== 0)
        element.style.backgroundColor = FIXED_NUMBER_COLOUR;
      else
        element.style.backgroundColor = "";
    }
  }
  isRevealed = true;
}


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

  if (e.keyCode)
    code = e.keyCode;
  else if (e.which){
    code = e.which;
  }

  if (code == 8 || code == 46)
    currentObj.innerHTML = ""


  var i = +currentObj.id[0], j = +currentObj.id[2],
      nextObj;

  if (code == 39 || code == 68){
    nextObj = document.getElementById(`${i}x${j + 1}`);
    if (j < 8){
	    while (j <= 8 && nextObj && nextObj.style.backgroundColor)
		    nextObj = document.getElementById(`${i}x${++j}`);
    }
  }
  else if (code == 37 || code == 65){
    nextObj = document.getElementById(`${i}x${j - 1}`);
    if (j > 0){
      while (j >= 0 && nextObj && nextObj.style.backgroundColor)
        nextObj = document.getElementById(`${i}x${--j}`);
    }
  }
  else if (code == 40 || code == 83){
    nextObj = document.getElementById(`${i + 1}x${j}`);
    if (i < 8){
      while (i <= 8 && nextObj && nextObj.style.backgroundColor)
        nextObj = document.getElementById(`${++i}x${j}`);
    }
  }
  else if (code == 38 || code == 87){
    nextObj = document.getElementById(`${i - 1}x${j}`);
    if (i > 0){
      while (i >= 0 && nextObj && nextObj.style.backgroundColor)
        nextObj = document.getElementById(`${--i}x${j}`);
    }
  }

  if (nextObj){

    if (nextObj.style.backgroundColor) return false;

    currentObj = nextObj;
    currentObj.style.backgroundColor = HIGHLIGHT_COLOUR;
    previousObj.style.backgroundColor = "";
    previousObj = currentObj;
  }

  var theChar = String.fromCharCode(code)

  if ((code >= 49 && code <= 57))
    currentObj.innerHTML = theChar;
  else if (code >= 97 && code <= 105)
    currentObj.innerHTML = String.fromCharCode(code - 48);
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


function newGame(){
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
    if (document.getElementsByName("generation-algorithm")[0].checked){
      localStorage.correctSolutions = ++correctSolutions;

      if (shortestTime === null || totalTime < shortestTime){
        shorestTime = totalTime;
        localStorage.shortestTime = totalTime;
      }
    }
  }
  else{
    alert("That's wrong. Try again.");
  }
}

function restart(){
  if (!isGenerated) return false;

  if (document.getElementsByName("generation-algorithm")[1].checked && isRevealed){
    isRevealed = false;
    createSudoku(hiddenBoard, true);
    resetClock();
  }


  if (document.getElementsByName("generation-algorithm")[1].checked){
    hiddenBoard = getSudoku();
  }

  if (isRevealed) return false;
  createSudoku(hiddenBoard, true);
  resetClock();
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
    revealNumbers(hiddenBoard, finalBoard);
  }
  var squareElement = document.getElementsByTagName("td");

  for (var i = 0; i < squareElement.length; i++)
    squareElement[i].onclick = null;
}
