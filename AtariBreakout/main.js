//Ball Movement in 2 XY directions bouncing off walls.
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var Ball={
    x:20,
    y:40,
    radius:20,
    dx:1,
    dy:-1
}
function ballDraw() {
    ctx.beginPath();
    ctx.arc(Ball.x, Ball.y, Ball.radius, 0, 2*Math.PI)
    ctx.fill();
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
}
function Loop(){
    requestAnimationFrame(Loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ballDraw(Ball);
    update(Ball);
}
Loop(Ball);
