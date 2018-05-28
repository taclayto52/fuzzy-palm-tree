// window.addEventListener('resize', redrawCanvas, false);

// var canvasContainer = document.getElementById("canvasContainer");
// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");

// var canvasSize = canvas.height;

// redrawCanvas();
// drawSkeles();

var colorOffset = 0;

function redrawCanvas(canvas, canvasContainer, broadcast, drawPattern, data){
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
	else if(drawPattern === "broadcast"){
		sayHelloNullZone(canvas, broadcast, data.numOfRows, data.imgEle);
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

function sayHelloNullZone(canvas, broadcast, numOfRows, imgEle){
	// sayHelloWrapAround(canvas, broadcast, numOfRows);
	sayHelloCenterWrapAroundFlash(canvas, broadcast, "Lucida Sans Unicode", imgEle);
	if(imgEle){
		var ctx = canvas.getContext("2d");
		// TODO fix this shit
		ctx.translate(-canvas.width/2, -canvas.height/2);
		ctx.translate(canvas.width/2, canvas.height/2);
		
		var rectX = -1*(imgEle.width/2);
		var rectY = -1*(imgEle.height/2);
		var rectWidth = imgEle.width;
		var rectHeight = imgEle.height;
		ctx.clearRect(rectX, rectY, rectWidth, rectHeight);
	}
}

function sayHelloWrapAround(canvas, broadcast, numOfRows, fontFamily){
	var ctx = canvas.getContext("2d");

	// const helloWorld = "SPOOKY";
	if(!numOfRows) numOfRows = 10;
	const minNumCols = 3;

	ctx.shadowColor = 0;

	var fontSize = canvas.height*(1/numOfRows);
	if(!fontFamily) fontFamily = "Lucida Sans Unicode";
    ctx.font=fontSize + "px " + fontFamily;
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

function sayHelloCenterWrapAroundFlash(canvas, broadcast, fontFamily, imgEle){
	var ctx = canvas.getContext("2d");
	ctx.translate(canvas.width/2, canvas.height/2);

	ctx.shadowColor = 0;

	var fontSize = imgEle.height;
	if(!fontFamily) fontFamily = "Bad Script"
    ctx.font=fontSize + "px " + fontFamily;
    ctx.textAlign="center";
	ctx.textBaseline="top";
	var textAlphaDelta = 0;

	//calculate correct width 
	var textWidth = ctx.measureText(broadcast).width;
	var textSizeConversion = textWidth/fontSize;
	fontSize=imgEle.width/textSizeConversion;
	ctx.font=fontSize + "px " + fontFamily;
	console.log("Font height: " + fontSize + ", Font width: " +textWidth);

	var textColor = 0;
	var colorIndex = colorOffset;

	// create text color array
	const textColorDelta = 30;
	let textColorsArray = [];
	for(var i=0; i<360; i=i+textColorDelta){
		textColorsArray.push("hsla(" + i + ", 100%, 50%, 1)");
	}
	/* var textColorsArray = ["hsla(125, 100%, 50%, 1)",
						   "hsla(180, 100%, 100%, 1)",
						   "hsla(360, 100%, 50%, 1)"]; */

	//Center column
	//Above image
	ctx.textBaseline="alphabetic";
	wrapAroundFlashUp(canvas, broadcast, fontSize, colorIndex, textColorsArray, 0, -1*(imgEle.height/2));

	//Below image
	ctx.textBaseline="hanging";
	wrapAroundFlashDown(canvas, broadcast, fontSize, colorIndex, textColorsArray, 0, (imgEle.height/2))

	//Right of image
	ctx.textBaseline="middle";
	for(var xOffset=imgEle.width; xOffset<(canvas.width/2); xOffset+=imgEle.width){
		wrapAroundFlashDown(canvas, broadcast, fontSize, colorIndex, textColorsArray, xOffset, 0);
		wrapAroundFlashUp(canvas, broadcast, fontSize, colorIndex, textColorsArray, xOffset, 0);
	}

	//Left of image
	for(var xOffset=-1*imgEle.width; Math.abs(xOffset)<(canvas.width/2); xOffset-=imgEle.width){
		wrapAroundFlashDown(canvas, broadcast, fontSize, colorIndex, textColorsArray, xOffset, 0);
		wrapAroundFlashUp(canvas, broadcast, fontSize, colorIndex, textColorsArray, xOffset, 0);
	}
	
	colorOffset = (colorOffset + 1)%textColorsArray.length;

}

function wrapAroundFlashUp(canvas, broadcast, fontSize, colorIndex, textColorsArray, startXPos, startYPos){
	var ctx = canvas.getContext("2d");

	for(var yPos=startYPos; Math.abs(yPos)<(canvas.height/2); yPos-=fontSize){
		ctx.fillStyle=textColorsArray[colorIndex];

		ctx.fillText(broadcast, startXPos, yPos);
		colorIndex = (colorIndex+1)%textColorsArray.length;
	}
}

function wrapAroundFlashDown(canvas, broadcast, fontSize, colorIndex, textColorsArray, startXPos, startYPos){
	var ctx = canvas.getContext("2d");

	for(var yPos=startYPos; Math.abs(yPos)<(canvas.height/2); yPos+=fontSize){
		ctx.fillStyle=textColorsArray[colorIndex];

		ctx.fillText(broadcast, startXPos, yPos);
		colorIndex = (colorIndex+1)%textColorsArray.length;
	}
}

function sayChristmasWrapAround(canvas, broadcast, numOfRows, fontFamily){
	var ctx = canvas.getContext("2d");

	// const helloWorld = "SPOOKY";
	if(!numOfRows) numOfRows = 5;
	const minNumCols = 2;

	ctx.shadowColor = 0;

	var fontSize = canvas.height*(1/numOfRows);
	if(!fontFamily) fontFamily = "Bad Script"
    ctx.font=fontSize + "px " + fontFamily;
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
	var colorIndex = colorOffset;
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

	colorOffset = (colorOffset + 1)%textColorsArray.length;
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

function preLoadImage(imageUrl){
	return new Promise((resolve, reject) => {
		var imgEle = new Image();
		imgEle.src = imageUrl;

		imgEle.onload = () =>{
			console.log("Done loading: " + imgEle);
			resolve(imgEle)
		};
	});
}

function drawBackground(imgSrc, imgRepeat, imgPosition){
	var image = new Image();
	// image.src = "./assets/img/skeles.gif";
	image.src = imgSrc;
	image.onload = () => {
		document.getElementById('canvas').style.backgroundImage = "url("+image.src+")";
		if(imgRepeat) document.getElementById('canvas').style.backgroundRepeat = imgRepeat;
		if(imgPosition) document.getElementById('canvas').style.backgroundPosition = imgPosition;
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

function clearCanvas(canvas, canvasContainer, redrawFunction, activeIntervalFunction){
	var ctx = canvas.getContext("2d");
	
	canvas.width = canvasContainer.offsetWidth;
	canvas.height = canvasContainer.offsetHeight;

	if(redrawFunction) window.removeEventListener('resize', redrawFunction, false);
	if(activeIntervalFunction) clearInterval(activeIntervalFunction);
	$("#broadcastContainer").hide();
	$("#undoGif").hide();
	$("#undoGif").removeClass("pulse-flash-on-delay0");
	$("#shareButton").hide();
	$("#shareButton").removeClass("pulse-flash-on-delay1");

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	document.getElementById('canvas').style.backgroundImage = 'none';
}

export {redrawCanvas, drawBackground, clearCanvas, preLoadImages, preLoadImage};