var handlers = {
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
    var pos = getMousePosition(canvas,e);
    if(canvasState.selected){
      var component = canvasState.selectedComponents[0];
      //context.clearRect(component.topX,
      //      component.topY,
      //      component.width,
      //      component.height)
      component.topX = pos.x + canvasState.diff.x;
      component.topY = pos.y + canvasState.diff.y;
      //render(component,context);
      renderCanvas();
      clearEditor();
      attachEditor(component);
    }
  },

  mouseUpHandler : function(e){
    canvasState.selected = false;
  },

  keyPressHandler : function(e){
    if(e.keyCode == 13){
      var newValue = getEditorData();
      var component = canvasState.selectedComponents[0];
      for(var attr in component){
        component[attr] = newValue[attr];
      }
      renderCanvas();
    }
  },

  clickHandler : function(e){
    var obj = {
      type:"rectangle",
      topX:0,
      topY:0,
      height:50,
      width:50
    };
    canvasState.componentList.push(obj);
    renderCanvas();
  },

  addDataHandler :function(e){
    var component = canvasState.selectedComponents[0];
    component.data.push({id:"new",value:1,color:"black",icon:"rectangle"});
    clearCanvas();
    renderCanvas();
    clearEditor();
    attachEditor(component);
  },

  addDefaultHandler : function(e){
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
    saveData(canvasState,"canvas.json");
  },

  uploadHandler : function(e){
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
