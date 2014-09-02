// All the utilities functions that used throught out the project.

var map = Array.prototype.map;

// Just a convenient function to create DOM elements.
// All the attributes can be passed in using an object
// so that no need to setAttribute independently.
var createElement = function(tag,attributes,value){
  var el = document.createElement(tag);
  for(var attr in attributes){
    el.setAttribute(attr,attributes[attr]);
  }
  if(value){
    var txt = document.createTextNode(value);
    el.appendChild(txt);
  }
  return el;
};

// A hack to clear the whole canvas
var clearCanvas = function(){
  canvas.width = canvas.width;
  };

// Everything about the canvas
// is stored in the canvasState object.
// Clearing the componentList and
// selectedComponent clear all the
// pictograms on the canvas now.
var clearData = function(){
  canvasState.componentList = [];
  canvasState.selectedComponent = [];
  clearCanvas();
};

// Get the mouse position on the canvas
var getMousePosition = function(canvas,evt){
  var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
};

// To check whether the a point
// is inside a pictogram.
// Useful to determine which pictogram
// is we now clicking on.
var contain =function(component,x,y){
  var q = component.topX < x;
  var w = x < component.topX + component.width;
  var z = component.topY < y;
  var v = y < component.topY + component.height;
  return  q && w && z && v;
};

// To get the data inside the editor.
// This is used to update the canvas
// once we change something inside the editor.
var getEditorData = function(){
  var dataObj = {};
  var aestheticPart = document.querySelectorAll("#editor>div:not(#data) input");
  for(var i=0;i<aestheticPart.length;i++){
    var id = aestheticPart[i].id;
    var value = aestheticPart[i].value;
    dataObj[id] = optionNumber(value);
  }
  var dataPart = document.querySelectorAll("#editor>div#data form");
  var data = map.call(dataPart,function(x){
    var inputs = x.querySelectorAll("input,select");
    var obj = {};
    for(var i=0;i<inputs.length;i++){
      var id = inputs[i].id;
      var value = inputs[i].value;
      obj[id] = optionNumber(value);
    }
    return obj;
  });
  if(data.length>0){
    dataObj.data = data;
  }

  return dataObj;
};

// render all the components on the canvas.
// componentList contains all the component,
// so we render each of them sequentially.
// render is just a fucntion that know
// how to delegate the rendering job
// to appropriate function.
var renderCanvas = function(){
  clearCanvas();
  canvasState.componentList.forEach(function(component){
    render(component,context);
  });
};

// When getting data from the input field
// everything is just string
// so this is a convenient hack
// to turn the number into the number.
var optionNumber = function(x){
  if(parseFloat(x)){
    return parseFloat(x);
  }else{
    return x;
  }
};

// Turn the color hex code into RGB format.
var hexToRgb = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

// Save the data as file.
var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

// TODO: implement upload to pinterest.
var createPinterestLink = function(){
  var dataURL = canvas.toDataURL();
  var linkURL = "www.pinterest.com/pin/create/button/"+
                "?url=http%3A%2F%2Fwww.flickr.com%2Fphotos%2Fkentbrew%2F6851755809%2F"+
                "&media="+dataURL+
                "&description=Next%20stop%3A%20Pinterest" +
                'data-pin-do="buttonPin" data-pin-config="none"';
  var link = createElement("a",{href:linkURL});
  var img = createElement("img",{src:"//assets.pinterest.com/images/pidgets/pin_it_button.png"});
  link.appendChild(img);
  return link;
};
