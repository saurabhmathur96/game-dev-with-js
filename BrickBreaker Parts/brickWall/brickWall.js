/*
*   Brick Wall
*/

// select the canvas element with id 'game-canvas'
var canvas = document.getElementById('canvas');

// get the 2D rendering context from the canvas
var context = canvas.getContext('2d');

//  array to keep track of brick objects.
var bricks = [];

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

//  initialise bricks
initBricks();

//  renders all the bricks
brickWall();
