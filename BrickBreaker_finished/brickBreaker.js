/*
 * Game.
*/

// select the canvas element with id 'game-canvas'
var canvas = document.getElementById('game-canvas');

// get the 2D rendering context from the canvas
var context = canvas.getContext('2d');

// keep track of keys pressed
var leftKeyPressed = false, rightKeyPressed = false;

// to initialise bricks
var bricks = [];

/**
*   class Ball represent the Ball,
*   with location (x, y),
*   its radius,
*   its speed (dx, dy),
*   2D rendering context where it is drawn
*/
function Ball(options) {
    this.context=context;
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
    if( this.y + this.radius > canvas.height ){
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
*   its speed (dx),
*   2D rendering context where it is drawn
*/
function Paddle(options) {
    this.context = context;
    this.x = options.x;
    this.y = options.y;
    this.height = options.height;
    this.width = options.width;
    this.dx = options.dx;
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
        this.x = this.x - this.dx;
    }

    //  if left arrow key is pressed and the paddle is not touching
    //  right wall, then it updates the x location to 1 unit right.
    if(rightKeyPressed && (paddle.x+paddle.width)<canvas.width){
        this.x = this.x + this.dx;
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
*   functions, and monitor the paddle - ball collision,
*   and brick collision
*/
function update(){
    if(ball.y+ball.radius > paddle.y && (paddle.x < ball.x  && ball.x< paddle.x+80) && ball.dy>0){
        ball.dy=-ball.dy
    }
    for(var i=0;i<bricks.length;i++){
        if(bricks[i].update()){
            bricks.splice(i,1);
            console.clear();
            console.log("Collision");
            break;
        }
    }
    ball.update();
    paddle.update();
}

/**
*   class Brick represent a single brick,
*   with location (x, y),
*   size of paddle (height, width),
*   2D rendering context where it is drawn
*/
function Brick(options) {
    this.context=context;
    this.x = options.x;
    this.y = options.y;
    this.height = options.height;
    this.width = options.width;
}

/*
*   method render - draws the brick to the canvas.
*/
Brick.prototype.render = function() {
    this.context.beginPath();   //  to start drawing the object

    this.context.rect(  this.x,      // x co-ordinate of where it is to be drawn
                        this.y,       // y co-ordinate of where it is to be drawn
                        this.width,   // width of the rectangle
                        this.height); // height of the rectangle

    this.context.fill();    //  to fill the brick with color
}

/*
*   method update - updates the location of brick, checks for the collision
*   with ball.
*/
Brick.prototype.update = function(){

    //  if ball's highest point crosses brick's lowermost point and
    //  ball's x co-ordinate is greater than x co-ordinate of brick and less than
    //  brick's x co-ordinate + brick's width.
    if(ball.y-ball.radius < this.y+ this.height && (this.x < ball.x  && ball.x< this.x+this.width) ){
        ball.dy=-ball.dy
        return 1;
    }
    return 0;
}

/*
*   method initBricks - initialises the bricks.
*   it uses the constructor to create new bricks and adds them to bricks array
*/
function initBricks(){
    var m = 3, n=parseInt(canvas.width/40);
    var xVal=10,yVal=10;
    for(var i=0;i<m ;i++, yVal+=30, xVal=10){
        for(var j=0;j<n;j++, xVal+=40){
            bricks.push(new Brick({
                context : context,
                x : xVal,
                y : yVal,
                width : 30,
                height : 20
            }));
        }
    }
}

/*
*   method brickWall - it creates all bricks using render function of Brick
*   constructor. The bricks are stored in the "bricks" array.
*/
function brickWall(){
    for(var i=0;i<bricks.length;i++){
        bricks[i].render();
    }
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
    height:10,
    width:80,
    dx:3
});

/*
*   method draw - this is the driver function, which calls other functions
*   each time it clears the canvas,
*   renders the ball,
*   renders the paddle,
*   renders the bricks (brickWall),
*   update the directions and locations of objects (update).
*/
function draw(){
    requestAnimationFrame(draw);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.render();
    paddle.render();
    brickWall();
    update();
}
//  one time adding event listeners
listenKeyPress();
//  initialising bricks
initBricks();
//  draw function
draw();
