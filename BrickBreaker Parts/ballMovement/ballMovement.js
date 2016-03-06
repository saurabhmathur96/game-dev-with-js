/*
*   Ball Movement in 2 XY directions bouncing off walls.
*/

// select the canvas element with id 'game-canvas'
var canvas = document.getElementById('game-canvas');

// get the 2D rendering context from the canvas
var context = canvas.getContext('2d');
/*var Ball={
    x:20,
    y:40,
    radius:20,
    dx:1,
    dy:-1
}
function ballDraw() {
    context.beginPath();
    context.arc(Ball.x, Ball.y, Ball.radius, 0, 2*Math.PI)
    context.fill();
}
function update(){
    if(Ball.x+Ball.radius > canvas.width || Ball.x - Ball.radius < 0 ){
        Ball.dx = -Ball.dx;
    }
    if(Ball.y+Ball.radius > canvas.height || Ball.y - Ball.radius < 0 ){
        Ball.dy = -Ball.dy;
    }
    Ball.x+=Ball.dx;
    Ball.y+=Ball.dy;
}*/

/*
*   class Ball represent the Ball,
*   with location (x, y),
*   its radius,
*   its speed (dx, dy),
*   2D rendering context where it is drawn
*/
function Ball(options) {
    this.context = context;
    this.x = options.x;
    this.y = options.y;
    this.radius = options.radius;
    this.dx = options.dx;
    this.dy = options.dy;
}

/*
*   method render - draws the ball to the canvas.
*/
Ball.prototype.render = function(){
    this.context.beginPath();   //  to start drawing the object

    this.context.arc(   this.x,     // x co-ordinate of where it is to be drawn
                        this.y,     // y co-ordinate of where it is to be drawn
                        this.radius, // radius of the ball
                        0,          // beginning angle of the arc
                        2*Math.PI)  // ending angle of the arc

    this.context.fill();    //  to fill the arc with color
}

/*
*   method update - updates the directions of velocity of Ball,
*   when the Ball hits the walls
*/
Ball.prototype.update = function(){

    //  updates the velocity of Ball in x direction, reverses the direction of
    //  x-velocity when it hits the left or right wall.
    if( this.x + this.radius > canvas.width || this.x - this.radius < 0 ){
       this.dx = -this.dx;
    }

    //  updates the velocity of Ball in y direction, reverses the direction of
    //  y-velocity when it hits the top or bottom wall.
    if( this.y + this.radius > canvas.height || this.y - this.radius < 0 ){
        this.dy = -this.dy;
    }

    //  Update location (x, y) according to velocity
    this.x+= this.dx;  //  update x location
    this.y+= this.dy;  //  update y location
}


//  ball created using Ball constructor
var ball = new Ball({
    context:context,
    x:100,
    y:150,
    radius:5,
    dx:1,
    dy:-1
});

/*
*   method draw - this is the driver function, which calls other functions
*   each time it clears the canvas,
*   renders the ball,
*   update the directions and locations of ball (ball.update)
*/
function draw(){
    requestAnimationFrame(draw);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.render();
    ball.update();
}

//  starts drawing in canvas
draw();
