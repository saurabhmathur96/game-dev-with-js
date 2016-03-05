//Paddle creation and movement.
var canvas = document.getElementById('canvas');
var cxt = canvas.getContext('2d');
var lP=false, rP=false;

var Ball={
    x:20,
    y:40,
    radius:20,
    dx:1,
    dy:-1
}
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
function ballDraw() {
    cxt.beginPath();
    cxt.arc(Ball.x, Ball.y, Ball.radius, 0, 2*Math.PI)
    cxt.fill();
}
function update(){
    if(lP && paddle.x){
        paddle.x = paddle.x - 1;
    }
    if(rP && (paddle.x+paddle.width)<canvas.width){
        paddle.x = paddle.x + 1;
    }
    if(Ball.x+Ball.radius > canvas.width || Ball.x - Ball.radius < 0 ){
        Ball.dx = -Ball.dx;
    }
    if(Ball.y+Ball.radius > canvas.height || Ball.y - Ball.radius < 0 ){
        Ball.dy = -Ball.dy;
    }
    if(Ball.y+Ball.radius > paddle.y && (paddle.x < Ball.x  && Ball.x< paddle.x+80) && Ball.dy>0){
        Ball.dy=-Ball.dy
    }
    if(Ball.y+Ball.radius==canvas.height){
        alert("Game Over!");
    }
    Ball.x+=Ball.dx;
    Ball.y+=Ball.dy;
}
function draw(){
    requestAnimationFrame(draw);
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    ballDraw();
    drawPaddle();
    update();
}
draw();
