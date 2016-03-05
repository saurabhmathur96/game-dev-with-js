//Brick Wall
var canvas = document.getElementById('canvas');
var cxt = canvas.getContext('2d');
var bricks = []
function drawBrick(x,y){
    bricks.push({'x':x,'y':y});
    cxt.beginPath();
    cxt.rect(x, y, 30,20);
    cxt.fill();
}
function brickWall(){
    var m = 3, n=parseInt(canvas.width/40);
    console.log(n);
    var xVal=10,yVal=10;
    for(var i=0;i<m ;i++, yVal+=30, xVal=10){
        for(var j=0;j<n;j++, xVal+=40){
            drawBrick(xVal,yVal);
        }
    }
}
brickWall();
