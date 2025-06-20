let blockColors = ["red", "blue", "green"];

class block {
  constructor(i, j) {
    this.col = i;
    this.row = j;

    this.width = width / col;
    this.height = height / row;

    this.x = this.width * this.col;
    this.y = height - this.height * (this.row + 1);

    this.targetX = this.x;
    this.targetY = this.y;
    this.isMoving = false;

    this.poped = false;
    this.color = blockColors[int(random(0, blockColors.length))];
  }

  posUpdate() {
    this.targetX = this.width * this.col;
    this.targetY = height - this.height * (this.row + 1);
    if (abs(this.targetX - this.x) > 0.1 || abs(this.targetY - this.y) > 0.1) {
      this.isMoving = true;
    }
  }

  resize() {
    this.width = width / col;
    this.height = height / row;
    this.x = this.width * this.col;
    this.y = this.height * this.row;
  }

  clicked() {
    if (
      this.x < mouseX &&
      mouseX < this.x + this.width &&
      this.y < mouseY &&
      mouseY < this.y + this.height
    ) {
      this.pop();
    }
  }

  pop(cnt = 0) {
    this.poped = true;
    let blk;

    blk = this.getBlock('L');
    if (blk != undefined) {
      if (this.color == blk.color) {
        if (blk.poped == false) blk.pop();
      } else cnt++;
    } else cnt++;

    blk = this.getBlock('R');
    if (blk != undefined) {
      if (this.color == blk.color) {
        if (blk.poped == false) blk.pop();
      } else cnt++;
    } else cnt++;

    blk = this.getBlock('U');
    if (blk != undefined) {
      if (this.color == blk.color) {
        if (blk.poped == false) blk.pop();
      } else cnt++;
    } else cnt++;

    blk = this.getBlock('D');
    if (blk != undefined) {
      if (this.color == blk.color) {
        if (blk.poped == false) blk.pop();
      } else cnt++;
    } else cnt++;

    if (cnt == 4) this.poped = false;
    else blocks[this.col][this.row] = undefined;

  }

  getBlock(direction) {
    let blk;
    switch (direction) {
      case 'L':
        blk = blocks[this.col - 1];
        if (blk != undefined) blk = blocks[this.col - 1][this.row];
        break;
      case 'R':
        blk = blocks[this.col + 1];
        if (blk != undefined) blk = blocks[this.col + 1][this.row];
        break;
      case 'U':
        blk = blocks[this.col];
        if (blk != undefined) blk = blocks[this.col][this.row + 1];
        break;
      case 'D':
        blk = blocks[this.col];
        if (blk != undefined) blk = blocks[this.col][this.row - 1];
        break;
    }

    if (blk != undefined) return blk;
  }

  update() {
    if (this.isMoving) {
      this.x = lerp(this.x, this.targetX, 0.25);
      this.y = lerp(this.y, this.targetY, 0.25);
      if (abs(this.x - this.targetX) < 0.5 && abs(this.y - this.targetY) < 0.5) {
        this.x = this.targetX;
        this.y = this.targetY;
        this.isMoving = false;
      }
    }
  }

  display() {
    if (this.poped == false) {
      fill(this.color);
      rect(this.x, this.y, this.width, this.height, 7);

      // fill(0);
      // text(`${this.col}, ${this.row}`, this.x+this.width/4, this.y + this.height/2);
    }
  }
}
