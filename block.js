let blockColors = ["red", "blue", "green"];

class block {
  constructor(idx) {
    this.idx = idx;
    this.color = blockColors[int(random(0, blockColors.length))];
    this.width = width / gridCol;
    this.height = height / gridRow;
    this.x = this.width * (this.idx % gridCol);
    this.y = this.height * int(this.idx / gridCol);
    this.poped = false;
  }

  clicked() {
    if (
      this.x < mouseX &&
      mouseX < this.x + this.width &&
      this.y < mouseY &&
      mouseY < this.y + this.height
    ) {
      return this.idx;
    } else return -1;
  }

  fall() {
    while (this.idx + gridCol < gridTotal && blocks[this.idx + gridCol] == 0) {
      let temp = this.idx;
      blocks[this.idx + gridCol] = blocks[this.idx];
      blocks[this.idx] = 0;
      this.idx = this.idx + gridCol;
      this.x = this.width * (this.idx % gridCol);
      this.y = this.height * int(this.idx / gridCol);
    }
    return;
  }

  display() {
    if (this.poped === false) {
      fill(this.color);
      rect(this.x, this.y, this.width, this.height, 7);
      // textSize(14);
      // fill(0,0,0);
      // text(`${this.idx}`, this.x+10, this.y+15);
      
    }
  }
}
