var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var enemyImg = document.createElement("img");
enemyImg.src = "images/slime.gif";

var enemy = {
  x:0,
  y:0
};

var towbtnImg = document.createElement("img");
towbtnImg.src = "images/tower-btn.png";

var towImg = document.createElement("img");
towImg.src = "images/tower.png";
var cursor = {x:0,y:0};

$("canvas").on("mousemove",function(event){
  cursor.x = event.offsetX;
  cursor.y = event.offsetY;
  
})
var isBuilding = false;
$("canvas"),on("click",function(event){
  if(cursor.x >= 640-32 && cursor.y >= 480-32){
    if (isBuilding = true){
      isBuilding = false;
    }else{
      isBuilding = true;
    }
  
  }
})
function draw(){
ctx.drawImage(bgImg,0,0);
ctx.drawImage(enemyImg,enemy.x,enemy.y);
ctx.drawImage(towbtnImg,640-32,480-32,32,32);
  if (isBuilding = true){
    ctx.drawImage(towImg,cursor.x,cursor.y);
  }  
}

setInterval(draw,16);
