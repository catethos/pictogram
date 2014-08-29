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
      };
    });
  },

  mouseMoveHandler : function(e){
    var pos = getMousePosition(canvas,e);
    if(canvasState.selected){
      var component = canvasState.selectedComponents[0];
      context.clearRect(component.topX,
            component.topY,
            component.width,
            component.height)
      component.topX = pos.x + canvasState.diff.x;
      component.topY = pos.y + canvasState.diff.y;
      render(component,context);
      clearEditor();
      attachEditor(component);
    };
  },

  mouseUpHandler : function(e){
    canvasState.selected = false;
  },

  keyPressHandler : function(e){
    if(e.keyCode == 13){
      var newValue = getEditorData();
      var component = canvasState.selectedComponents[0];
      for(attr in component){
        component[attr] = newValue[attr];
      };
      renderCanvas();
    }
  },

}
