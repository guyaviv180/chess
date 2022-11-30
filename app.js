//site elements
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext('2d');

// game elements
let mouseX = 0;
let mouseY = 0;
let length = canvas.height / 8;; // cursor length
let turn = "white";
let flag = false;


/* --------------------------- declare game pieces -------------------------- */

let white = new Player("white");
let black = new Player("black");

/* -------------------------- generate white pieces ------------------------- */
for (let i = 0; i < 8; i++){
    white.pieces.push(new Pawn((i * length), (6 * length), "white"));
}
let WR1 = new Rook((0 * length), (7 * length), "white");
white.pieces.push(WR1);

let WN1 = new knight((1 * length), (7 * length), "white");
white.pieces.push(WN1);

let WB1 = new Bishop((2 * length), (7 * length), "white");
white.pieces.push(WB1);

let WQ = new Queen((3 * length), (7 * length), "white")
white.pieces.push(WQ);

let WK = new King((4 * length), (7 * length), "white")
white.pieces.push(WK);

let WB2 = new Bishop((5 * length), (7 * length), "white");
white.pieces.push(WB2);

let WN2 = new knight((6 * length), (7 * length), "white");
white.pieces.push(WN2);

let WR2 = new Rook((7 * length), (7 * length), "white");
white.pieces.push(WR2);

/* -------------------------- generate black pieces ------------------------- */
for (let i = 0; i < 8; i++){
    black.pieces.push(new Pawn((i * length), (1 * length), "black"));
}

let BR1 = new Rook((0 * length), (0 * length), "black");
black.pieces.push(BR1);

let BN1 = new knight((1 * length), (0 * length), "black");
black.pieces.push(BN1);

let BB1 = new Bishop((2 * length), (0 * length), "black");
black.pieces.push(BB1);

let BQ = new Queen((3 * length), (0 * length), "black")
black.pieces.push(BQ);

let BK = new King((4 * length), (0 * length), "black")
black.pieces.push(BK);

let BB2 = new Bishop((5 * length), (0 * length), "black");
black.pieces.push(BB2);

let BN2 = new knight((6 * length), (0 * length), "black");
black.pieces.push(BN2);

let BR2 = new Rook((7 * length), (0 * length), "black");
black.pieces.push(BR2);

let piece;
let board = [
    [BR1, BN1, BB1, BQ, BK, BB2, BN2, BR2],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [WR1, WN1, WB1, WQ, WK, WB2, WN2, WR2]
];

/* ------------------------- insert pieces into board ------------------------ */
for (let i = 0; i < 8; i++){ // insert pawns into board
    board[6][i] = white.pieces[i];
}

for (let i = 0; i < 8; i++){ // insert pawns into board
    board[1][i] = black.pieces[i];
}

white.findAllMoves();
black.findAllMoves();



/* ----------------------------- update function ---------------------------- */
setInterval(function(){
    draw();
    followMouse();
}, 1000/200)
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);

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

/* --------------------------- mouse down function -------------------------- */
function onMouseDown(){ // when mouse is down, and the mouse is over the piece it removes the piece from the board
    let cell = board[Math.floor(mouseY / length)][Math.floor(mouseX / length)]; // contents of the cell
    if(cell == 0 || cell.color != turn) return; // checks if user clickd on a a piece
    piece = cell; // impports cell contents to cuurent piece variable
    if(mouseX > piece.x && mouseX < piece.x + length  && mouseY > piece.y && mouseY < piece.y + length){
        flag = true;
    }
}

/* ---------------------------- mouse up function --------------------------- */
function onMouseUp(){// when mouse is up the piece stops following it and picks piece final location
  if(flag){ 
    flag = false;
    // legal move
    for(var i = 0; i < piece.possibleMoves.length; i++){
        if(Math.floor(mouseY / length) == piece.possibleMoves[i][0] && Math.floor(mouseX / length) == piece.possibleMoves[i][1]){ // checks if requested move is equal to a possible move
            move();
            return;
        }
    }
    for(var i = 0; i < piece.possibleCaptures.length; i++){  // checks if requested capture is equal to a possible capture
        if(Math.floor(mouseY / length) == piece.possibleCaptures[i][0] && Math.floor(mouseX / length) == piece.possibleCaptures[i][1]){
            move()
            return;
        }
    }

    // illegal move
    piece.y = (piece.position[0] * length) ; // places piece at former position;
    piece.x = (piece.position[1] * length);
  }
}

function move(){
    piece.move(Math.floor(mouseX / length), Math.floor(mouseY / length))
    if (!piece.moved) piece.moved = true;
    centerPiece();

    if(turn == "white"){
        turn = "black";
        black.removeIllegalMoves();
        black.checkCastle();
    }
    else{
        turn = "white";
        white.removeIllegalMoves();
        white.checkCastle();
    }
    piece = null;
}

function centerPiece(){
    piece.x = (Math.floor(mouseX / length) * length);
    piece.y = (Math.floor(mouseY / length) * length);
}

function checkMove(reqY, reqX){
    if(reqX < 0 || reqX > 7 || reqY < 0 || reqY > 7) return false;
    let cell = board[reqY][reqX];
    if(cell != 0)
        return false;

    return true;
}

function checkCapture(reqY, reqX, color){
    if(reqX < 0 || reqX > 7 || reqY < 0 || reqY > 7) return false;
    let cell = board[reqY][reqX];
    if(cell == 0 || cell.color == color) return false;

    return true;
}

function flipBoard(){
    context.scale(-1, 1);
}

function draw(){
    drawBoard();
    if(piece != null){
        highlightPossibleMoves();
    }

    for(var i = 0; i < white.pieces.length; i++){
        if(white.pieces[i] != null && white.pieces[i].alive == true){
            drawImage(context, white.pieces[i].image, white.pieces[i].x, white.pieces[i].y, length, length);
        }
    }

    for(var i = 0; i < black.pieces.length; i++){
        if(black.pieces[i] != null && black.pieces[i].alive == true){
            drawImage(context, black.pieces[i].image, black.pieces[i].x, black.pieces[i].y, length, length);
        }
    }
}

/* ---------------------------- draws game board ---------------------------- */
function drawBoard(){
    let green = "rgb(118,150,86)";
    let white = "rgb(238,238,210)";

    drawRectangle(context, 0, 0, canvas.width, canvas.height, white);
    for(var i = 0; i < 7; i+= 2){
      for (let j = 0; j < 7; j+= 2) {
        drawRectangle(context, (j + 1) * length, i * length, length, length, green, 1, green);
        drawRectangle(context, j * length, (i + 1) * length, length, length, green, 1, green);
      }
    }
}

/* ----------- highlights the next possible moves and or captures ----------- */
function highlightPossibleMoves(){
    let green = "rgb(118,150,86)";
    let white = "rgb(238,238,210)";
    let highGreen = "rgb(106,135,77)";
    let highWhite = "rgb(214,214,189)";

    let posY = 0;
    let posX = 0;

    for(var i = 0; i < piece.possibleMoves.length; i++){
        posY = piece.possibleMoves[i][0];
        posX = piece.possibleMoves[i][1];
        if(posY % 2 == 0){
            if(posX % 2 == 0){
                drawArc((posX * length) + (length / 2), (posY * length) + (length / 2), 15, highWhite, 0, highWhite);
            }
            else{
                drawArc((posX * length) + (length / 2), (posY * length) + (length / 2), 15, highGreen, 0, highGreen);
            }
        }
        else{
            if(posX % 2 == 0){
                drawArc((posX * length) + (length / 2), (posY * length) + (length / 2), 15, highGreen, 0, highGreen);
            }
            else{
                drawArc((posX * length) + (length / 2), (posY * length) + (length / 2), 15, highWhite, 0, highWhite);
            }
        }
        
    }
    
    for(var i = 0; i < piece.possibleCaptures.length; i++){
        posY = piece.possibleCaptures[i][0];
        posX = piece.possibleCaptures[i][1];
        if(posY % 2 == 0){
            if(posX % 2 == 0){
                drawArc((posX * length) + (length / 2), (posY * length) + (length / 2), (length / 2), highWhite, 0, highWhite);
                drawArc((posX * length) + (length / 2), (piece.possibleCaptures[i][0] * length) + (length / 2), (length / 2) - 10, white, 0, white);
            }
            else{
                drawArc((posX * length) + (length / 2), (posY * length) + (length / 2), (length / 2), highGreen, 0, highGreen);
                drawArc((posX * length) + (length / 2), (posY * length) + (length / 2), (length / 2) - 10, green, 0, green);
            }
        }
        else{
            if(piece.possibleCaptures[i][1] % 2 == 0){
                drawArc((posX * length) + (length / 2), (posY * length) + (length / 2), (length / 2), highGreen, 0, highGreen);
                drawArc((posX * length) + (length / 2), (posY * length) + (length / 2), (length / 2) - 10, green, 0, green);
            }
            else{
                drawArc((posX * length) + (length / 2), (posY * length) + (length / 2), (length / 2), highWhite, 0, highWhite);
                drawArc((posX * length) + (length / 2), (posY * length) + (length / 2), (length / 2) - 10, white, 0, white);
            }
        }
        
    }
}