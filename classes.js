class Piece{
    constructor(x, y, color){
        this.alive = true;
        this.x = x; // piece x coordinate
        this.y = y; // piece y coordinate
        this.color = color;
        this.type;
        this.position = [Math.floor(this.y / unit), Math.floor(this.x / unit)]
        this.possibleMoves = [];
        this.possibleCaptures = [];
    }

    findPossibleMoves(){}
}

class Pawn extends Piece{
    constructor(x, y, color){
        super(x, y, color);
        this.type = "Pawn";
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
        }
        if(checkMove(posY + (up * 2), posX) && this.color == "white" && posY == 6 || this.color == "black" && posY == 1){
            this.possibleMoves.push([posY + (up * 2), posX]) // move forward twice
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
        this.possibleMoves = [];
        this.possibleCaptures = [];
    }


}
