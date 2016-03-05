//Paddle creation and movement.
var canvas = document.getElementById('canvas');
var cxt = canvas.getContext('2d');
var lP=false, rP=false;
var paddle={
    x:1,
    y:270,
    height:20,
    width:80
}
function drawPaddle(){
    cxt.beginPath();
    cxt.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    cxt.fill();
}
function keyDownHandler(event){
    //console.log("DownListener");
    if(event.keyCode==39){
        rP=true;
    }
    else if (event.keyCode==37) {
        lP=true;
    }
}
function keyUpHandler(event){
    //console.log("UpListener");
    if(event.keyCode==39){
        rP=false;
    }
    else if (event.keyCode==37) {
        lP=false;
    }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function check(){
    if(lP && paddle.x){
        paddle.x = paddle.x - 1;
    }
    if(rP && (paddle.x+paddle.width)<canvas.width){
        paddle.x = paddle.x + 1;
    }
}
function movPaddle(){
    requestAnimationFrame(movPaddle);
    cxt.clearRect(0, 0, cxt.canvas.width, cxt.canvas.height);
    drawPaddle();
    check();
}

movPaddle();
