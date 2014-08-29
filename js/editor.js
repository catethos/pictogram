//clear the editor area
var clearEditor = function(){
  var col = document.querySelector("#column1");
  var editor = document.querySelector("#editor");
  if(editor){
    col.removeChild(editor);
  };
};

// Given a data structure that represent
// partial dom trees
// return the html dom
var transform = function(obj){
  var form = document.createElement("form");
  form.setAttribute("id","editor");
  for(attr in obj){
    var label = document.createElement("label");
    var labelName = document.createTextNode(attr);
    label.appendChild(labelName);
    label.setAttribute("id",attr);
    var input = document.createElement("input");
    var inputValue = obj[attr];
    input.setAttribute("value",inputValue);
    input.setAttribute("id",attr);
    if(parseFloat(inputValue)){
      input.setAttribute("type","number");
    };
    var div = document.createElement("div");
    div.appendChild(label);
    div.appendChild(input);
    form.appendChild(div);
  };
  return form;
};

var attachEditor = function(component){
  var form = transform(component);
  var col = document.querySelector("#column1");
  col.appendChild(form);
  form.onkeypress = handlers.keyPressHandler;
}
