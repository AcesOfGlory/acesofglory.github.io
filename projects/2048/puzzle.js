var moves = 0,
    height = 4, width = 4,
    multiplier = 2,
    continueGame = false,
    score = 0,
    highscore,
    currentObj,
    puzzle,
    isEnded,
    COLOURS = {};

if (typeof(Storage) !== "undefined") {
  highscore = localStorage.highscore ? +localStorage.highscore : 0;
}
else{
  highscore = 0;
}

const SIZE_MAX = 150,
      SIZE_MIN = 10,
      BOARD_MAX = 100,
      BOARD_MIN = 2,
      FIRST_GEN = 0.8;


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
  generatePuzzle();
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

function endGame(won=false){
  if (won){
    if (confirm("You won! Do you want to continue?"))
      continueGame = true;
    else
      isEnded = true;
  }
  else {
    if (confirm("You lost. Try again?"))
      generateBoard();
    else
      isEnded = true;
  }
}

function generateNumbers(puzzle){
  const randomNumber = _ => Math.random() < FIRST_GEN ? multiplier : multiplier * multiplier;

  var row1 = Math.floor(Math.random() * height),
      col1 = Math.floor(Math.random() * width);

  while (puzzle[row1][col1] != 0){
    row1 = Math.floor(Math.random() * height);
    col1 = Math.floor(Math.random() * width);
  }
  puzzle[row1][col1] = randomNumber();
}

function generatePuzzle(){
  document.addEventListener("keydown", null, false);
  if (!checkMultiplier()) return false;

  COLOURS = {};
  isEnded = false;
  moves = 0;
  score = 0;
  document.getElementById("moves-output").innerHTML = `Moves: ${moves}`;
  document.getElementById("score-output").innerHTML = `Score: ${score}`;
  document.getElementById("highscore-output").innerHTML = `Highscore: ${highscore}`;

  var length = height * width;
  puzzle = [...Array(height)].map(_ => Array(width).fill(0));
  generateNumbers(puzzle);
  generateNumbers(puzzle);

  for (var i = 0; i < height; i++){
    for (var j = 0; j < width; j++){
      let element = document.getElementById(`${i}x${j}`);
      if (puzzle[i][j] !== 0){
        element.innerHTML = puzzle[i][j];
        element.style.backgroundColor = randomColour(puzzle[i][j]);
      }
    }
  }
  document.addEventListener("keydown", moveBoard, false);

  $(function() {
    $("#puzzleBoardDiv").swipe( {
      swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        alert("You swiped " + direction);
        moveBoard(null, direction);
      }
    });
  })
}

function randomColour(square){
  var getLog = Math.floor(Math.log(square) / Math.log(multiplier));
  if (!COLOURS[getLog])
    COLOURS[getLog] = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);

  return COLOURS[getLog];
}

function moveBoard(e=null, dir=null){
  if (!sizeCheck()) return;
  if (isEnded) return;

  var direction,
      code,
      previousMove = [...puzzle].toString();

  if (e.keyCode)
    code = e.keyCode;
  else if (e.which)
    code = e.which;

  function isEmpty(array) {
    var empty = true;
    array.forEach(function(value) {
      if(value > 0) empty = false;
    });
    return empty;
  }

  function merge(array) {
    if (direction === "down" || direction === "left") {
      for (var i = 0; i < array.length-1; i++) {
        if (array[i] !== 0 && array[i] === array[i+1]) {
          array[i] *= multiplier;
          score += array[i];
          array[i+1] = 0;
        }
      }
    }
    else {
      for (var j = array.length; j > 0; j--) {
        if (array[j] !== 0 && array[j] === array[j-1]) {
          array[j] *= multiplier;
          score += array[j];
          array[j-1] = 0;
        }
      }
    }
    return array.filter(value => value > 0);
  }

  function padZeroes(array) {
    while (array.length < height) {
      if (direction === "up" || direction === "left") {
        array.push(0);
      } else {
        array.unshift(0);
      }
    }
    return array;
  }

  const arrayColumn = (arr, n) => arr.map(x => x[n]);

  if (code == 37 || code == 65 || dir == "left"){     // Left
    direction = "left";
  }
  else if (code == 39 || code == 68 || dir == "right"){     // Right
    direction = "right";
  }
  else if (code == 38 || code == 87 || dir == "up"){ // Up
    direction = "up";
  }
  else if (code == 40 || code == 83 || dir == "down"){  // Down
    direction = "down";
  }

  for (var i = 0; i < height; i++) {
    var row = puzzle[i];
    if (direction == "left" || direction == "right"){
      if (!isEmpty(row))
        puzzle[i] = padZeroes(merge(row.filter(x => x > 0)));
    }
    else if (direction == "up" || direction == "down"){
      var row = arrayColumn(puzzle, i);
      if (!isEmpty(row)){
        var col = padZeroes(merge(row.filter(x => x > 0)));
        for (var j = 0; j < height; j++){
          puzzle[j][i] = col[j];
        }
      }
    }
  }

  if (!squaresEmpty())
    return endGame(false);

  if (direction && previousMove !== puzzle.toString()){
    generateNumbers(puzzle);
    document.getElementById("moves-output").innerHTML = `Moves: ${++moves}`;
    document.getElementById("score-output").innerHTML = `Score: ${score}`;

    if (score > highscore){
      highscore = score;
      localStorage.highscore = highscore;
      document.getElementById("highscore-output").innerHTML = `Highscore: ${highscore}`;
    }
  }

  for (var i = 0; i < height; i++){
    for (var j = 0; j < width; j++){
      let element = document.getElementById(`${i}x${j}`);
      if (puzzle[i][j] !== 0){
        element.innerHTML = puzzle[i][j];
        element.style.backgroundColor = randomColour(puzzle[i][j]);
      }
      else {
        element.innerHTML = "";
        element.style.backgroundColor = "";
      }
    }
  }

  setTimeout(function() {
    return checkIfWon();
  }, 0);
}

function checkIfWon(){
  puzzle.forEach(row => {
    if (row.indexOf(Math.pow(multiplier, 11)) !== -1) {
      if (!continueGame)
        return endGame(true);
    }
  });
}

function sizeCheck(){
  let h = +document.getElementById("inputHeight").value;
  let w = h;
  if (h >= BOARD_MIN && h <= BOARD_MAX){
    height = h;
    width = h;
    return true;
  }
  return false;
}

function checkMultiplier(){
  let m = +document.getElementById("multiplierInput").value;
  if (m <= 100 && m >= 2){
    multiplier = m;
    return true;
  }
  return false;
}

window.onload = generatePuzzle;
