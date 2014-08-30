var meta = {
  data: "list",
  height: "number",
  width: "number",
  topX: "number",
  topY: "number",
  type: "string",
  id:"string",
  value:"number",
  color:"color",
  icon:"string",
};

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
var editors = {
  string : function(attr,obj){
    var div = labelize(attr,obj);
    var value = obj[attr];
    var input = createElement("input",{value:value,id:attr});
    div.appendChild(input);
    return div;
  },
  number : function(attr,obj){
    var div = labelize(attr,obj);
    var value = obj[attr];
    var input = createElement("input",{value:value,id:attr,type:"number"});
    div.appendChild(input);
    return div;
  },
  color : function(attr,obj){
    var div = labelize(attr,obj);
    var value = obj[attr];
    var input = createElement("input",{value:value,id:attr,type:"color"});
    div.appendChild(input);
    return div;
  },
  list : function(attr,obj){
    var div = labelize(attr,obj);
    div.setAttribute("id","data");
    div.appendChild(createElement("br"));
    var list = obj[attr];
    for(var x in list){
      var f = transform(list[x]);
      f.setAttribute("id","data");
      div.appendChild(f);
    };
    return div;
  },
};

var labelize = function(attr,obj){
  var div = createElement("div");
  var label = createElement("label",{id:attr},attr);
  div.appendChild(label);
  return div;
};

var transform = function(obj){
  var form = createElement("form",{id:"editor"});
  for(var attr in obj){
    var typeOfAttr = meta[attr];
    var div = editors[typeOfAttr](attr,obj);
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
