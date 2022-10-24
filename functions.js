function drawBoard(){
    drawRectangle(context, 0, 0, canvas.width, canvas.height, "rgb(238,238,210)");
    for(var i = 0; i < 7; i+= 2){
      for (let j = 0; j < 7; j+= 2) {
        drawRectangle(context, (j + 1) * unit, i * unit, unit, unit, "rgb(118,150,86)", 1, "rgb(118,150,86)");
        drawRectangle(context, j * unit, (i + 1) * unit, unit, unit, "rgb(118,150,86)", 1, "rgb(118,150,86)");
      }
    }
}

function onMouseMove(event){ // follows the mouse
    mouseX = event.x;
    mouseY = event.y;
}

function followMouse(){
  if(flag){
    piece.x = mouseX - (length / 2);
    piece.y = mouseY - (length / 2);
  }
}