var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

function draw(){
ctx.drawImage(bgImg,0,0);
}

var enemyImg = document.createElement("img");
enemyImg.src = "images/slime.gif";

setTimeout(draw,1000);
