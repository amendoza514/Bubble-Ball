class Projectile {
  constructor(props) {
    this.aimX = props.aimX;
    this.aimY = props.aimY;
    this.dx = props.slope[0];
    this.dy = props.slope[1];
    this.radius = 20;
    this.slope = props.slope;
    this.game = props.game;
  }

  move() {
    if (this.aimX + this.radius > 320 || this.aimX - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.aimY - this.radius < 0) {
      this.dy = -this.dy;
    } 
    // if (this.aimY + this.radius > 500) {
        // this.destroy();
        // console.log('FIX THIS')
    // }
    this.aimX += this.dx;
    this.aimY += this.dy;
    this.position = [this.aimX, this.aimY];
  
  }

//   destroy() {
//     this.game.remove(this)
//     console.log('gone?')
//   }

  draw(context) {
    context.beginPath();
    context.arc(
      this.aimX,
      this.aimY,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    context.fillStyle = "black";
    context.fill();
    context.closePath();

    this.move();
  }


}

module.exports = Projectile;