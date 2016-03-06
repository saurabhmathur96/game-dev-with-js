/*
*   Paddle creation and movement.
*/
// select the canvas element with id 'game-canvas'
var canvas = document.getElementById('game-canvas');

// get the 2D rendering context from the canvas
var context = canvas.getContext('2d');

// keep track of keys pressed
var leftKeyPressed = false, rightKeyPressed = false;

/**
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

    //  checks if the ball hits the floor, on contact it alerts a game over message
    if( this.y + this.radius == canvas.height ){
        alert("Game Over!");
    }

    //  Update location (x, y) according to velocity
    this.x+= this.dx;  //  update x location
    this.y+= this.dy;  //  update y location
}

/*
*   class Paddle represent the paddle,
*   with location (x, y),
*   size of paddle (height, width),
*   2D rendering context where it is drawn
*/
function Paddle(options) {
    this.context = context;
    this.x = options.x;
    this.y = options.y;
    this.height = options.height;
    this.width = options.width;
}

/*
*   method render - draws the paddle to the canvas.
*/
Paddle.prototype.render = function() {
    this.context.beginPath();   //  to start drawing the object

    this.context.rect(  this.x,      // x co-ordinate of where it is to be drawn
                        this.y,       // y co-ordinate of where it is to be drawn
                        this.width,   // width of the rectangle
                        this.height); // height of the rectangle

    this.context.fill();    //  to fill the paddle with color
}

/*
*   method update - updates the location of paddle, checks for keypress events
*/
Paddle.prototype.update = function(){

    //  if left arrow key is pressed and the paddle is not touching
    //  left wall, then it updates the x location to 1 unit left.
    if(leftKeyPressed && paddle.x){
        paddle.x = paddle.x - 1;
    }

    //  if left arrow key is pressed and the paddle is not touching
    //  right wall, then it updates the x location to 1 unit right.
    if(rightKeyPressed && (paddle.x+paddle.width)<canvas.width){
        paddle.x = paddle.x + 1;
    }
}

//  method listenKeyPress - listens to keypress, specifically left and right
//  arrow keys.
function listenKeyPress(){

    //  set true value when key is down
    function keyDownHandler(event){
        if(event.keyCode==39){
            rightKeyPressed=true;
        }
        else if (event.keyCode==37) {
            leftKeyPressed=true;
        }
    }

    //  set false value when key is up (released)
    function keyUpHandler(event){
        if(event.keyCode==39){
            rightKeyPressed=false;
        }
        else if (event.keyCode==37) {
            leftKeyPressed=false;
        }
    }

    //  method keyDownHandler will be called when any key is pressed
    document.addEventListener("keydown", keyDownHandler, false);
    //  method keyUpHandler will be called when any key is released
    document.addEventListener("keyup", keyUpHandler, false);
}

/*
*   method update - global update function which is used to call other update
*   functions, and monitor the paddle - ball collision
*/
function update(){
    if(ball.y+ball.radius > paddle.y && (paddle.x < ball.x  && ball.x< paddle.x+80) && ball.dy>0){
        ball.dy=-ball.dy
    }
    ball.update();
    paddle.update();
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

//  paddle created using Paddle constructor
var paddle = new Paddle({
    context:context,
    x:1,
    y:270,
    height:20,
    width:80
});
/*
*   method draw - this is the driver function, which calls other functions
*   each time it clears the canvas,
*   renders the ball,
*   renders the paddle,
*   update the directions and locations of objects (update).
*/
function draw(){
    requestAnimationFrame(draw);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.render();
    paddle.render();
    update();
}


//  one time adding event listeners
listenKeyPress();
//  start drawing
draw();
