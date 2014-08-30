// To get the reference of the canvas and the contex
window.onload = function(){
	canvasSetup();
	editorSetup();
};

var canvasSetup = function(){
	column2 = document.querySelector("#column2");
	canvas = createElement("canvas", {height:500,width:500,id:"myCanvas"});
	context = canvas.getContext("2d");
	column2.appendChild(canvas);
	canvas.addEventListener("mousedown",handlers.mouseDownHandler,false);
	canvas.addEventListener("mouseup",handlers.mouseUpHandler,false);
	canvas.addEventListener("mousemove",handlers.mouseMoveHandler,false);
};

var editorSetup = function(){
	column1 = document.querySelector("#column1");
	var button = createElement("button",{id:"button"},"Add");
	button.onclick = handlers.clickHandler;
	column1.appendChild(button);
};

//var canvas = document.getElementById("myCanvas");
//var context = canvas.getContext("2d");

// The main idea here is to represent
// pictograms as data structure
// and we write render functions
// to display them on a canvas.
// Whenever the data structure changes,
// the canvas is rerendered.

// canvasState hold the global state
// of the whole canvas.
// It can be persisted and
// the whole canvas can be
// reconstructed from it.
// each pictogram is called a component here
// and the componentList hold all the
// pictograms in the canvas
// and everyone of them is independent from each other
var canvasState = {
	 componentList      : [],
	 selectedComponents : [],
	 selected           : false,
	 diff               : {}
};

// Every component has a type and
// render takes a component and delegates
// the tast to another function that
// knows how to render this type of components
var render = function(component,ctx){
	var type = component["type"];
	renderFunctions[type](component,ctx);
};

var renderFunctions = {
	rectangle : function(component,ctx){
		ctx.strokeStyle = '#ff0000'
		ctx.strokeRect(component.topX,component.topY,component.width,component.height);
	},

	pictogram : function(component,ctx){
		ctx.fillRect(component.topX,component.topY,component.width,component.height);
	},

	row : function(component,ctx){
		for(var i=0;i<component.value;i++){
			ctx.globalAlpha = 0.5;
			ctx.fillStyle = component.color;
			ctx.fillRect(component.topX,component.topY+i*20,10,10);
		};
		ctx.globalAlpha = 1;
	},
};
