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

let blockCollision = false;
let userCollision = false;

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
        drawUser()
      }
      break;
    case "ArrowRight":
      if (userPosition[0] < BOARD_WIDTH - Block.width) {
        userPosition[0] += 10
        drawUser()
      }

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
  checkUserCollision()
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
      y_ball < y_block + Block.height &&
      ballDirectionY > 0 &&
      !blockCollision
    ) {
      score  = score + block.score
      gameMessage.innerText = "Score: " + score
      let allBlocks = Array.from(document.querySelectorAll(".block"))
      allBlocks[index].classList.remove("block")
      blocks.splice(index, 1)

      changeDirection(1, -1 )
      blockCollision = true;
      userCollision = false
    }
  })

  if (blocks.length === 0) {
    youWin()
  }
}

function checkUserCollision() {
  if (ballPosition[1] <= userStartPosition[1] + USER_HEIGHT &&
    ballPosition[0] > userPosition[0] &&
    ballPosition[0] < userPosition[0] + USER_WIDTH &&
    ballDirectionY < 0 &&
    !userCollision
    ) {
    changeDirection(1, -1)
    userCollision = true;
    blockCollision = false;
  }
}


function changeDirection(changeX, changeY) {
  ballDirectionX *= changeX
  ballDirectionY *= changeY
}

function checkWallCollision() {
    // Kollar n??r bollen studsar p?? v??nster v??gg
    if (ballPosition[0] < 0) {
      changeDirection(-1, 1)
    }

  // Kollar n??r bollen studsar p?? h??ger v??gg
  if (ballPosition[0] >= BOARD_WIDTH - BALL_SIZE) {
    changeDirection(-1, 1)
  }

  // Kollar n??r bollen studsar p?? taket
  if (ballPosition[1] >= BOARD_HEIGHT - BALL_SIZE) {
    changeDirection(1, -1)
    blockCollision = false;
    userCollision = false;
  }
  // Kollar n??r bollen studsar p?? golvet
  if (ballPosition[1] < 0) {
    gameOver()
  }
}

function gameOver() {
  resetGame()
  gameMessage.innerText = "Game Over - Your Score Is " + score
}

function youWin() {
  resetGame()
  gameMessage.innerText = "All Cleared!! - Your Score Is " + score
}

function  resetGame() {
  clearInterval(gameTimer)
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
