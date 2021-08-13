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
}


addEventListener("load",main)