// a large object that contains the event handlers.

var handlers = {
  // The main purpose of this is to determine
  // which pictogram is we clicking right now
  // so that we can manipulate the pictogram
  // independently.
  mouseDownHandler : function(e){
    canvasState.componentList.forEach(function(component){
      var mouseDownPosition = getMousePosition(canvas,e);
      var hit = contain(component,mouseDownPosition.x,mouseDownPosition.y);
      if(hit){
        canvasState.diff.x = component.topX - mouseDownPosition.x;
        canvasState.diff.y = component.topY - mouseDownPosition.y;
        canvasState.selectedComponents.pop();
        canvasState.selectedComponents.push(component);
        canvasState.selected = true;
        clearEditor();
        attachEditor(component);
      }
    });
  },

  mouseMoveHandler : function(e){
    // This is to handle the drag and move.
    var pos = getMousePosition(canvas,e);
    if(canvasState.selected){
      var component = canvasState.selectedComponents[0];
      component.topX = pos.x + canvasState.diff.x;
      component.topY = pos.y + canvasState.diff.y;
      renderCanvas();
      clearEditor();
      attachEditor(component);
    }
  },

  mouseUpHandler : function(e){
    // The selected attribute
    // indicate whether now we
    // are cllicking on some pictogram.
    canvasState.selected = false;
  },

  keyPressHandler : function(e){
    // Press enter key to
    // refresh the whole canvas
    if(e.keyCode == 13){
      var newValue = getEditorData();
      var component = canvasState.selectedComponents[0];
      for(var attr in component){
        component[attr] = newValue[attr];
      }
      renderCanvas();
    }
  },

  addDataHandler :function(e){
    // Add more item to the
    // selected pictogram.
    var component = canvasState.selectedComponents[0];
    component.data.push({id:"new",value:1,color:"black",icon:"rectangle"});
    clearCanvas();
    renderCanvas();
    clearEditor();
    attachEditor(component);
  },

  addDefaultHandler : function(e){
    // Add a pictogram with one item
    // on the canvas.
    var component = {
      type:"pictogram",
      height:200,
      width:200,
      topX:0,
      topY:0,
      data:[
      {id:"new",value:1,color:"black",icon:"rectangle"},
      ]
    };
    canvasState.componentList.push(component);
    renderCanvas();
  },

  saveHandler : function(e){
    // save the canvas into file.
    saveData(canvasState,"canvas.json");
  },

  uploadHandler : function(e){
    // upload the previously saved canvas
    var fileSelected = document.querySelector("#file").files[0];
    var reader = new FileReader();
    reader.readAsText(fileSelected);
    reader.onload = function(){
      var state = JSON.parse(reader.result);
      canvasState = state;
      renderCanvas();
    };

  },
};
