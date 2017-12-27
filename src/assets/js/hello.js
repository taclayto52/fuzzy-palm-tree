// window.addEventListener('resize', redrawCanvas, false);

// var canvasContainer = document.getElementById("canvasContainer");
// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");

// var canvasSize = canvas.height;

// redrawCanvas();
// drawSkeles();

function redrawCanvas(canvas, canvasContainer, broadcast, drawPattern){
	var ctx = canvas.getContext("2d");

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
    
    var canvasSize = minDim;
	// ctx.translate(canvas.width/2, canvas.height/2);
	// ctx.translate(canvas.width/2, 100);

	// printCanvasSize(canvas);
	// sayHelloCenterLoop();
	if(drawPattern === "christmas"){
		sayChristmasWrapAround(canvas, broadcast);
	}
	else if(drawPattern === "loading"){
		sayLoading(canvas, broadcast);
	}
	else sayHelloWrapAround(canvas, broadcast);
	// drawPeesha();
}

function printCanvasSize(canvas){
	console.log(canvas.width + "x" + canvas.height);
}

function sayHelloWrapAround(canvas, broadcast){
	var ctx = canvas.getContext("2d");

	// const helloWorld = "SPOOKY";
	const numOfRows = 10;
	const minNumCols = 2;

	ctx.shadowColor = 0;

	var fontSize = canvas.height*(1/numOfRows);
    ctx.font=fontSize + "px Lucida Sans Unicode";
    ctx.textAlign="start";
	ctx.textBaseline="top";
	var textAlphaDelta = 0;
	// var posShiftDelta = canvasSize*.006;

	var textWidth = ctx.measureText(broadcast).width;
	while((textWidth*minNumCols) > (canvas.width)){
		fontSize--;
		ctx.font=fontSize + "px Lucida Sans Unicode";
		textWidth = ctx.measureText(broadcast).width;
	}
	
	var posShiftDelta = fontSize;
	var numLinesOfText = Math.floor(canvas.height/posShiftDelta);
	var numColsOfText = Math.floor(canvas.width/textWidth);
	var textColorDelta = 360/(numLinesOfText*numColsOfText);

	var xOffset = ((canvas.width - (numColsOfText * textWidth))/numColsOfText) + textWidth;
	// console.log("text width: " + textWidth)
	// console.log("calculated xOffset: " + xOffset);

	var xPos = 0;
	var textColor = 0;
	for(var i=0; i< numColsOfText; i++){
		var yPos = 0;
		var alphaValue = 1;

		for(var j=0; j<numLinesOfText; j++){
			ctx.fillStyle="hsla(" + textColor + ", 100%, 50%, " + alphaValue + ")";
			ctx.shadowBlur = 15;
			ctx.shadowOffsetX = 5;
			ctx.shadowOffsetY = 10;
			ctx.shadowColor="hsla("+(textColor+180)%360 + ", 100%, 50%, 1)";
			// ctx.strokeText(helloWorld, xPos, yPos);
			ctx.fillText(broadcast, xPos, yPos);

			ctx.shadowOffsetX = -5;
			ctx.shadowOffsetY = 10;
			ctx.fillText(broadcast, xPos, yPos);

			yPos += posShiftDelta;
			alphaValue += textAlphaDelta;
			textColor = (textColor+textColorDelta)%360;
		}

		xPos += xOffset;
	}
}

function sayChristmasWrapAround(canvas, broadcast){
	var ctx = canvas.getContext("2d");

	// const helloWorld = "SPOOKY";
	const numOfRows = 5;
	const minNumCols = 2;

	ctx.shadowColor = 0;

	var fontSize = canvas.height*(1/numOfRows);
    ctx.font=fontSize + "px Bad Script";
    ctx.textAlign="start";
	ctx.textBaseline="top";
	var textAlphaDelta = 0;
	// var posShiftDelta = canvasSize*.006;

	var textWidth = ctx.measureText(broadcast).width;
	while((textWidth*minNumCols) > (canvas.width)){
		fontSize--;
		ctx.font=fontSize + "px Bad Script";
		textWidth = ctx.measureText(broadcast).width;
	}
	
	var posShiftDelta = fontSize;
	var numLinesOfText = Math.floor(canvas.height/posShiftDelta);
	var numColsOfText = Math.floor(canvas.width/textWidth);
	// var textColorDelta = 360/(numLinesOfText*numColsOfText);
	var textColorsArray = ["hsla(125, 100%, 50%, 1)",
						//    "hsla(180, 100%, 100%, 1)",
						   "hsla(360, 100%, 50%, 1)"];

	var xOffset = ((canvas.width - (numColsOfText * textWidth))/numColsOfText) + textWidth;
	// console.log("text width: " + textWidth)
	// console.log("calculated xOffset: " + xOffset);


	var xPos = 0;
	var textColor = 0;
	var colorIndex = 0;
	for(var i=0; i< numColsOfText; i++){
		var yPos = 0;
		var alphaValue = 1;

		for(var j=0; j<numLinesOfText; j++){
			// ctx.fillStyle="hsla(" + textColor + ", 100%, 50%, " + alphaValue + ")";
			ctx.fillStyle=textColorsArray[colorIndex];
			ctx.shadowBlur = 15;
			ctx.shadowOffsetX = 5;
			ctx.shadowOffsetY = 10;
			ctx.shadowColor=textColorsArray[(colorIndex+1)%colorIndex.length];
			// ctx.shadowColor="hsla("+(textColor+180)%360 + ", 100%, 50%, 1)";
			// ctx.strokeText(helloWorld, xPos, yPos);
			ctx.fillText(broadcast, xPos, yPos);

			ctx.shadowOffsetX = -5;
			ctx.shadowOffsetY = 10;
			ctx.fillText(broadcast, xPos, yPos);

			yPos += posShiftDelta;
			alphaValue += textAlphaDelta;
			// textColor = (textColor+textColorDelta)%360;
			colorIndex = (colorIndex+1)%textColorsArray.length;
		}

		xPos += xOffset;
	}
}

function drawPeesha(){
	var image = new Image(canvas.width, canvas.height);
	image.src = "images/peesha.jpg";
	image.onload = () => {
		ctx.drawImage(image, 0, 0);
	}
}

function preLoadImages(imageArray, cb){
	const numImages = imageArray.length;
	var numImagesLoaded = 0;

	imageArray.forEach((image) => {
		var imgEle = new Image();
		imgEle.src = image;
		imgEle.onload = () => {
			console.log("done loading image: " + image);
			numImagesLoaded++;
			if(numImagesLoaded === numImages) cb();
		}
	});
}

function drawBackground(imgSrc){
	var image = new Image();
	// image.src = "./assets/img/skeles.gif";
	image.src = imgSrc;
	image.onload = () => {
		document.getElementById('canvas').style.backgroundImage = "url("+image.src+")";
	}
}

function sayLoading(canvas, broadcast){
	// const helloWorld = "Hello!!";
	var ctx = canvas.getContext("2d");

	ctx.translate(canvas.width/2, 100);

    ctx.font=(canvas.height)*.15 + "px arial";
    ctx.textAlign="center";
	ctx.textBaseline="middle";
	var textAlphaDelta = .09;
	var textColorDelta = 360*textAlphaDelta;
	// var posShiftDelta = canvasSize*.006;
	var posShiftDelta = canvas.height*.05;

	// var xPos = canvasSize*.05;
	var xPos = 0;
	var yPos = 0;
	var textColor = 0;
	for(var alphaValue=.2; alphaValue<1; alphaValue+=textAlphaDelta){
		ctx.fillStyle="hsla(" + textColor + ", 100%, 50%, " + alphaValue + ")"
		ctx.fillText(broadcast, xPos, yPos);

		// xPos += posShiftDelta;
		yPos += posShiftDelta;
		textColor += textColorDelta;
	}

	for(var alphaValue=1; alphaValue>=.2; alphaValue-=textAlphaDelta){
		ctx.fillStyle="hsla(" + textColor + ", 100%, 50%, " + alphaValue + ")"
		ctx.fillText(broadcast, xPos, yPos);

		// xPos += posShiftDelta;
		yPos += posShiftDelta;
		textColor -= textColorDelta;
	}
    // ctx.fillText("Hello!", 150, 50);
}

function clearCanvas(canvas, canvasContainer, redrawFunction){
	var ctx = canvas.getContext("2d");
	
	canvas.width = canvasContainer.offsetWidth;
	canvas.height = canvasContainer.offsetHeight;

	if(redrawFunction) window.removeEventListener('resize', redrawFunction, false);

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	document.getElementById('canvas').style.backgroundImage = 'none';
}

export {redrawCanvas, drawBackground, clearCanvas, preLoadImages};