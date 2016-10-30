var crosshairImg = document.createElement("img");
crosshairImg.src = "images/crosshair.png";
var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var eImg = document.createElement("img");
eImg.src = "images/slime.gif";
var tImg = document.createElement("img");
tImg.src = "images/tower-btn.png";
var towerImg = document.createElement("img");
towerImg.src = "images/tower.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var fps = 60;
var hp = 100;
var enemyPath = [
  {x: 96, y: 64},
  {x: 384, y: 64},
  {x: 384, y: 192},
  {x: 224, y: 192},
  {x: 224, y: 320},
  {x: 544, y: 320},
  {x: 544, y: 96},
];
function Enemy(){
  this.hp = 10,
  this.x = 96,
  this.y = 480-32,
  this.speedX =0,
  this.speedY =-64,
  this.pathDes =0,
  this.move = function(){
    if(isCollided(enemyPath[this.pathDes].x, enemyPath[this.pathDes].y, this.x, this.y, 64/fps, 64/fps)) {
      this.x = enemyPath[this.pathDes].x;
      this.y = enemyPath[this.pathDes].y;
      
      if(this.x == enemyPath[this.pathDes+1].x) {
        if(this.y > enemyPath[this.pathDes+1].y) {
          this.speedY = -64;
          this.speedX = 0;
        } else {
          this.speedY = 64;
          this.speedX = 0;
        }
      } else if (this.y == enemyPath[this.pathDes+1].y) {
        if(this.x > enemyPath[this.pathDes+1].x) {
          this.speedY = 0;
          this.speedX = -64;
        } else {
          this.speedY = 0;
          this.speedX = 64;
        }
      }
      
      this.pathDes += 1;
      
    } else {
      this.x += this.speedX/fps;
      this.y += this.speedY/fps;
    }
  }
  
}

var enemies = [];
var clock = 0;
var cursor = {x:0,y:0};
var isBuilding = false;

function isCollided(pointX, pointY, targetX, targetY, targetWidth, targetHeight){
  if(pointX >= targetX && pointX <= targetX + targetWidth && pointY >= targetY && pointY <= targetY + targetHeight) {
    return true;
  } else {
    return false;
  }
}


$("#game-canvas").on("mousemove", function(event) {
  cursor.x = event.offsetX - (event.offsetX%32);
  cursor.y = event.offsetY - (event.offsetY%32);
});

var tower = {
  x:0, 
  y:0,
  range:96,
  aimingEnemyId:null,
  shoot:function(id){
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(enemies[id].x,enemies[id].y);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.stroke();
    enemies[id].hp -= this.damage;
  },
  damage:2,
  fireRate:2,
  readyToShootTime:2,
  searchEnemy:function(){
    this.readyToShootTime -= 1/fps;
    for(var i = 0;i<enemies.length;i++){
      var distance = Math.sqrt(
        Math.pow(this.x-enemies[i].x,2)+Math.pow(this.y-enemies[i].y,2)
      );
      if(distance<=this.range){
        this.aimingEnemyId = i;
        if(readyToShootTime<=0){
          this.shoot(this.aimingEnemyId);
          this.readyToShootTime = this.fireRate;
        }
        return;
      }
    }
    this.aimingEnemyId = null;
  }
};
$("#game-canvas").on("click", function() {
  if(cursor.x >= 640-64 && cursor.y >= 480-64) {
    if(isBuilding == false) {
      isBuilding = true;
    } else {
      isBuilding = false;
    }
  } else {
    if(isBuilding == true) {
      tower.x = cursor.x;
      tower.y = cursor.y;
      
      isBuilding = false;
    }
  }
})

function draw(){
  
  clock++;
  
  if(clock%80 == 0){
    var newEnemy = new Enemy();
    enemies.push(newEnemy);
  }
  
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(tImg,640-64,480-64,64,64);
  ctx.drawImage(towerImg, tower.x, tower.y);
  ctx.font = "24px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("HP:"+hp,10,30);
  
  if(isBuilding == true) {
    ctx.drawImage(towerImg, cursor.x, cursor.y);  
  }
  
  for(var i = 0;i<enemies.length;i++){
    if (enemies[i].hp < 1){
      enemies.splice(i,1);
    }else{
      enemies[i].move();
      ctx.drawImage(eImg,enemies[i].x,enemies[i].y);
    }
  tower.searchEnemy();
  if(tower.aimingEnemyId!=null){
    var id = tower.aimingEnemyId;
    ctx.drawImage(crosshairImg,enemies[id].x,enemies[id].y);
  }
  }
  tower.shoot();
}
setInterval(draw,1000/fps);
