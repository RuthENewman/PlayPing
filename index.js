let canvas;
let context;
let ballX = 50;
let ballY = 300;
let ballXSpeed = 15;
let ballYSpeed = 8;
let paddle1Y = 210;
let paddle2Y = 210;
let paddleHeight = 150;
let paddleWidth = 15;
let paddle2Height = 150;
let player1Score = 0;
let player2Score = 0;

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
  let easyLevelButton = document.querySelector('.easyLevel');
  let intermediateLevelButton = document.querySelector('.intermediateLevel');
  let difficultLevelButton = document.querySelector('.difficultLevel');
  let framesPerSecond = 24;
  setInterval(function() {
    move();
    drawGame();
  },1000/framesPerSecond);
  canvas.addEventListener('mousemove', event => {
    let mousePosition = calculateMousePosition(event);
    paddle1Y = mousePosition.y - (paddleHeight / 2);
  })
  easyLevelButton.addEventListener('click', event => {
      paddleHeight = 200;
      paddle2Height = 50;
      ballXSpeed = 10;
    })
    intermediateLevelButton.addEventListener('click', event => {
      paddleHeight = 150;
      paddle2Height = 120;
      ballXSpeed = 15;
    })
    difficultLevelButton.addEventListener('click', event => {
      paddleHeight = 100;
      paddle2Height = 100;
      ballXSpeed = 20;
    })
}

function ballReset() {
  ballXSpeed = -ballXSpeed;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function computerPlays() {
  let paddle2YCentre = paddle2Y + (paddle2Height / 2);
  if(paddle2YCentre < ballY + 35) {
    paddle2Y += 5;
  } else if (paddle2YCentre > ballY + 35) {
    paddle2Y -= 5;
  }
}

function move() {
  computerPlays();

  ballX += ballXSpeed;
  ballY += ballYSpeed;

  if(ballX < 40) {
    if(ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
      ballXSpeed = ballXSpeed * -1;
    }
  }
  if(ballX < paddleWidth) {
    ballReset();
    player2Score++;
  }

  if(ballX >= canvas.width - 40) {
    if(ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
    ballXSpeed = -ballXSpeed;
   }
  }
  if(ballX > canvas.width - paddleWidth) {
    ballReset();
    player1Score++;
  }

  if(ballY >= canvas.height - 20) {
    ballYSpeed = -ballYSpeed;
  }
  if(ballY < paddleWidth) {
    ballYSpeed = ballYSpeed * -1;
  }
}

function drawGame() {
  //lawn
  colourRect(0, 0, canvas.width, canvas.height, 'springgreen')
  //first racket paddle
  colourRect(0,paddle1Y,paddleWidth,paddleHeight,'white');
  // second racket paddle
  colourRect(canvas.width-paddleWidth, paddle2Y,paddleWidth,paddle2Height, 'white');
  // ball
  colourCircle(ballX, ballY, 10, 'yellow');
  // ball outline
  strokeCircle(ballX, ballY, 10, 'black');
  context.fillStyle = 'white';
  context.font = '40px Arial';
  context.fillText(player1Score, 150, 100);
  context.fillText(player2Score, 650, 100);
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
