var map = Array.prototype.map;

var createElement = function(tag,attributes,value){
  var el = document.createElement(tag);
  for(var attr in attributes){
    el.setAttribute(attr,attributes[attr]);
  };
  if(value){
    var txt = document.createTextNode(value);
    el.appendChild(txt);
  }
  return el;
};

var clearCanvas = function(){canvas.width = canvas.width};

var clearData = function(){
  canvasState.componentList = [];
  canvasState.selectedComponent = [];
  clearCanvas;
};

var getMousePosition = function(canvas,evt){
  var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
};

var contain =function(component,x,y){
  var q = component.topX < x;
  var w = x < component.topX + component.width;
  var z = component.topY < y;
  var v = y < component.topY + component.height;
  return  q && w && z && v;
};

var getEditorData = function(){
  var dataObj = {};
  var aestheticPart = document.querySelectorAll("#editor>div:not(#data) input");
  for(var i=0;i<aestheticPart.length;i++){
    var id = aestheticPart[i].id;
    var value = aestheticPart[i].value;
    dataObj[id] = value;
  };
  var dataPart = document.querySelectorAll("#editor>div#data form");
  var data = map.call(dataPart,function(x){
    var inputs = x.querySelectorAll("input");
    var obj = {};
    for(var i=0;i<inputs.length;i++){
      var id = inputs[i].id;
      var value = inputs[i].value;
      obj[id] = value;
    };
    return obj;
  });
  dataObj["data"] = data;
  return dataObj;
};

var renderCanvas = function(){
  clearCanvas();
  canvasState.componentList.forEach(function(component){
    render(component,context);
  })
};

var optionNumber = function(x){
  if(parseFloat(x)){
    return parseFloat(x);
  }else{
    return x;
  }
}
