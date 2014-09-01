var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var clearCanvas = function(){
	canvas.width = canvas.width;
};

var selected = false;
var startingPoint;
var diff = {};

var rectComponent = function(topX,topY,width,height,ctx){
	this.topX = topX,
	this.topY = topY,
	this.width = width,
	this.height = height,
	this.ctx = ctx,
	//document.addEventListner("mousedown",function(evt){
	//	pos = getMousePosition(canvas,evt);
	//	console.log(this.contain(pos.x,pos.y));
	//})
};

rectComponent.prototype.render = function(){
	this.ctx.fillRect(this.topX,this.topY,this.width,this.height);
};

rectComponent.prototype.moveUp = function(x){
	clearCanvas();
	this.topX += x;
	this.render();
};

rectComponent.prototype.contain = function(x,y){
	return this.topX < x && x < this.topX+this.height && this.topY < y && y < this.topY+this.width;
};


var getMousePosition = function(canvas,evt){
	var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
};

var mousedownHandler = function(e){
	var pos = getMousePosition(canvas,e);
	diff.x = r1.topX - pos.x;
	diff.y = r1.topY - pos.y;

	if(r1.contain(pos.x,pos.y)){
		selected=true;
	};
};

var mousedragHandler = function(e){
	var pos = getMousePosition(canvas,e);
	if(selected){
		r1.topX = pos.x + diff.x;
		r1.topY = pos.y + diff.y;
		clearCanvas();
		r1.render();
	};
};

var mouseupHandler = function(e){
	selected = false;
	startingPoint = null;
};

canvas.addEventListener("mousedown",mousedownHandler,false);
canvas.addEventListener("mousemove",mousedragHandler,false);
canvas.addEventListener("mouseup",mouseupHandler,false);
