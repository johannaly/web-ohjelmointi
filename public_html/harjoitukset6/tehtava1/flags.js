let canvas = document.getElementById("sweFlag");
let context = canvas.getContext("2d");

let canvasGuy = document.getElementById("guyFlag");
let ctx = canvasGuy.getContext("2d");

context.fillStyle = "blue";
context.fillRect(0,0,500,300);

context.beginPath();
context.moveTo(0,150);
context.lineTo(500, 150);
context.lineWidth = 75;
context.strokeStyle = "yellow";
context.stroke();

context.beginPath();
context.moveTo(200, 0);
context.lineTo(200, 300);
context.stroke();

ctx.fillStyle = "green";
ctx.fillRect(0,0,500,300);

ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(500, 150);
ctx.lineTo(0,300);
ctx.lineTo(0,0);
ctx.closePath();
ctx.fillStyle = "orange";
ctx.fill();
ctx.lineWidth = 2;
ctx.strokeStyle = "white";
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(250,150);
ctx.lineTo(0,300);
ctx.lineTo(0,0);
ctx.closePath();
ctx.fillStyle = "darkred";
ctx.fill();
ctx.lineWidth = 2;
ctx.strokeStyle = "black";
ctx.stroke();



