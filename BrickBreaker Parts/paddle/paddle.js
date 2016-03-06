/*
*   Paddle creation and movement.
*/

// select the canvas element with id 'game-canvas'
var canvas = document.getElementById('game-canvas');

// get the 2D rendering context from the canvas
var context = canvas.getContext('2d');

// keep track of keys pressed
var leftKeyPressed = false, rightKeyPressed = false;

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
*   renders the paddle,
*   update the location of paddle
*/
function draw(){
    requestAnimationFrame(draw);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    paddle.render();
    paddle.update();
}

//  one time adding event listeners
listenKeyPress();
//  start drawing
draw();
