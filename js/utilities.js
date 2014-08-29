var clearCanvas = function(){canvas.width = canvas.width};

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
  var editor = document.querySelector("#editor");
  var obj = {};
  if(editor){
    var inputs = document.querySelectorAll("input");
    for(var i=0;i<inputs.length;i++){
      var val = optionNumber(inputs[i]["value"]);
      obj[inputs[i]["id"]] = val;
    };
  };
  return obj;
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
