/** main.js
 *
 * demonstrates a coin animation using setTimeout and requestAnimationFrame
 *
 * IEEE-CS Workshop on Game Development using JavaScript
 */

/**
 * class Sprite - represents a 2D sprite, stores
 * its location (x, y),
 * size per frame (width, height),
 * number of frames (numberOfFrames),
 * a 2D rendering context where it is drawn, and,
 * the spritesheet consisting of all its states as a single image.
 *
 */
function Sprite(options) {
    this.x = options.x;
    this.y = options.y;
    this.context = options.context;
    this.numberOfFrames = options.numberOfFrames;
    this.spriteSheet = options.image;
    this.width = options.image.width / options.numberOfFrames;
    this.height = options.image.height;
}

/**
 * method render - draws a frame by clipping the spritesheet to fit the required
 * frame.
 */
Sprite.prototype.render = function (frameIndex) {

    // use the context#drawImage method to draw a frame to the canvas.
    // clip the image such that only the frame specified by frameIndex is
    // visible
    //
    this.context.drawImage(  this.spriteSheet, // the entire spritesheet
                             frameIndex*this.width,  // starting x co-ordinate
                             0, // starting y co-ordinate
                             this.width, // width of source to be clipped
                             this.height, // height of source to be clipped
                             this.x, // x co-ordinate of where it is to be painted
                             this.y, // y co-ordinate of where it is to be painted
                             this.width, // width of drawn image
                             this.height); // height of drawn image
};


// create an Image object here and set its src attribute
// to'coin-sprite-animation-sprite-sheet.png'
var spriteSheet = new Image();
spriteSheet.src = 'coin-sprite-animation-sprite-sheet.png';


// when the image (spritesheet) has loaded
spriteSheet.onload = function() {

    // select the canvas with id 'game-canvas'
    var canvas = document.getElementById('game-canvas');

    // get the 2D rendering context from the canvas
    var context = canvas.getContext('2d');

    // create a Sprite object here
    var coin = new Sprite({
        x: 256,
        y: 256,
        image: spriteSheet,
        numberOfFrames: 10,
        context: context
    });

    // draw the frame at index 2 of the spritesheet
    // by calling the Sprite#render method

    coin.render(2);
    var frameIndex = 0;
    function loop() {
        context.clearRect(0, // start x co-ordinate (0)
                          0, // start y-co-ordinate (0)
               canvas.width, // end x co-ordinate (canvas width)
               canvas.height); //  end y co-ordinate (canvas height)

        // draw the current frame using Sprite#render
        coin.render(frameIndex);

        // update the frameIndex to next frame
        frameIndex = (frameIndex + 1) % coin.numberOfFrames;
    }

    // call the function loop at an interval of 100 milliseconds.
    setInterval(loop, 100);

}
