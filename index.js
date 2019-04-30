let canvas;
let context;
let ballX = 50;
let ballY = 300;
let ballXSpeed = 15;
let ballYSpeed = 8;
let paddle1Y = 210;
let paddle2Y = 210;
let paddleHeight = 150;
const PADDLE_WIDTH = 15;
let paddle2Height = 150;
const WINNING_SCORE = 10;
let winningScreen = false;
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

const handleMouseClick = event => {
  if(winningScreen) {
    winningScreen = false;
    player1Score = 0;
    player2Score = 0;
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
  canvas.addEventListener('mousedown', handleMouseClick);
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
  if(player1Score >= WINNING_SCORE ||
		player2Score >= WINNING_SCORE) {
		winningScreen = true;
	}

	ballXSpeed = -ballXSpeed;
	ballX = canvas.width/2;
	ballY = canvas.height/2;
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
  if(winningScreen) {
    return;
  }
  computerPlays();

  ballX += ballXSpeed;
  ballY += ballYSpeed;

  if(ballX < 40) {
    if(ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
      ballXSpeed = ballXSpeed * -1;
      let deltaY = ballY - (paddle1Y + paddleHeight / 2);
      ballSpeedY = deltaY * 0.35;
    }
  }
  if(ballX < PADDLE_WIDTH) {
    player2Score++;
    ballReset();
  }

  if(ballX > canvas.width - 40) {
    if(ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
    ballXSpeed = -ballXSpeed;
    let deltaY = ballY - (paddle1Y + paddleHeight / 2);
    ballSpeedY = deltaY * 0.35;
   }
  }
  if(ballX > canvas.width - PADDLE_WIDTH) {
    player1Score++;
    ballReset();
  }

  if(ballY >= canvas.height - 20) {
    ballYSpeed = -ballYSpeed;
  }
  if(ballY < PADDLE_WIDTH) {
    ballYSpeed = ballYSpeed * -1;
  }
}

function drawNet() {
  for(let i = 0; i < canvas.height; i += 40) {
    colourRect((canvas.width/2) - 1, i, 2, 20, 'white')
  }
}

function drawGame() {
  //lawn
  colourRect(0, 0, canvas.width, canvas.height, 'springgreen');

	if(winningScreen) {
		context.fillStyle = 'white';
    context.font = '40px Arial';
		if(player1Score >= WINNING_SCORE) {
			context.fillText("You won!", 350, 200);
		} else if(player2Score >= WINNING_SCORE) {
			context.fillText("You lost.", 350, 200);
		}

		context.fillText("Play again?", 350, 400);
		return;
	}

  drawNet();
  //first racket paddle
  colourRect(0,paddle1Y,PADDLE_WIDTH,paddleHeight,'white');
  // second racket paddle
  colourRect(canvas.width-PADDLE_WIDTH, paddle2Y,PADDLE_WIDTH,paddle2Height, 'white');
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
