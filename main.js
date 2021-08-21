import { Block } from "./block.js";

let grid;
const BOARD_WIDTH = 560;
const BOARD_HEIGHT = 300;
let gameMessage;
let blocks = [];

let user;
const userStartPosition = [230, 10];
let userPosition = userStartPosition;
const USER_WIDTH = 100;
const USER_HEIGHT = 20;

let ball;
const BALL_SIZE = 20;
const ballStartPosition = [265, 150];
let ballPosition = ballStartPosition;
let plusOrMinus = Math.random() < 0.5 ? -1 : 1;

let ballDirectionX = 2 * plusOrMinus;
let ballDirectionY = 2;
let gameTimer;

let score = 0;

function getHandles() {
  grid = document.querySelector(".grid")
  gameMessage = document.querySelector(".game-message")
}

function createUser() {
  user = document.createElement("div")
  user.classList.add("user")
  drawUser()

  grid.appendChild(user)
}

function drawUser() {
  user.style.left = userPosition[0] + "px"
  user.style.bottom = userPosition[1] + "px"
}

function addlisteners() {
  document.addEventListener("keydown", (event) => moveUser(event))
}

function moveUser(event) {
  switch (event.key) {
    case "ArrowLeft":
      if (userPosition[0] > 0) {
        userPosition[0] -= 10
      }
      drawUser()
      break;
    case "ArrowRight":
      if (userPosition[0] < BOARD_WIDTH - Block.width) {
        userPosition[0] += 10
      }

      drawUser()
      break;
    
    default:
      break;
  }
}

function drawBall() {
  ball.style.left = ballPosition[0] + "px"
  ball.style.bottom = ballPosition[1] + "px"
}


function createBall() {
  ball = document.createElement("div")
  ball.classList.add("ball")
  drawBall()
  grid.appendChild(ball)
}

function moveBall() {
  ballPosition[0] += ballDirectionX
  ballPosition[1] += ballDirectionY

  drawBall()
  checkWallCollision()
  checkBlockCollision()
  // checkUserCollision()
}

function checkBlockCollision() {
  blocks.forEach((block, index) => {
    let x_ball = ballPosition [0]
    let y_ball = ballPosition [1]
    let x_block = block.bottomLeft[0]
    let y_block = block.bottomLeft[1]

    if (
      x_ball + BALL_SIZE > x_block &&
      x_ball < x_block  + Block.width &&
      y_ball + BALL_SIZE > y_block &&
      y_ball < y_block + Block.height
    ) {
      
    }
  })
}

function changeDirection(changeX, changeY) {
  ballDirectionX *= changeX
  ballDirectionY *= changeY
}

function checkWallCollision() {
    // Kollar när bollen studsar på vänster vägg
    if (ballPosition[0] < 0) {
      changeDirection(-1, 1)
    }
  
  // Kollar när bollen studsar på höger vägg
  if (ballPosition[0] >= BOARD_WIDTH - BALL_SIZE) {
    changeDirection(-1, 1)
  }

  // Kollar när bollen studsar på taket
  if (ballPosition[1] >= BOARD_HEIGHT - BALL_SIZE) {
    changeDirection(1, -1)
  }
  // Kollar när bollen studsar på golvet
  if (ballPosition[1] < 0) {
    gameOver()
  }
}

function gameOver() {
  resetGame()
  gameMessage.innerText = "Game Over - Your Score Is " + score
}

function  resetGame() {
  clearInterval(moveBall)
  removeEventListener("keydown", (e) => moveUser(e))
}

function addBlock(block, index) {
  const b = document.createElement("div");
  b.classList.add("block");
  b.style.left = block.bottomLeft[0] + "px";
  b.style.bottom = block.bottomLeft[1] + "px";
  if (index % 3 === 0) {
    b.style.backgroundColor = "black";
  }
  if (index % 3 === 1) {
    b.style.backgroundColor = "red";
  }
  if (index % 3 === 2) {
    b.style.backgroundColor = "dark blue";
  }

  grid.appendChild(b)
}

function createBlocksStart() {
  let newBlock
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 3; y++) {
      let x_pos = x * 100 + 10 * (x + 1);
      let y_pos = 270 - y * 30;
      let score = (3 - y) * 10;
      newBlock = new Block(x_pos, y_pos, score);
      blocks.push(newBlock);
    }
  }
  blocks.forEach((block, index)=> {
    addBlock(block, index)
  })
}


function main() {
  removeEventListener("load",main)

  getHandles()
  addlisteners()
  createBlocksStart()
  createUser()
  createBall()

  gameTimer = setInterval(moveBall, 25)
}


addEventListener("load",main)