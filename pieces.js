class Piece{
    constructor(x, y, color){
        this.alive = true;
        this.x = x; // piece x coordinate
        this.y = y; // piece y coordinate
        this.color = color;
        this.image;
        this.type;
        this.position = [Math.floor(this.y / length), Math.floor(this.x / length)]
        this.possibleMoves = [];
        this.possibleCaptures = [];
        this.illegalMoves = [];
        this.illegalCaptures = [];
    }

    move(x, y){
        board[this.position[0]][this.position[1]] = 0; // erases piece from board
        board[y][x] = this; // places piece into board in new position
        this.position = [y, x]; // changes piece position property to new position
        centerPiece();
        black.findAllMoves();
        white.findAllMoves();
    }

    resetMoves(){
        this.possibleMoves = [];
        this.possibleCaptures = [];
    }

    resetIllegalMoves(){
        this.illegalMoves = [];
        this.illegalCaptures = [];
    }

    findPossibleMoves(){}
}

class Pawn extends Piece{
    constructor(x, y, color){
        super(x, y, color);
        this.type = "Pawn";
        if(this.color == "white"){
            this.image = wpImg;
        }
        else{
            this.image = bpImg;
        }
    }

    findPossibleMoves(){
        let up = 0; // key word meaning to the right or forwards regardless of direction or color
        if(this.color == "white") 
            up = -1;
        else up = 1;

        let posY = this.position[0];
        let posX = this.position[1];

        if(checkMove(posY + up, posX)){
            this.possibleMoves.push([posY + up, posX]); // move forward once
            if(checkMove(posY + (up * 2), posX) && this.color == "white" && posY == 6 || this.color == "black" && posY == 1){
                this.possibleMoves.push([posY + (up * 2), posX]) // move forward twice
            }
        }
      
        if(checkCapture(posY + up, posX + up, this.color)){
            this.possibleCaptures.push([(posY + up), (posX + up)]); // capture diagonally right
        }

        if(checkCapture(posY + up, posX - up, this.color)){
            this.possibleCaptures.push([(posY + up), (posX - up)]); // capture diagonally left
        }
    }
}

class Bishop extends Piece{
    constructor(x, y, color){
        super(x, y, color);
        this.type = "Bishop";
        if(this.color == "white"){
            this.image = wbImg;
        }
        else{
            this.image = bbImg;
        }
    }

    findPossibleMoves(){
        let posY = this.position[0];
        let posX = this.position[1];

        let count = 1;

        /* ------------------------------------ 1 ----------------------------------- */
        while(checkMove(posY + count, posX + count)){
            this.possibleMoves.push([posY + count, posX + count]);
            count ++;
        }
        if(checkCapture(posY + count, posX + count, this.color)){
            this.possibleCaptures.push([posY + count, posX + count]);
        }

        count = 1;

        /* ------------------------------------ 2 ----------------------------------- */
        while(checkMove(posY - count, posX + count)){
            this.possibleMoves.push([posY - count, posX + count]);
            count ++;
        }
        if(checkCapture(posY - count, posX + count, this.color)){
            this.possibleCaptures.push([posY - count, posX + count]);
        }

        count = 1;

        /* ------------------------------------ 3 ----------------------------------- */
        while(checkMove(posY + count, posX - count)){
            this.possibleMoves.push([posY + count, posX - count]);
            count ++;
        }
        if(checkCapture(posY + count, posX - count, this.color)){
            this.possibleCaptures.push([posY + count, posX - count]);
        }

        count = 1;

        /* ------------------------------------ 4 ----------------------------------- */
        while(checkMove(posY - count, posX - count)){
            this.possibleMoves.push([posY - count, posX - count]);
            count ++;
        }
        if(checkCapture(posY - count, posX - count, this.color)){
            this.possibleCaptures.push([posY - count, posX - count]);
        }

        count = 1;

    }
}

class knight extends Piece{
    constructor(x, y, color){
        super(x, y, color);
        this.type = "Knight";
        if(this.color == "white"){
            this.image = wnImg;
        }
        else{
            this.image = bnImg;
        }
    }

    findPossibleMoves(){
        let posY = this.position[0];
        let posX = this.position[1];

        /* ------------------------------------ 1 ----------------------------------- */
        if(checkMove(posY + 2, posX + 1)){
            this.possibleMoves.push([posY + 2, posX + 1]);
        }
        else if(checkCapture(posY + 2, posX + 1, this.color)){
            this.possibleCaptures.push([posY + 2, posX + 1]);
        }

        /* ------------------------------------ 2 ----------------------------------- */
        if(checkMove(posY + 2, posX - 1)){
            this.possibleMoves.push([posY + 2, posX - 1]);
        }
        else if(checkCapture(posY + 2, posX - 1, this.color)){
            this.possibleCaptures.push([posY + 2, posX - 1]);
        }

        /* ------------------------------------ 3 ----------------------------------- */
        if(checkMove(posY - 2, posX - 1)){
            this.possibleMoves.push([posY - 2, posX - 1]);
        }
        else if(checkCapture(posY - 2, posX - 1, this.color)){
            this.possibleCaptures.push([posY - 2, posX - 1]);
        }

        /* ------------------------------------ 4 ----------------------------------- */
        if(checkMove(posY - 2, posX + 1)){
            this.possibleMoves.push([posY - 2, posX + 1]);
        }
        else if(checkCapture(posY - 2, posX + 1, this.color)){
            this.possibleCaptures.push([posY - 2, posX + 1]);
        }

        /* ------------------------------------ 5 ----------------------------------- */
        if(checkMove(posY + 1, posX + 2)){
            this.possibleMoves.push([posY + 1, posX + 2]);
        }
        else if(checkCapture(posY +1, posX + 2, this.color)){
            this.possibleCaptures.push([posY + 1, posX + 2]);
        }

        /* ------------------------------------ 6 ----------------------------------- */
        if(checkMove(posY - 1, posX + 2)){
            this.possibleMoves.push([posY - 1, posX + 2]);
        }
        else if(checkCapture(posY - 1, posX + 2, this.color)){
            this.possibleCaptures.push([posY - 1, posX + 2]);
        }

        /* ------------------------------------ 7 ----------------------------------- */
        if(checkMove(posY + 1, posX - 2)){
            this.possibleMoves.push([posY + 1, posX - 2]);
        }
        else if(checkCapture(posY + 1, posX - 2, this.color)){
            this.possibleCaptures.push([posY + 1, posX - 2]);
        }

        /* ------------------------------------ 8 ----------------------------------- */
        if(checkMove(posY - 1, posX - 2)){
            this.possibleMoves.push([posY - 1, posX - 2]);
        }
        else if(checkCapture(posY - 1, posX - 2, this.color)){
            this.possibleCaptures.push([posY - 1, posX - 2]);
        }
    }

}

class Rook extends Piece{
    constructor(x, y, color){
        super(x, y, color);
        this.type = "Rook";
        if(this.color == "white"){
            this.image = wrImg;
        }
        else{
            this.image = brImg;
        }
    }

    findPossibleMoves(){
        let posY = this.position[0];
        let posX = this.position[1];

        let count = 1;

        /* ------------------------------------ 1 ----------------------------------- */
        while(checkMove(posY + count, posX)){
            this.possibleMoves.push([posY + count, posX]);
            count ++;
        }
        if(checkCapture(posY + count, posX, this.color)){
            this.possibleCaptures.push([posY + count, posX]);
        }

        count = 1;

        /* ------------------------------------ 2 ----------------------------------- */
        while(checkMove(posY - count, posX)){
            this.possibleMoves.push([posY - count, posX]);
            count ++;
        }
        if(checkCapture(posY - count, posX, this.color)){
            this.possibleCaptures.push([posY - count, posX]);
        }

        count = 1;

        /* ------------------------------------ 3 ----------------------------------- */
        while(checkMove(posY, posX - count)){
            this.possibleMoves.push([posY, posX - count]);
            count ++;
        }
        if(checkCapture(posY, posX - count, this.color)){
            this.possibleCaptures.push([posY, posX - count]);
        }

        count = 1;

        /* ------------------------------------ 4 ----------------------------------- */
        while(checkMove(posY, posX + count)){
            this.possibleMoves.push([posY, posX + count]);
            count ++;
        }
        if(checkCapture(posY, posX + count, this.color)){
            this.possibleCaptures.push([posY, posX + count]);
        }

        count = 1;

    }
}

class Queen extends Piece{
    constructor(x, y, color){
        super(x, y, color);
        this.type = "Queen";
        if(this.color == "white"){
            this.image = wqImg;
        }
        else{
            this.image = bqImg;
        }
    }

    findPossibleMoves(){
        let posY = this.position[0];
        let posX = this.position[1];

        let count = 1;

        /* ------------------------------------ 1 ----------------------------------- */
        while(checkMove(posY + count, posX)){
            this.possibleMoves.push([posY + count, posX]);
            count ++;
        }
        if(checkCapture(posY + count, posX, this.color)){
            this.possibleCaptures.push([posY + count, posX]);
        }

        count = 1;

        /* ------------------------------------ 2 ----------------------------------- */
        while(checkMove(posY - count, posX)){
            this.possibleMoves.push([posY - count, posX]);
            count ++;
        }
        if(checkCapture(posY - count, posX, this.color)){
            this.possibleCaptures.push([posY - count, posX]);
        }

        count = 1;

        /* ------------------------------------ 3 ----------------------------------- */
        while(checkMove(posY, posX - count)){
            this.possibleMoves.push([posY, posX - count]);
            count ++;
        }
        if(checkCapture(posY, posX - count, this.color)){
            this.possibleCaptures.push([posY, posX - count]);
        }

        count = 1;

        /* ------------------------------------ 4 ----------------------------------- */
        while(checkMove(posY, posX + count)){
            this.possibleMoves.push([posY, posX + count]);
            count ++;
        }
        if(checkCapture(posY, posX + count, this.color)){
            this.possibleCaptures.push([posY, posX + count]);
        }

        count = 1;

        /* ------------------------------------ 5 ----------------------------------- */
        while(checkMove(posY + count, posX + count)){
            this.possibleMoves.push([posY + count, posX + count]);
            count ++;
        }
        if(checkCapture(posY + count, posX + count, this.color)){
            this.possibleCaptures.push([posY + count, posX + count]);
        }

        count = 1;

        /* ------------------------------------ 6 ----------------------------------- */
        while(checkMove(posY - count, posX + count)){
            this.possibleMoves.push([posY - count, posX + count]);
            count ++;
        }
        if(checkCapture(posY - count, posX + count, this.color)){
            this.possibleCaptures.push([posY - count, posX + count]);
        }

        count = 1;

        /* ------------------------------------ 7 ----------------------------------- */
        while(checkMove(posY + count, posX - count)){
            this.possibleMoves.push([posY + count, posX - count]);
            count ++;
        }
        if(checkCapture(posY + count, posX - count, this.color)){
            this.possibleCaptures.push([posY + count, posX - count]);
        }

        count = 1;

        /* ------------------------------------ 8 ----------------------------------- */
        while(checkMove(posY - count, posX - count)){
            this.possibleMoves.push([posY - count, posX - count]);
            count ++;
        }
        if(checkCapture(posY - count, posX - count, this.color)){
            this.possibleCaptures.push([posY - count, posX - count]);
        }

        count = 1;

    }
}

class King extends Piece{
    constructor(x, y, color){
        super(x, y, color);
        this.type = "King";
        if(this.color == "white"){
            this.image = wkImg;
        }
        else{
            this.image = bkImg;
        }
    }

    findPossibleMoves(){
        let posY = this.position[0];
        let posX = this.position[1];

        /* ------------------------------------ 1 ----------------------------------- */
        if(checkMove(posY + 1, posX + 1)){
            this.possibleMoves.push([posY + 1, posX + 1]);
        }
        else if(checkCapture(posY + 1, posX + 1, this.color)){
            this.possibleCaptures.push([posY + 1, posX + 1]);
        }

        /* ------------------------------------ 2 ----------------------------------- */
        if(checkMove(posY + 1, posX - 1)){
            this.possibleMoves.push([posY + 1, posX - 1]);
        }
        else if(checkCapture(posY + 1, posX - 1, this.color)){
            this.possibleCaptures.push([posY + 1, posX - 1]);
        }

        /* ------------------------------------ 3 ----------------------------------- */
        if(checkMove(posY - 1, posX - 1)){
            this.possibleMoves.push([posY - 1, posX - 1]);
        }
        else if(checkCapture(posY - 1, posX - 1, this.color)){
            this.possibleCaptures.push([posY - 1, posX - 1]);
        }

        /* ------------------------------------ 4 ----------------------------------- */
        if(checkMove(posY - 1, posX + 1)){
            this.possibleMoves.push([posY - 1, posX + 1]);
        }
        else if(checkCapture(posY - 1, posX + 1, this.color)){
            this.possibleCaptures.push([posY - 1, posX + 1]);
        }

        /* ------------------------------------ 5 ----------------------------------- */
        if(checkMove(posY + 1, posX)){
            this.possibleMoves.push([posY + 1, posX]);
        }
        else if(checkCapture(posY +1, posX, this.color)){
            this.possibleCaptures.push([posY + 1, posX]);
        }

        /* ------------------------------------ 6 ----------------------------------- */
        if(checkMove(posY - 1, posX)){
            this.possibleMoves.push([posY - 1, posX]);
        }
        else if(checkCapture(posY - 1, posX, this.color)){
            this.possibleCaptures.push([posY - 1, posX]);
        }

        /* ------------------------------------ 7 ----------------------------------- */
        if(checkMove(posY, posX - 1)){
            this.possibleMoves.push([posY, posX - 1]);
        }
        else if(checkCapture(posY, posX - 1, this.color)){
            this.possibleCaptures.push([posY, posX - 1]);
        }

        /* ------------------------------------ 8 ----------------------------------- */
        if(checkMove(posY, posX + 1)){
            this.possibleMoves.push([posY, posX + 1]);
        }
        else if(checkCapture(posY, posX + 1, this.color)){
            this.possibleCaptures.push([posY, posX + 1]);
        }

        // /* ----------------------------- checkForChecks ----------------------------- */
        // for(var i = 0; i < this.possibleMoves.length; i++){
        //     if(this.color == "white"){
        //         for(var j = 0; j < black.moves.length; j++){
        //             if(this.possibleMoves[i][0] == black.moves[j][0] && this.possibleMoves[i][1] == black.moves[j][1]){
        //                 this.possibleMoves[i] = null;
        //             }
        //         }
        //     }
        //     else{
        //         for(var j = 0; j < white.moves.length; j++){
        //             if(this.possibleMoves[i][0] == white.moves[j][0] && this.possibleMoves[i][1] == white.moves[j][1]){
        //                 this.possibleMoves[i] = null;
        //             }
        //         }
        //     }
        // }
        // this.possibleMoves = this.possibleMoves.filter(Boolean);
        // for(var i = 0; i < this.possibleCaptures.length; i++){
        //     if(this.color == "white"){
        //         for(var j = 0; j < black.moves.length; j++){
        //             if(this.possibleCaptures[i][0] == black.moves[j][0] && this.possibleCaptures[i][1] == black.moves[j][1]){
        //                 this.possibleCaptures[i] = null;
        //             }
        //         }
        //     }
        //     else{
        //         for(var j = 0; j < white.moves.length; j++){
        //             if(this.possibleCaptures[i][0] == white.moves[j][0] && this.possibleCaptures[i][1] == white.moves[j][1]){
        //                 this.possibleCaptures[i] = null;
        //             }
        //         }
        //     }
        // }
        // this.possibleCaptures = this.possibleCaptures.filter(Boolean);
    }

}