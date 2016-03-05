//Paddle creation and movement.
var canvas = document.getElementById('canvas');
var cxt = canvas.getContext('2d');
var lP=false, rP=false;
var bricks = []

var Ball={
    x:100,
    y:150,
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
    for(var i=0;i<bricks.length;i++){
        var b=bricks[i];
        /*console.log(b.x);
        console.log(b.y);*/
        if(Ball.y-Ball.radius < b.y+20 && (b.x < Ball.x  && Ball.x< b.x+30) ){
            Ball.dy=-Ball.dy
            bricks.splice(i,1);
            console.clear();
            console.log("Collision");
            console.log(bricks.length);
            break;
        }
    }
    if(Ball.y+Ball.radius==canvas.height){
        console.clear();
        console.log("Game Over!");
    }
    //brickCollision();
    Ball.x+=Ball.dx;
    Ball.y+=Ball.dy;
}/*
function brickCollision(){
    for(var i=0;i<bricks.length;i++){
        var b=bricks[i]
        if(Ball.y+Ball.radius < b.y+20 && (b.x < Ball.x  && Ball.x< paddle.x+30) && Ball.dy>0){
            Ball.dy=-Ball.dy
            bricks.slice(i,1);
            break;
        }
    }
}*/
function drawBrick(x,y){
    cxt.beginPath();
    cxt.rect(x, y, 30,20);
    cxt.fill();
}
function initBricks(){
    var m = 3, n=parseInt(canvas.width/40);
    var xVal=10,yVal=10;
    for(var i=0;i<m ;i++, yVal+=30, xVal=10){
        for(var j=0;j<n;j++, xVal+=40){
            bricks.push({'x':xVal,'y':yVal});
        }
    }
}
function brickWall(){
    for(var i=0;i<bricks.length;i++){
        drawBrick(bricks[i].x,bricks[i].y);
    }
}
function draw(){
    requestAnimationFrame(draw);
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    ballDraw();
    drawPaddle();
    update();
    brickWall();
}
initBricks();
draw();
