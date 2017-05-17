var moves = 0,
    height = 4, width = 4,
    currentObj,
    puzzle,
    isEnded;

const SIZE_MAX = 150,
      SIZE_MIN = 10,
      BOARD_MAX = 100,
      BOARD_MIN = 1,
	    FOUR_GEN = 0.2,
      TWO_GEN = 0.8;


function generateBoard() {
  if (!sizeCheck()) return false;

  var table = document.getElementById("puzzleBoardDiv");
  table.removeChild(document.getElementById("puzzleBoardTable"));

  var tableCreation = document.createElement("table");
  tableCreation.id = "puzzleBoardTable";

  var tableBody = document.createElement("tbody");

  for (var i = 0; i < height; i++){
    var tr = document.createElement("tr");
    tableBody.appendChild(tr);

    for (var j = 0; j < width; j++){
      var td = document.createElement("td");
      td.id = `${i}x${j}`;
      td.style.height = document.getElementById("boxHeight").value + "px";
      td.style.width = document.getElementById("boxWidth").value + "px";
      tr.appendChild(td);
    }
  }
  tableCreation.appendChild(tableBody);
  table.appendChild(tableCreation);
  generatePuzzle(height, width);
}

function squaresEmpty(){
  for (var i = 0; i < height; i++){
    for (var j = 0; j < width; j++){
      if (puzzle[i][j] == 0)
        return true;
    }
  }
  return false;
}

function endGame(){
  alert("You lost");
  isEnded = true;
}

function generateNumbers(puzzle, height, width, start=false){
  const randomNumber = _ => Math.random() < FOUR_GEN ? 4 : 2;


  var row1 = Math.floor(Math.random() * height),
      col1 = Math.floor(Math.random() * width);

  if (start){
    var row2 = Math.floor(Math.random() * height),
        col2 = Math.floor(Math.random() * width);

    while (col1 == col2 && row1 == row2){
      row2 = Math.floor(Math.random() * height);
      col2 = Math.floor(Math.random() * width);
    }
    puzzle[row1][col1] = randomNumber();
    puzzle[row2][col2] = randomNumber();
  }
  else {
    if (!squaresEmpty())
      return endGame();

    while (puzzle[row1][col1] != 0){
      row1 = Math.floor(Math.random() * height);
      col1 = Math.floor(Math.random() * width);
    }
    puzzle[row1][col1] = randomNumber();
  }
}

function generatePuzzle(height=4, width=4){
  isEnded = false;
  moves = 0;
  document.getElementById("moves-output").innerHTML = `Moves: ${moves}`;
  var length = height * width;

  puzzle = [...Array(height)].map(_ => Array(width).fill(0));
  generateNumbers(puzzle, height, width, true);

  for (var i = 0; i < height; i++){
    for (var j = 0; j < width; j++){
      let element = document.getElementById(`${i}x${j}`);
      if (puzzle[i][j] !== 0)
        element.innerHTML = puzzle[i][j];
    }
  }
  document.documentElement.onkeydown = moveBoard;
}

function moveBoard(e){
  if (!sizeCheck()) return;
  if (isEnded) return;

  if (e.keyCode)
    var code = e.keyCode;
  else if (e.which)
    var code = e.which;

  var direction;

  function merge(array) {
    if (direction === "left" || direction === "down") {
      for (var i = 0; i < array.length-1; i++) {
        if (array[i] !== 0 && array[i] === array[i+1]) {
          array[i] *= 2;
          array[i+1] = 0;
        }
      }
    }
    else {
      for (var j = array.length; j > 0; j--) {
        if (array[j] !== 0 && array[j] === array[j-1]) {
          array[j] *= 2;
          array[j-1] = 0;
        }
      }
    }
    return array.filter(value => value > 0);
  }

  function padZeroes(array) {
    while (array.length < height) {
      if (direction === "left" || direction === "up") {
        array.push(0);
      } else {
        array.unshift(0);
      }
    }
    return array;
  }

  const arrayColumn = (arr, n) => arr.map(x => x[n]);

  if ((code == 37 || code == 65)){     // Left
    direction = "left"
  }
  else if (code == 39 || code == 68){     // Right
    direction = "right"
  }
  else if (code == 38 || code == 87){ // Up
    direction = "up"
  }
  else if (code == 40 || code == 83){  // Down
    direction = "down"
  }

  for (var i = 0; i < puzzle.length; i++) {
    var row = puzzle[i];
    if (direction == "left" || direction == "right"){
      puzzle[i] = padZeroes(merge(row.filter(x => x > 0)));
    }
    else if (direction == "up" || direction == "down"){
      var row = arrayColumn(puzzle, i)
      var col = padZeroes(merge(row.filter(x => x > 0)));

      for (var j = 0; j < puzzle.length; j++){
        puzzle[j][i] = col[j]
      }
    }
  }

  moves++;

  if (direction)
    generateNumbers(puzzle, height, width, false);

  for (var i = 0; i < height; i++){
    for (var j = 0; j < width; j++){
      let element = document.getElementById(`${i}x${j}`);
      if (puzzle[i][j] !== 0){
        element.innerHTML = puzzle[i][j];
      }
      else {
        element.innerHTML = "";
      }
    }
  }

  document.getElementById("moves-output").innerHTML = `Moves: ${moves}`;
}

function sizeCheck(){
  height = +document.getElementById("inputHeight").value;
  width = +document.getElementById("inputWidth").value;
  return height >= BOARD_MIN && height <= BOARD_MAX
          && width >= BOARD_MIN && width <= BOARD_MAX;
}

generatePuzzle(height, width);
