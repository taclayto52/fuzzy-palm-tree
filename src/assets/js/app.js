import $ from 'jquery';
import whatInput from 'what-input';
import {redrawCanvas as helloRedrawCanvas, drawSkeles, clearCanvas as helloClearCanvas} from "./hello";

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

var canvasContainer = document.getElementById("canvasContainer");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var activeClearFunc;

$(document).foundation();
$(document).ready(() => {
    $("[data-canvas-function]").click(function(){
        if(activeClearFunc){
            activeClearFunc(canvas, canvasContainer);
        }

        console.log("Load " + $(this).attr("data-canvas-function") +  "!");

        if($(this).attr("data-canvas-function") === "spooky"){
            helloRedrawCanvas(canvas, canvasContainer);
            drawSkeles();
            window.addEventListener('resize', function(){helloRedrawCanvas(canvas, canvasContainer)}, false);
            activeClearFunc = helloClearCanvas;
        }
    });
});