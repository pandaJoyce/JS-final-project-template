var bgImg = document.create.Element("img");
bgImg.src = "images/map.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
function draw(){
ctx.drawImage(bgImg,0,0);
}
draw();
