let canvas;
let context;
let ballX = 50;
let ballY = 200;
let ballXSpeed = 10;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  context = canvas.getContext('2d');
  let framesPerSecond = 24;
  setInterval(function() {
    move();
    drawGame();
  },1000/framesPerSecond);
}

function move() {
  ballX += ballXSpeed;
  if(ballX >= canvas.width - 20) {
    ballXSpeed = -ballXSpeed;
  }
  else if(ballX < 0) {
    ballXSpeed = ballXSpeed * -1;
  }
}

function drawGame() {
  context.fillStyle = 'springgreen';
  context.fillRect(0,0,canvas.width, canvas.height);
  context.fillStyle = 'white';
  context.fillRect(0,210,15,150);
  context.fillStyle = 'yellow';
  context.fillRect(ballX, 100, 20, 20);
  context.strokeStyle = 'black';
  context.strokeRect(ballX, 100, 20, 20);
}
