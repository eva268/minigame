let blocks = [];
let col = 10;
let row = 10;
let total = col * row;

function setup() {
  canvasSize = 8 * min(windowWidth, windowHeight) / 10;

  createCanvas(canvasSize, canvasSize);
  noLoop();
  for (let i = 0; i < col; i++) {
    blocks.push([]);
    for (let j = 0; j < row; j++) {
      blocks[i].push(new block(i, j));
    }
  }
}

function draw() {
  background(220);
  for (let col of blocks) for (let blk of col) blk.display();
  checkGameClear();
}

function idxUpdate() {
  for (let i = 0; i < blocks.length; i++) {
    for (let j = 0; j < blocks[i].length; j++) {
      blocks[i][j].col = i;
      blocks[i][j].row = j;
    }
  }
}
function fall() {
  for (let i = 0; i < blocks.length; i++) {
    blocks[i] = blocks[i].filter( function (x){ return x != undefined});
  }
  idxUpdate();
}

function shiftLeft() {
  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i].length == 0) blocks.splice(i, 1);
  }
  idxUpdate();
  for (let col of blocks) for (let blk of col) blk.posUpdate();
}

function mouseClicked() {
  let bWidth = width / col;
  let bHeight = height / row;
  let bCol = int(mouseX / bWidth);
  let bRow = row - int(mouseY / bHeight) - 1;
  if (bCol < 0 || bCol >= blocks.length) return;
  if (bRow < 0 || bRow >= blocks[bCol].length) return;

  blocks[bCol][bRow].clicked();
  fall();
  shiftLeft();
  redraw();
}

function windowResized() {
  // resizeCanvas(windowWidth, windowHeight);
  // for (let i = 0; i < col; i++) for (let j = 0; j < row; j++) blocks[i][j].resize();
  // redraw();
}

function checkGameClear() {
  for(let i = 0; i < blocks.length; i++) if (blocks[i].length != 0) return;
  fill(0);
  textAlign(CENTER);
  textSize(80);
  text("Clear!", width / 2, height / 2,);
  
}

