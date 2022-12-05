class Player{
    constructor(color){
        this.color = color;
        this.pieces = [];
        this.moves = [];
    }

    findAllMoves(){
        /* -------------------------- resets previous moves ------------------------- */
        for(var i = 0; i < this.pieces.length; i++){
            this.pieces[i].resetMoves();
        }
        this.moves = [];

        /* ---------------------------- finds next moves ---------------------------- */
        for(var i = 0; i < this.pieces.length; i++){
            if(this.pieces[i].alive){
                this.pieces[i].findPossibleMoves();
                for(var j = 0; j < this.pieces[i].possibleMoves.length; j++){
                    this.moves.push(this.pieces[i].possibleMoves[j]);
                }
            }
        }
    }

    isChecked(){
        let atk;
        if (this.color == "white")
            atk = black;
        else atk = white;
        for(var i = 0; i < atk.moves.length; i++){
            if(atk.moves[i][0] == this.pieces[12].position[0] && atk.moves[i][1] == this.pieces[12].position[1]){
                return true;
            }
        }
        return false;
    }

    checkFutureMove(piece, move){
        let prevPos = [];
        let taken;
        let res = false;
        prevPos[0] = piece.position[0]; prevPos[1] = piece.position[1];
        taken = board[move[0]][move[1]];
        piece.move(move[1], move[0]);
        if(this.isChecked()){
            res = true;
        }
        piece.move(prevPos[1], prevPos[0]);
        board[move[0]][move[1]] = taken;
        if(taken != 0) taken.alive = true;
        return res;
    }

    removeIllegalMoves(){
        for(var i = 0; i < this.pieces.length; i++){
            this.pieces[i].resetIllegalMoves();
        }

        for(var i = 0; i < this.pieces.length; i++){
            for(var j = 0; j < this.pieces[i].possibleMoves.length; j++){
                if(this.checkFutureMove(this.pieces[i], this.pieces[i].possibleMoves[j])){
                    this.pieces[i].illegalMoves.push(j);
                }
                
            }
        }
        for(var i = 0; i < this.pieces.length; i++){
            for(var j = 0; j < this.pieces[i].illegalMoves.length; j++){
                this.pieces[i].possibleMoves[this.pieces[i].illegalMoves[j]] = null;
            }
            this.pieces[i].possibleMoves = this.pieces[i].possibleMoves.filter(Boolean)
        }
    }

    checkCastle(){
        /* ------------------------------- king moved ------------------------------- */
        if(this.pieces[12].moved) return;

        /* ------------------------------- long castle ------------------------------ */
        if(!this.pieces[8].moved){
            let flag = true;
            for(var i = 1; i < 4; i++){
                if(board[this.pieces[12].position[0]][i] != 0 || this.checkFutureMove(this.pieces[12], [this.pieces[12].position[0], i])) flag = false;
            }
            if(flag){
                this.pieces[12].possibleMoves.push([this.pieces[12].position[0], this.pieces[12].position[1] + 2])
            }
        }

        /* ------------------------------- short castle ------------------------------ */
        if(!this.pieces[15].moved){
            let flag = true;
            for(var i = 5; i < 7; i++){
                if(board[this.pieces[12].position[0]][i] != 0 || this.checkFutureMove(this.pieces[12], [this.pieces[12].position[0], i])) flag = false;
            }
            if(flag) {
                this.pieces[12].possibleMoves.push([this.pieces[12].position[0], this.pieces[12].position[1] + 2])   
            }
        }
    }
}