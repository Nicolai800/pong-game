// JS from the DOM
const startText = document.getElementById("startText");
const paddle1 = document.getElementById("paddle1");

// Game Variables
let gameRunning = false;
let keyPressed = {};
let paddle1Speed = 0;
let paddle2Speed = 0;
let paddle1Y = 150;

// Game const
const paddleAcceleration = 1;
const maxPaddleSpeed = 5;

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
    setTimeout(gameLoop, 8);
  }
}

function handleKeyDown(e) {
  keyPressed[e.key] = true;
  console.log(keyPressed);
}
function handleKeyUp(e) {
  keyPressed[e.key] = false;
}

function updatePaddle1() {
  if (keyPressed["w"]) {
    paddle1Speed = Math.max(paddle1Speed - paddleAcceleration, -maxPaddleSpeed);
  }

  paddle1Y += paddle1Speed;
  paddle1.style.top = paddle1Y + "px";
}
