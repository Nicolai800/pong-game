// JS from the DOM
const startText = document.getElementById("startText");
const paddle1 = document.getElementById("paddle1");
const paddle2 = document.getElementById("paddle2");
const ball = document.getElementById("ball");

// Game Variables
let gameRunning = false;
let keyPressed = {};
let paddle1Speed = 0;
let paddle2Speed = 0;
let paddle1Y = 150;
let paddle2Y = 150;

// Game const
const paddleAcceleration = 1;
const paddleDeceleration = 1;
const maxPaddleSpeed = 5;
const gameHeigth = 400;
const gameWidth = 600;
let ballX = 290;
let ballSpeedX = 2;
let ballY = 290;
let ballSpeedY = 2;

document.addEventListener("keydown", startGame);
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

// Strat Game
function startGame() {
  gameRunning = true;
  startText.style.display = "none";
  document.removeEventListener("keydown", startGame);
  gameLoop();
}

function gameLoop() {
  if (gameRunning) {
    updatePaddle1();
    updatePaddle2();
    moveBall();
    setTimeout(gameLoop, 8);
  }
}

function handleKeyDown(e) {
  keyPressed[e.key] = true;
}
function handleKeyUp(e) {
  keyPressed[e.key] = false;
}

function updatePaddle1() {
  if (keyPressed["w"]) {
    paddle1Speed = Math.max(paddle1Speed - paddleAcceleration, -maxPaddleSpeed);
  } else if (keyPressed["s"]) {
    paddle1Speed = Math.min(paddle1Speed + paddleAcceleration, maxPaddleSpeed);
  } else if (paddle1Speed > 0) {
    paddle1Speed = Math.max(paddle1Speed - paddleDeceleration, 0);
  } else if (paddle1Speed < 0) {
    paddle1Speed = Math.min(paddle1Speed + paddleDeceleration, 0);
  }

  paddle1Y += paddle1Speed;

  if (paddle1Y < 0) {
    paddle1Y = 0;
  }
  if (paddle1Y > gameHeigth - paddle1.clientHeight) {
    paddle1Y = gameHeigth - paddle1.clientHeight;
  }
  paddle1.style.top = paddle1Y + "px";
}

function updatePaddle2() {
  if (keyPressed["ArrowUp"]) {
    paddle2Speed = Math.max(paddle2Speed - paddleAcceleration, -maxPaddleSpeed);
  } else if (keyPressed["ArrowDown"]) {
    paddle2Speed = Math.min(paddle2Speed + paddleAcceleration, maxPaddleSpeed);
  } else if (paddle2Speed > 0) {
    paddle2Speed = Math.max(paddle2Speed - paddleDeceleration, 0);
  } else if (paddle2Speed < 0) {
    paddle2Speed = Math.min(paddle2Speed + paddleDeceleration, 0);
  }

  paddle2Y += paddle2Speed;

  if (paddle2Y < 0) {
    paddle2Y = 0;
  }
  if (paddle2Y > gameHeigth - paddle2.clientHeight) {
    paddle2Y = gameHeigth - paddle2.clientHeight;
  }
  paddle2.style.top = paddle2Y + "px";
}

function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY >= gameHeigth - ball.clientHeight || ballY <= 0) {
    ballSpeedY = -ballSpeedY;
  }
  if (
    ballX >= gameWidth - paddle2.clientWidth - ball.clientWidth &&
    ballY >= paddle2Y &&
    ballY <= paddle2Y + paddle2.clientHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }
  if (
    ballX <= paddle1.clientWidth &&
    ballY >= paddle1Y &&
    ballY <= paddle1Y + paddle1.clientHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
}

console.log(paddle2.clientWidth);
