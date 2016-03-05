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
    this.context.drawImage(  , // the entire spritesheet
                             ,  // starting x co-ordinate
                             , // starting y co-ordinate
                             , // width of source to be clipped
                             , // height of source to be clipped
                             , // x co-ordinate of where it is to be placed on canvas
                             , // y co-ordinate of where it is to be placed on canvas
                             , // width of drawn image
                             ); // height of drawn image
};


// create an Image object here and set its src attribute
// to'coin-sprite-animation-sprite-sheet.png'




// when the image (spritesheet) has loaded


    // select the canvas with id 'game-canvas'


    // get the 2D rendering context from the canvas


    // create a Sprite object here
    // give x, y co-ordinates,
    // the spriteSheet image,
    // number of frames and,
    // context as parameters



    // test the render method
    // draw the frame at index 2 of the spritesheet
    // by calling the Sprite#render method


    var frameIndex = 0;
    function loop() {
        // clear canvas by using canvas#clearRect method
        canvas.clearRect(  ,  // start x co-ordinate (0)
                           ,  // start y-co-ordinate (0)
                           ,  // end x co-ordinate (canvas width)
                            ); //  end y co-ordinate (canvas height)

        // draw the current frame using Sprite#render


        // update the frameIndex to next frame

    }

    // call the function loop at an interval of 100 milliseconds.
    setInterval(loop, 100);

}
