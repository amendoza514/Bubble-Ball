class Target {
  constructor(position, offset, x, y) {
    this.position = position;
    this.offset = offset;
    this.x = x;
    this.y = 20;
    this.radius = 20;
    this.color = this.randomColor();
    this.move = this.move.bind(this);
    this.count = 0;
    this.currentY = this.y + (35 * this.count);
    this.hit = false;
    this.grip = true;
    this.drop  = false;
    // this.gameOver = this.gameOver.bind(this)
  }

  // if (this.position === 1 && !this.offset) {
  //     this.x = 20
  //   } else if (this.position === 1) {
  //     this.x = 40
  //   } else {
  //     this.x = this.position * 40;
  //   }

  move() {
      this.y += 35; 
  }

  randomColor() {
    let colors = ["red", "green", "blue", "orange", "gray"];
    // console.log(colors[Math.floor(Math.random() * colors.length)]);
    return colors[Math.floor(Math.random() * colors.length)];
  }

//   gameOver() {
//       if (this.y + this.radius > 540) {
//         return true
//       }
//   }

  draw(context) {
    // this.gameOver()
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();

    // this.update();
  }
}

module.exports = Target;
