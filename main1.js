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
	var div = createElement("div",{id:"panel"});
	var addDataButton = createElement("button",{id:"addData"},"Add Data");
	addDataButton.onclick = handlers.addDataHandler;
	var addDefaultButton = createElement("button",{id:"addDefault"},"Add Diagram");
	addDefaultButton.onclick = handlers.addDefaultHandler;
	var saveButton = createElement("button",{id:"save"},"Save as JSON");
	saveButton.onclick = handlers.saveHandler;
	var inputFile = createElement("input",{id:"file",type:"file"});
	var uploadButton = createElement("button",{id:"upload"},"Upload");
	uploadButton.onclick = handlers.uploadHandler;
	div.appendChild(addDefaultButton);
	div.appendChild(addDataButton);
	div.appendChild(saveButton);
	div.appendChild(inputFile);
	div.appendChild(uploadButton);
	column1.appendChild(div);
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
	var type = component.type;
	renderFunctions[type](component,ctx);
};

var renderFunctions = {
	triangle  : function(component,ctx){
		ctx.fillStyle = component.color;
		ctx.beginPath();
		ctx.moveTo(component.topX,component.topY+component.height);
		ctx.lineTo(component.topX + component.width/2,component.topY);
		ctx.lineTo(component.topX + component.width,component.topY+component.height);
		ctx.closePath();
		ctx.fill();
	},

	rectangle : function(component,ctx){
		ctx.fillStyle = component.color;
		ctx.fillRect(component.topX,component.topY,component.width,component.height);
	},

	circle : function(component,ctx){

			var centerX = component.topX + component.width/2;
			var centerY = component.topY + component.height/2;
			var radius = Math.min(component.width/2,component.height/2);
			ctx.fillStyle = component.color;
			ctx.beginPath();
			ctx.arc(centerX,centerY,radius,0,2*Math.PI,false);
			ctx.closePath();
			ctx.fill();
	},

	pictogram : function(component,ctx){
		var TopX = component.topX;
		var TopY = component.topY;
		var dataList = component.data;
		var width = component.width;
		var height = component.height;
		var numOfItem = dataList.length;
		var value = Math.max.apply(null, map.call(dataList,function(d){
			return d.value;}));
		var padding = Math.min(width/numOfItem,height/value);
		var fontSize = (width/20) | 0;
		ctx.beginPath();
		ctx.lineWidth = "2px";
		ctx.moveTo(TopX-40,TopY+height);
		ctx.lineTo(TopX+width,TopY+height);
		ctx.stroke();

		for(var i=0;i<numOfItem;i++){
			var data = dataList[i];
			//var value = data["value"];
			var icon = data.icon;
			var color = data.color;
			for(var j=0;j<data.value;j++){
				var renderObj = {
					type : icon,
					color: color,
					topX : TopX + i * width/numOfItem,
					topY : (TopY+height) - (j+1) * height/value,
					width : (width/numOfItem) * 0.8,
					height :(height/value) * 0.8,
				};
				render(renderObj,ctx);
			}
			ctx.font = fontSize + " Georgia";
			ctx.fillText(data.id,
									TopX + i * width/numOfItem + 0.5*((width/numOfItem) * 0.8) - data.id.length*(width/100),
									TopY + height + 20);
		}
	},
};
