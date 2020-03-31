const r = 100;

let slider = document.getElementById("slider");
let output = document.getElementById("height");
let canvas = document.getElementById("barrel");
let ctx = canvas.getContext("2d");
output.innerHTML = slider.value + "cm"; // Display the default slider value
drawView(slider.value);

function drawView(d){
  //lasketaan uudet arvot
  const values = calculate(d);

  //tyhjätään canvas
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 800, 400);
  
  //piirretään ympyrä
  ctx.beginPath();
  ctx.arc(400,200,100,0,2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  
  //piirretään tekstit
  ctx.font = "14px Arial";
  ctx.fillStyle = "Black";
  ctx.fillText("Tynnyrin pituus: 100cm", 10, 20);
  ctx.fillText("Tynnyrin halkaisija: 200cm", 10, 40);
  ctx.fillText("Tynnyrin tilavuus: 3141.59 litraa", 10, 60);
  ctx.fillText("Nestemäärä:", 10, 100);
  ctx.fillText(values.volume.toFixed(2) + " litraa", 10, 120);
  
  // piirretään neste
  ctx.beginPath();
  ctx.fillStyle = "lightblue";
  ctx.arc(400, 200, 100, values.startAngle, values.endAngle, d > 100);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
  drawView(parseInt(this.value));
}

function calculate(d) {
  const areaTot = Math.PI * Math.pow(r, 2);
  if (d <= 100) {
    const h = r - d;
    const alpha = Math.acos(h / r);
    const startAngle = (Math.PI/2) - alpha;
    const areaPie = ((alpha * 2) / (2 * Math.PI)) * areaTot;
    const triangleBase = h * Math.tan(alpha);
    const areaTriangle = h * triangleBase / 2;
    const areaLiquid = areaPie - 2 * areaTriangle;
    return {
      startAngle: startAngle,
      endAngle: (Math.PI - startAngle),
      volume: areaLiquid * 100 / 1000
    }
  }
  else {
    const h = d - 100;
    const alpha = Math.acos(h / r);
    const startAngle = Math.PI + (Math.PI/2 - alpha); 
    const areaPie = ((alpha * 2) / (2 * Math.PI)) * areaTot;
    const triangleBase = h * Math.tan(alpha);
    const areaTriangle = h * triangleBase / 2;
    const areaLiquid = areaTot - (areaPie - 2 * areaTriangle);
    return {
      startAngle: startAngle,
      endAngle: (Math.PI - startAngle),
      volume: areaLiquid * 100 / 1000
    }
  }
}
