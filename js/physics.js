// When scrolling through document, apply upwards force to circles
$(document).on('scroll', function(){
    for(var i = 0; i < circles.length; i++) {
        circles[i].gravity = createVector(0, 0.1);
        circles[i].applyForce(createVector(0,-5));
    }
});

// When clicking anywhere on the canvas, create a new circle
$(document).on('click', function(){
    // Can have a max of 100 circles on the screen
    if(circles.length <= 100)
        circles.push(new Circle(mouseX, mouseY));
});


// Array to hold the circles
var circles = [];

// Canvas responsive relative to window height and width
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    // Creating canvas with the dimensions of the size of the screen
	var c = createCanvas(windowWidth, windowHeight);
    c.parent("canvas-container");

    // Creating 50 circles
    for(var i = 0; i < 50; i++) {
    	circles.push(new Circle(Math.random() * windowWidth, Math.random() * windowHeight));
    }
}

function draw() {
    // Setting the background with an alpha value so the circles have a slight trail
	background(245, 245, 248, 160);

    // Drawing every circle to the screen
	for(var i = 0; i < circles.length; i++) {
    	circles[i].draw();
    }
}