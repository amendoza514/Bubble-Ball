# Bubble Ball!

*Bubble Ball!* (https://amendoza514.github.io/) is an arcade-styled shooter/puzzle game that leverages varied custom collision detection patterns to reward accurate shot placement by players. No libraries (other than howler.js for reliable audio interactivity across browsers) were used in the creation of this Javascript and HTML Canvas only project.

<img width="550" alt="Screen Shot 2020-08-12 at 1 08 28 PM" src="https://user-images.githubusercontent.com/62665796/90070783-45643400-dca9-11ea-9c97-04edca6fe3d4.png">

# About

*Bubble Ball!* was inspired by the NBA’s move to Disney’s Orlando campus for a restart to the NBA season and eventual playoffs (i.e. the “NBA Bubble”) in response to the 2020 COVID crisis. Design elements were also inspired by the classic "NBA Jam" game cabinets in arcades throughout the 90's that let players choose from their favorite NBA starters.  Players must use the mouse to aim and fire a turret to destroy targets of like-color in order to prevent them from crossing  the 'half-court' and ending the game. 

Players can target clusters of targets with the same color of the current projectile loaded (projectile previews are visible at the turret) to destroy multiple at the same time. Targets that are completely isolated from other targets as a result of a shot are rewarded as 'free throws' and dropped from the court for free points.

Additionally, players can choose from "LeBron James" or "Steph Curry" player types that grant additional abilities. These abilities allow a user to utilize either a built in aiming reticle for more precise shooting (Curry), or the chance for *AND - 1* free target hits anywhere on the map following any successful shot (LeBron).

Check out the [live demo](https://amendoza514.github.io/) if you are interested!

## Demo Gameplay

![gameplay](https://user-images.githubusercontent.com/62665796/90072345-287d3000-dcac-11ea-9b3f-49d8514ecd70.gif)

## Features
### Collision Detection and Chain-Reaction Dynamic
I chose to expand on basic 2D circle detection logic for my primary game mechanics, as I wanted to avoid leveraging any external libraries or resources. By isolating targets and projectiles into separate object types, I was able to register valid collisions in real time by checking object type, color, and distance from other surrounding objects (preventing self-generating targets of the same color from 'popping' on load). 

    
    getDistance(x1, y1, x2, y2) {
	    const  xDist = x2 - x1;
	    const  yDist = y2 - y1;
	    return  Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
    }
    
    checkCollision() {
	    let  currentShot = this.game.projectiles
		    [this.game.projectiles.length - 1];
        
	    for (let  k = 0; k < this.game.projectiles.length - 1; k++) {
	    if (this.game.projectiles[k].drop === true) {
	    continue;
	    }
	    let  pX = currentShot.aimX;
	    let  pY = currentShot.aimY;
	    let  pRadius = currentShot.radius;
	    let  tX = this.game.projectiles[k].aimX;
	    let  tY = this.game.projectiles[k].aimY;
	    let  tRadius = currentShot.radius;

	    if (this.getDistance(pX, pY, tX, tY) < pRadius + tRadius) {
		    currentShot.dx = 0;
		    currentShot.dy = 0;
		    currentShot.radius = 20;
		    currentShot.aimX = this.approxX(pX, tX);
		    currentShot.aimY = this.approxY(pY, tY);	
		    currentShot.collided = true;
		    this.game.reloaded = true;
 
	    if (currentShot.color === this.game.projectiles[k].color) {
		    if (this.andOneNumber === null) {
			    this.andOne();
		    }
		    
		    if (this.popped === false) {
			    this.popped = true;
			    this.pop.rate(this.soundType());
			    this.pop.play();
		    }
		    currentShot.hit = true
		    this.game.projectiles[k].hit = true;
		    this.checkChain = true;
		    }
	    }}
	    
	    for (let  j = 0; j < this.game.targets.length; j++) {
	    
	    if (this.game.targets[j].drop === true) {
		    continue;
	    }
	    
	    if (this.getDistance(currentShot.aimX, currentShot.aimY, this.game.targets[j].x,this.game.targets[j].y) <
	    currentShot.radius + this.game.targets[j].radius
	    ) {
		    currentShot.dx = 0;
		    currentShot.dy = 0;
		    currentShot.radius = 20;
		    this.game.reloaded = true;
		    currentShot.collided = true;
		    currentShot.aimX = this.approxX(
			    currentShot.aimX,
			    this.game.targets[j].x
		    );
		    currentShot.aimY = this.approxY(
			    currentShot.aimY,
			    this.game.targets[j].y
			);
	       
		    if (currentShot.color === this.game.targets[j].color) {
		    
			    if (this.andOneNumber === null) {
				    this.andOne();
			    }
		    
			    if (this.popped === false) {
				    this.popped = true;
				    this.pop.rate(this.soundType());
				    this.pop.play();
			    }
			    currentShot.hit = true;
			    this.game.targets[j].hit = true;
			    this.checkChain = true;
			    }
		    }   
	    }
	}

Objects that have collided then get sent to a separate custom algorithm that allows for chain-reaction collisions to 'pop' surrounding targets/projectile based on valid location data and various collision related flags that now live in the targets/projectiles. These collisions and cluster chain-reaction checks are being rendered on every animation frame to allow for fluid gameplay.

### Turret Swivel and Projectile Fire Trajectory 
In order to track turret movement and projectile fire I seeded live mouse position coordinates from the HTML Canvas element to influence subsequent repaints of the turret object [x, y]  endpoints, resulting in a rectangle canvas element that follows the players' mouse in real time. The turret then passes new Projectile objects with these coordinates and slope characteristics to render new projectiles in the correct travel path.

Players that selected the *Steph Curry* ability can also utilize an extended version of the mouse tracking turret, which gives players a visual aim reticle to guide shot placement (represented by the *cheatX* and *cheatY* attributes below).

    
    swivelTurret(mousePosition) {
	    this.dx = mousePosition[0] - 160;
	    this.dy = 540 - mousePosition[1];
	    let  swivel = Math.atan2(this.dy, this.dx) + Math.PI;
	    let  hyp = Math.sqrt(this.dy ** 2 + this.dx ** 2);
	    this.aimX = 160 - Math.cos(swivel) * 50;
	    this.aimY = 540 + Math.sin(swivel) * 50;
	    this.cheatX = 160 - Math.cos(swivel) * 550;
	    this.cheatY = 540 + Math.sin(swivel) * 550;
	    this.speedX = -Math.cos(swivel) * 12;
	    this.speedY = Math.sin(swivel) * 12;
    }
    
    fire() {
        if (this.game.reloaded === true) {
		    let  projectile = new  Projectile({
			    game:  this.game,
			    slope: [this.speedX, this.speedY],
			    aimX:  this.aimX,
			    aimY:  this.aimY,
			    color:  this.shots[0],
		    });
    
	    this.projectiles += 1;
	    this.game.reloaded = false;
	    this.game.addProjectiles(projectile);
	    this.shots.shift();
	    this.shots.push(this.randomColor());
	    }
    }
    

## Technologies Used

 - JavaScript
 - HTML Canvas
 - SCSS / CSS
 - howler.js

## Future Implementations

 - Firebase DB for global leaderboard / highscore element
 - Improved 2D Raycasting element to have aim reticle 'bounce' off of walls and show more fluid projectile trajectory paths.
 - Improved collision detection that results in fewer less dropped shots.
