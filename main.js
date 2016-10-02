var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var FPS = 60;

var enemyImg = document.createElement("img");
enemyImg.src = "images/slime.gif";

var enemyPath = [
  {x:96,y:64},
  {x:384,y:64},
  {x:384,y:192},
  {x:224,y:192},
  {x:224,y:320},
  {x:544,y:320}
];

var enemy = {
  x:96,
  y:448,
  speedX:0,
  speedY:-64,
  pathDes:0,
  move:function(){
  if(isCollided(enemyPath[this.pathDes].x,enemyPath[this.pathDes].y,this.x,this.y,64/FPS,64/FPS) == true){
    this.x = enemyPath[this.pathDes].x;
    this.y = enemyPath[this.pathDes].y;
    pathDes++;
    if (this.x == enemyPath[pathDes].x && this.y < enemyPath[pathDes].y){
      speedX = 0;
      speedY = 64;
    }else if(this.x == enemyPath[pathDes].x && this.y > enemyPath[pathDes].y){
      speedX = 0;
      speedY = -64;
    }else if(this.x < enemyPath[pathDes].x && this.y == enemyPath[pathDes].y){
      speedX = 64;
      speedY = 0;
    }else if(this.x > enemyPath[pathDes].x && this.y == enemyPath[pathDes].y){
      speedX = -64; 
      speedY = 0;
  }else{
    this.x = this.x + this.speedX/FPS;
    this.y = this.y + this.speedY/FPS;
  }  
};

function isCollided(pointX,pointY,targetX,targetY,targetWidth,targetHeight){
  if(pointX >= targetX
     && pointX <= targetX+targetWidth
     && pointY >= targetY
     && pointY <= targetY+targetHeight){
    return true;
  }else{
    return false;
  }  
}

var towbtnImg = document.createElement("img");
towbtnImg.src = "images/tower-btn.png";

var towImg = document.createElement("img");
towImg.src = "images/tower.png";
var cursor = {x:0,y:0};

$("canvas").on("mousemove",function(event){
  cursor.x = event.offsetX - (event.offsetX%32);
  cursor.y = event.offsetY - (event.offsetY%32);
  
})
var isBuilding = false;
var tower = {x:0,y:0};
$("canvas").on("click",function(event){
  if(cursor.x >= 640-32 && cursor.y >= 480-32){
    if (isBuilding == true){
      isBuilding = false;
    }else{
      isBuilding = true;
    }
    
  }else if(isBuilding == true){
    tower.x = cursor.x;
    tower.y = cursor.y;
  }
  
})

function draw(){
ctx.drawImage(bgImg,0,0);
ctx.drawImage(enemyImg,enemy.x,enemy.y);
ctx.drawImage(towbtnImg,640-32,480-32,32,32);
ctx.drawImage(towImg,tower.x,tower.y);
  if (isBuilding == true){
    ctx.drawImage(towImg,cursor.x,cursor.y);
  }
enemy.move();
}

setInterval(draw,1000/FPS);
