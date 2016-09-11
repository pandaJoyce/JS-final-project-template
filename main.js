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

function draw(){
ctx.drawImage(bgImg,0,0);
ctx.drawImage(enemyImg,enemy.x,enemy.y);
ctx.drawImage(towbtnImg,608,448);
}

setInterval(draw,16);
