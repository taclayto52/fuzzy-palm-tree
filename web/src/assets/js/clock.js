// window.addEventListener('resize', redrawCanvas, false);

// var canvasContainer = document.getElementById("canvasContainer");
// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");
// var radius = canvas.height / 2;
// redrawCanvas();
// setInterval(redrawCanvas, 16);

function redrawCanvas(canvas, canvasContainer){
    var ctx = canvas.getContext("2d");
    var radius = canvas.height / 2;

	canvas.width = canvasContainer.offsetWidth;
    canvas.height = canvasContainer.offsetHeight;
	var minDim;
	if(canvas.width < canvas.height){
		minDim = canvas.width;
		// console.log("minDim is width");
	}
	else{
		minDim = canvas.height;
		// console.log("minDim is height");
	}
    radius = minDim / 2;
	//ctx.translate(radius, radius);
	ctx.translate(canvas.width/2, canvas.height/2);
	radius = radius * 0.90

    drawClock(ctx, radius);
}

function drawClock(ctx, radius) {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var millis = now.getMilliseconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    // second=(second*Math.PI/30) + (millis*Math.PI/(30*1000));
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function changeBackgroundColor(){
    document.getElementById('canvas').style.backgroundColor = "#5E504D";
}

function clearCanvas(canvas, canvasContainer, redrawFunction, intervalFunc){
    var ctx = canvas.getContext("2d");
	
	canvas.width = canvasContainer.offsetWidth;
    canvas.height = canvasContainer.offsetHeight;

    window.removeEventListener('resize', redrawFunction, false);
    

    document.getElementById('canvas').style.backgroundColor = "";
    clearInterval(intervalFunc);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export {redrawCanvas,changeBackgroundColor, clearCanvas};