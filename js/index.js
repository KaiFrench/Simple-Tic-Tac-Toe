var count = 0;
var player = 1;
var board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

var canvas = document.getElementById("tic-tac-toe-board");
var context = canvas.getContext('2d');
var canvasSize = 500;
var sectionSize = canvasSize / 3;
canvas.width = canvasSize;
canvas.height = canvasSize;
context.translate(0.5, 0.5);
context.lineWidth = 10;

/* Event Func */
function main() {
  document.getElementById("main").style.display = "block";
  document.getElementById("learn").style.display = "none";
  document.getElementById("game").style.display = "none";
}

/* Event Func */
function start() {
  document.getElementById("main").style.display = "none";
  document.getElementById("learn").style.display = "none";
  document.getElementById("game").style.display = "block";

  canvas.addEventListener('mouseup', function (event) {
    addPlayingPiece(getCanvasMousePosition(event));
    drawBoard();
    setTimeout(() => {
      if(!checkWhoWin(1) && !checkWhoWin(2)){
        checkIsOver();
      }
    }, 100);
  });
  drawBoard();
}

/* Event Func */
function learn() {
  document.getElementById("main").style.display = "none";
  document.getElementById("learn").style.display = "block";
  document.getElementById("game").style.display = "none";
}

/* Event Func */
function exit() {
  window.close();
}

function addPlayingPiece(mouse) {
  var xCordinate;
  var yCordinate;
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      xCordinate = x * sectionSize;
      yCordinate = y * sectionSize;
      if (
        mouse.x >= xCordinate && mouse.x <= xCordinate + sectionSize &&
        mouse.y >= yCordinate && mouse.y <= yCordinate + sectionSize && board[y][x] == 0
      ) {
        board[y][x] = player;
        player = player == 1 ? 2 : 1;
        count++;
      }
    }
  }
}

function getCanvasMousePosition(event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

function clearPlayingArea(xCordinate, yCordinate) {
  context.fillStyle = "#fff";
  context.fillRect(
    xCordinate,
    yCordinate,
    sectionSize,
    sectionSize
  );
}

function drawO(xCordinate, yCordinate) {
  var halfSectionSize = (0.5 * sectionSize);
  var centerX = xCordinate + halfSectionSize;
  var centerY = yCordinate + halfSectionSize;
  var radius = (sectionSize - 100) / 2;
  var startAngle = 0 * Math.PI;
  var endAngle = 2 * Math.PI;
  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.stroke();
}

function drawX(xCordinate, yCordinate) {
  context.beginPath();
  var offset = 50;
  context.moveTo(xCordinate + offset, yCordinate + offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + sectionSize - offset);
  context.moveTo(xCordinate + offset, yCordinate + sectionSize - offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);
  context.stroke();
}

function drawBoard() {
  //Updating the Command
  if (player == 1) {
    document.querySelector("#textComd").textContent = "X to move";
  }

  if (player == 2) {
    document.querySelector("#textComd").textContent = "O to move";
  }

  var xCordinate;
  var yCordinate;
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      xCordinate = x * sectionSize;
      yCordinate = y * sectionSize;
      //Clearing First then Drawing 
      clearPlayingArea(xCordinate, yCordinate);
      if (board[y][x] === 1) {
        drawX(xCordinate, yCordinate);
      }
      else if (board[y][x] === 2) {
        {
          drawO(xCordinate, yCordinate);
        }
      }
    }
  }

  //DRAW LINES of Boards
  var lineStart = 4;
  var lineLenght = canvasSize - 5;
  context.beginPath();
  for (var y = 1; y <= 2; y++) {
    context.moveTo(lineStart, y * sectionSize);
    context.lineTo(lineLenght, y * sectionSize);
  }
  for (var x = 1; x <= 2; x++) {
    context.moveTo(x * sectionSize, lineStart);
    context.lineTo(x * sectionSize, lineLenght);
  }
  context.stroke();
}


function checkWhoWin(number) {
  //check win   number will be 1 or 2
  // 1 for player is ONE
  // 2 for player is TWO
  let isWin = false;
  for (let i = 0; i < 3; i++) {
    if ((board[i][0] === number && board[i][1] === number && board[i][2] === number) || (board[0][i] === number && board[1][i] === number && board[2][i] === number)) {
      isWin = true;
      if (number == 1) {
        alert("X Wins!"); 
      }
      else {
        alert("O Wins!");
      }
      window.location.reload();
    }
  }
  if ((board[0][0] === number && board[1][1] === number && board[2][2] === number) || (board[0][2] === number && board[1][1] === number && board[2][0] === number)) {
    isWin = true;
    if (number == 1) {
      alert("X Wins!"); 
    }
    else {
      alert("O Wins!");
    }
    window.location.reload();
  }
  return isWin;
}

function checkIsOver() {
  //IF BOTH ARE NOT WIN AND NO NEXT MOVE
  if (count >= 9) {
    alert("It's A Draw!");
    window.location.reload();
  }
}

window.onload = main(); //CALL ON LOAD