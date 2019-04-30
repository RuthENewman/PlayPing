let canvas;
let context;
let ballX = 50;
let ballY = 300;
let ballXSpeed = 15;
let ballYSpeed = 8;
let paddle1Y = 210;
const PADDLE_HEIGHT = 150;

const calculateMousePosition = event => {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = event.clientX - rect.left - root.scrollLeft;
  let mouseY = event.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  }
}

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
  ballY += ballYSpeed;
  if(ballX >= canvas.width - 40) {
    ballXSpeed = -ballXSpeed;
  }
  if(ballX < 40) {
    ballXSpeed = ballXSpeed * -1;
  }
  if(ballY >= canvas.height - 20) {
    ballYSpeed = -ballYSpeed;
  }
  if(ballY < 20) {
    ballYSpeed = ballYSpeed * -1;
  }
}

function drawGame() {
  //lawn
  colourRect(0, 0, canvas.width, canvas.height, 'springgreen')
  //first racket paddle
  colourRect(0,210,15,150,'white');
  // second racket paddle
  colourRect(canvas.width-15, 210,15,150, 'white');
  // ball
  colourCircle(ballX, ballY, 10, 'yellow');
  // ball outline
  strokeCircle(ballX, ballY, 10, 'black');

}

function colourRect(leftX, topY, width, height, colour) {
  context.fillStyle = colour;
  context.fillRect(leftX,topY,width, height);
}

function colourCircle(centreX, centreY, radius, colour) {
  context.fillStyle = colour;
  context.beginPath();
  context.arc(centreX, centreY, radius, 20, Math.PI * 2, true);
  context.fill();
}

function colourStroke(leftX, topY, width, height, colour) {
  context.strokeStyle = colour;
  context.beginPath();
  context.arc(leftX, topY, width, height, colour);
  context.stroke();
}

function strokeCircle(centreX, centreY, radius, colour) {
  context.fillStyle = colour;
  context.beginPath();
  context.arc(centreX, centreY, radius, 0, Math.PI * 2, true);
  context.stroke();
}
