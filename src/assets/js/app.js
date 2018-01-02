import $ from 'jquery';
import whatInput from 'what-input';
import url from 'url';
import {redrawCanvas as helloRedrawCanvas, drawBackground, clearCanvas as helloClearCanvas, preLoadImages} from "./hello";
import {redrawCanvas as clockRedrawCanvas, changeBackgroundColor ,clearCanvas as clockClearCanvas} from "./clock";

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

const christmasBackgrounds = ['./assets/img/christmas/buddy.gif',
                              './assets/img/christmas/makinItRain.gif',
                              './assets/img/christmas/trippy_small.gif',
                              './assets/img/christmas/badKitty.gif',
                              './assets/img/christmas/goodKitty.gif'];
// const christmasBackgrounds = ['./assets/img/christmas/buddy.gif'];
var WebFont = require('webfontloader');

var canvasContainer = document.getElementById("canvasContainer");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvasLoading = true;
var activeActivity;
var activeClearFunc;
var activeRedrawFunc;
var activeIntervalFunc;

var christmasBackgroundIndex = -1;

$(document).foundation();
$(document).ready(() => {
    function drawChristmas(){
        var christmasBroadcast = "HO HO";
        
        if(christmasBackgroundIndex === -1){
            christmasBackgroundIndex = Math.floor(Math.random()*christmasBackgrounds.length);
        }
        else christmasBackgroundIndex = (christmasBackgroundIndex + 1)%christmasBackgrounds.length;
        var drawBackGroundImage = christmasBackgrounds[christmasBackgroundIndex];
        if(drawBackGroundImage.toString().includes("buddy")){
            christmasBroadcast = "SANTA";
        }

        if(activeRedrawFunc){
            helloClearCanvas(canvas, canvasContainer, activeRedrawFunc, activeIntervalFunc);
        }

        drawBackground(drawBackGroundImage);
        helloRedrawCanvas(canvas, canvasContainer, christmasBroadcast, "christmas");
        activeRedrawFunc = function(){helloRedrawCanvas(canvas, canvasContainer, christmasBroadcast, "christmas")};
        activeIntervalFunc = setInterval(activeRedrawFunc, 300);
        window.addEventListener('resize', activeRedrawFunc, false);

        activeClearFunc = helloClearCanvas;
    }

    function prepareBroadcast(){
        var currentPathParams = (url.parse(location.href, true)).query;
        
        if(currentPathParams.broadcast){
            console.log("Current path: " + currentPathParams.broadcast);
            drawBroadcast(currentPathParams.broadcast);
        }
        else{
            console.log("No path specified");
            $("#broadcastContainer").show();
        }

        activeClearFunc = helloClearCanvas;
    }

    function drawBroadcast(userBroadcast){
        helloRedrawCanvas(canvas, canvasContainer, userBroadcast, "broadcast");
        activeRedrawFunc = function(){helloRedrawCanvas(canvas, canvasContainer, userBroadcast, "broadcast")};
        window.addEventListener('resize', activeRedrawFunc, false);
        
        activeClearFunc = helloClearCanvas;
    }

    //
    // Default Behavior
    //
    var currentPath = url.parse(location.href, true);
    if(currentPath.query.broadcast){
        prepareBroadcast();
    }
    else{  
        WebFont.load({
            custom: {
                families: ['Bad Script'], 
                urls: ['./assets/css/app.css']
            },
            active:function (){
                console.log("DONE LOADING FONTS");
                doneLoadingFont();
            }
        });
    
        helloRedrawCanvas(canvas, canvasContainer, "LOADING...", "loading");
    }

    //load images
    function doneLoadingFont(){
        preLoadImages(christmasBackgrounds, doneLoading);
        // doneLoading();
    }
    
    function doneLoading(){
        helloClearCanvas(canvas, canvasContainer, null);
        activeActivity = "christmas";
        drawChristmas();

        //
        //Navigation
        //
        $("[data-canvas-function]").click(function(){

            if(activeClearFunc){
                activeClearFunc(canvas, canvasContainer, activeRedrawFunc, activeIntervalFunc);
                activeActivity=null;
            }

            console.log("Load " + $(this).attr("data-canvas-function") +  "!");

            if($(this).attr("data-canvas-function") === "spooky"){
                helloRedrawCanvas(canvas, canvasContainer, "SPOOKY", "default");
                drawBackground("./assets/img/skeles.gif");

                activeRedrawFunc = function(){helloRedrawCanvas(canvas, canvasContainer, "SPOOKY", "default")};
                window.addEventListener('resize', activeRedrawFunc, false);

                activeClearFunc = helloClearCanvas;
            }

            else if($(this).attr("data-canvas-function") === "christmas"){
                activeActivity = "christmas";
                drawChristmas();
            }
            
            else if($(this).attr("data-canvas-function") === "clock"){
                changeBackgroundColor();
                clockRedrawCanvas(canvas, canvasContainer);

                activeRedrawFunc = function(){clockRedrawCanvas(canvas, canvasContainer)};
                window.addEventListener('resize', activeRedrawFunc, false);
                activeIntervalFunc = setInterval(activeRedrawFunc, 1000);

                activeClearFunc = clockClearCanvas;
            }

            else if($(this).attr("data-canvas-function") === "broadcast"){
                activeActivity = "broadcast";
                prepareBroadcast();
            }
        });

        //
        // Interactivity
        //
        $("#canvasContainer").click(function(){
            if(activeActivity === "christmas"){
                drawChristmas();
            }
        });

        $("#broadcastInput").keypress(function(event) {
            //react to Enter Key
            if(event.key === "Enter"){
                var currentPath = url.parse(location.href, true);
                currentPath.query.broadcast = $("#broadcastInput").val();
                history.replaceState(null, "User Entry", url.format(currentPath));
                
                helloClearCanvas(canvas, canvasContainer, activeRedrawFunc, activeIntervalFunc);
                prepareBroadcast();
            }
        });

        // $("#navExpand").click(function(){
        //     $('#navIcon').toggleClass("mdi-arrow-expand-left");
        //     $('#navIcon').toggleClass("mdi-arrow-expand-right");
        // });
    }
});