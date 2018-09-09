// Possible colors - Used a color palette
var colorArray = [
	'#2e313c',
	'#45404c',
	'#626375',
	'#d5cec5'
];

// Circle class
// Constructor: Provide an x and y position to start circle at
function Circle(x, y) {

	// Kinematic variables
	this.pos = createVector(x,y);
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0.1);

	// Random radius
	this.radius = Math.floor(Math.random() * 3 + 2);

	// Environment variables
	this.gravity = createVector(0, 0.1);
	this.bounce = createVector(0, -0.2);
	this.horForce = 0.05;

	// Setting a random color for each circle - Alter colorArray to change values
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
	

	// Function used to modify this.acc var
	this.applyForce = function(force) {
		this.acc.add(force);
	}


	// Update kinematic variables
	this.update = function() {


		// 10% chance of adding horizontal velocity to circle
		if((10 * Math.random()) > 9) {
			
			// Horizontal velocity pointing left or right
 			if (Math.random() - 0.5 > 0)
				this.applyForce(createVector(this.horForce, 0));
			else
				this.applyForce(createVector(-this.horForce, 0));
		}


		// If hit horizontal constraint, reverse horizontal velocity
		if(this.pos.x <= this.radius || this.pos.x >= width - this.radius)
			this.vel.x *= -1;


		// If hit bottom of screen, bounce up
		if(this.pos.y > height - this.radius) {

			this.vel.y *= -1;

			// increasing gravity as the ball bounces so it doesn't bounce forever
			if(this.gravity.y < 0.8) {
				this.gravity.y += 0.02;
			}

		} else {
			// Otherwise, apply force to continue downwards
			this.applyForce(this.gravity);
			this.vel.add(this.acc);
		}

		// Limit acceleration vector length
		this.acc.limit(5);


		// Limit velocity vector length
		this.vel.limit(6);

		// Update position relative to velocity
		this.pos.add(this.vel);

		// If reached top of page, bounce off the top with a dampened velocity
		if(this.pos.y <= 0){
			this.pos.y = 0;
			this.vel.y *= -0.1;
		}

		// Reset acceleration vector
		this.acc.mult(0);
	}


	// Draw Circle to the screen
	this.draw = function() {

		// Update Circle kinematics
		this.update();

		// Print to screen
		noStroke();
		fill(this.color);
		ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
	}
}