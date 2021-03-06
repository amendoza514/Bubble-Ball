const Projectile = require('./projectile');

class Turret {
  constructor(game) {
    this.game = game;
    this.projectiles = 0;
    this.setColors = this.setColors.bind(this);
    this.shots = [];
    this.color = this.shots[0];
    this.nextShot = this.shots[1];
    this.nextNextShot = this.shots[2];
  }

  setColors() {
    for (let i = 0; i < 3; i++) {
      this.shots.push(this.randomColor());
    }
  }
  randomColor() {
    let colors = ["purple", "green", "skyblue", "yellow", "red"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  swivelTurret(mousePosition) {
    this.dx = mousePosition[0] - 160;
    this.dy = 540 - mousePosition[1];
    let swivel = Math.atan2(this.dy, this.dx) + Math.PI;
    let hyp = Math.sqrt(this.dy ** 2 + this.dx ** 2);

    this.aimX = 160 - Math.cos(swivel) * 50;
    this.aimY = 540 + Math.sin(swivel) * 50;
    this.cheatX = 160 - Math.cos(swivel) * 550;
    this.cheatY = 540 + Math.sin(swivel) * 550;

    this.speedX = -Math.cos(swivel) * 12;
    this.speedY = Math.sin(swivel) * 12;
  }

  fire() {
    if (this.game.reloaded === true) {
      let projectile = new Projectile({
        game: this.game,
        slope: [this.speedX, this.speedY],
        aimX: this.aimX,
        aimY: this.aimY,
        color: this.shots[0],
      });
      this.projectiles += 1;
      this.game.reloaded = false;
      this.game.addProjectiles(projectile);
      this.shots.shift();
      this.shots.push(this.randomColor());
    }
  }

  draw(context) {
    //next shot
    context.beginPath();
    context.arc(210, 520, 5, 0, Math.PI * 2, false);
    context.fillStyle = this.shots[1];
    context.fill();
    context.beginPath();
    context.arc(210, 520, 5, 0, Math.PI * 2, false);
    context.strokeStyle = "black";
    context.setLineDash([0, 0]);
    context.lineWidth = 2;
    context.fill();
    context.stroke();

    // next next shot
    context.beginPath();
    context.arc(217, 533, 5, 0, Math.PI * 2, false);
    context.fillStyle = this.shots[2];
    context.fill();
    context.beginPath();
    context.arc(217, 533, 5, 0, Math.PI * 2, false);
    context.strokeStyle = "black";
    context.setLineDash([0, 0]);
    context.lineWidth = 2;
    context.stroke();

    //turret line
    if (this.game.playerSelected === 2) {
      context.beginPath();
      context.moveTo(160, 540);
      context.lineTo(this.cheatX, this.cheatY);
      context.setLineDash([5, 5]);
      context.strokeStyle = "white";
      context.lineWidth = 1;
      context.stroke();
    }

    //turret cannon
    context.beginPath();
    context.moveTo(160, 540);
    context.lineTo(this.aimX, this.aimY);
    // context.strokeStyle = this.shots[0];
    context.strokeStyle = "white";
    context.setLineDash([0, 0]);
    context.lineWidth = 45;
    context.stroke();

    //halfcourt
    context.beginPath();
    context.arc(160, 550, 50, 0, Math.PI * 2, false);
    context.lineWidth = 4;
    context.fillStyle = "#858484";
    context.fill();
    context.strokeStyle = "white";
    context.stroke();

    // current shot
    context.beginPath();
    context.arc(160, 522, 15, 0, Math.PI * 2, false);
    context.fillStyle = this.shots[0];
    context.fill();
      //ball markations current shot
      context.beginPath();
      context.arc(160, 522, 15, 0, Math.PI * 2, false);
      context.strokeStyle = 'black';
      context.lineWidth = 2.5;
      context.stroke();
      //
      context.beginPath();
      context.arc(146, 508, 13, 0, Math.PI * .5, false);
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.stroke();

      context.beginPath();
      context.arc(174, 536, 13.5, Math.PI, Math.PI * 1.5, false);
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.stroke();

      //main stripes
        context.beginPath();
        context.moveTo(150, 512);
        context.lineTo(171, 532.5);
        context.setLineDash([5, 5]);
        context.strokeStyle = "black";
        context.setLineDash([0, 0]);
        context.lineWidth = 2;
        context.stroke();
        // 
        context.beginPath();
        context.moveTo(170, 512);
        context.lineTo(149.5, 530.5);
        context.setLineDash([5, 5]);
        context.strokeStyle = "black";
        context.setLineDash([0, 0]);
        context.lineWidth = 2;
        context.stroke();
        
    // context.drawImage(this.spriteSheet, 41, 0, 41, 41, 160, 522, 41, 41);

    context.fillStyle = "gray";
    context.fill();
  }
}

module.exports = Turret;