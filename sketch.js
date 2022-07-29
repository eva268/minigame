let blocks = [];
let gridCol = 10;
let gridRow = 10;
let gridTotal = gridCol * gridRow;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < gridTotal; i++) {
    blocks.push(new block(i));
  }
}

function popBlock(idx) {
  blocks[idx].poped = true;
  
  //left
  if (idx % gridCol > 0) {
    if (blocks[idx - 1].poped == false) {
      if (blocks[idx].color == blocks[idx - 1].color){
        popBlock(idx - 1);
      }
    }
  }
  
  //right
  if (idx % gridCol != gridCol - 1) {
    if (blocks[idx + 1].poped == false) {
      if (blocks[idx].color == blocks[idx + 1].color){
        popBlock(idx + 1);
      }
    }
  }
  
  //up
  if (idx - gridCol >= 0) {
    if (blocks[idx - gridCol].poped == false) {
      if (blocks[idx].color == blocks[idx - gridCol].color){
        popBlock(idx - gridCol);
      }
    }
  }


  //down
  if (idx + gridCol < blocks.length) {
    if (blocks[idx + gridCol].poped == false) {
      if (blocks[idx].color == blocks[idx + gridCol].color){
        popBlock(idx + gridCol);
      }
    }
  }
  
  blocks[idx]  = 0;
}

function mouseClicked() {
  for (let i = 0; i < gridTotal; i++) {
    if (blocks[i] != 0) {
      let idx = blocks[i].clicked();
      if (idx != -1){
        popBlock(idx);
      }
    }
  }
}

function checkGameClear(){
  let cnt = 0;
  for(let i = 0; i< gridTotal; i++){
    if (blocks[i] == 0) cnt++;
  }
  if(cnt == gridTotal){
    fill(0);
    textAlign(CENTER);
    textSize(80);
    text("Clear!", width/2, height/2, );
  }
}

function draw() {
  background(220);
  for (let i = 0; i < gridTotal; i++) {
    if (blocks[i] != 0) blocks[i].fall();
    if (blocks[i] != 0) blocks[i].display(); 
  }
  checkGameClear();
}
