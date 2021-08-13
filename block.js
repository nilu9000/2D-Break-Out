const BLOCK_WIDTH = 100;
const BLOCK_HEIGHT = 20;


// block-class
export class Block {
  constructor(xPoint, yPoint, score) {
    this.bottomLeft = [ xPoint, yPoint]
    this.bottomRight = [ xPoint+BLOCK_WIDTH, yPoint]
    this.topLeft = [ xPoint, yPoint+BLOCK_HEIGHT]
    this.topRight = [ xPoint+BLOCK_WIDTH, yPoint+BLOCK_HEIGHT]
    this.score=score
  }

static get width() {
  return BLOCK_WIDTH
}

static get height() {
  return BLOCK_HEIGHT
}

}