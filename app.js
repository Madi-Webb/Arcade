// GAME STATE
const EMPTY = 0;
const PLAY1 = 1;
const PLAY2 = 2;

let gameState = {
    board: [],
    numColumns: 7,
    numRows: 6,
    turn: PLAY1,
    makeMove: function( col ) {
        console.log("MAKING MVOES: " + col);
        console.log( this.board[col] );

        let emptyRow;
        for (let i = this.numColumns; i >= 0; i--) {
            if (this.board[col][i] == 0) {
                emptyRow = i;
                console.log("Empty row: " + emptyRow);
                break;
            }
        }
        let slotNum = (col * this.numRows) + emptyRow;
        if (emptyRow >= 0 && emptyRow <= this.numRows) {
            console.log("slot# " + slotNum );
            let targetSlot = document.getElementsByClassName("open-slot")[ slotNum ];

            if (this.turn == PLAY1) {
                targetSlot.classList.add("yellow");
                this.board[col][emptyRow] = PLAY1;
                this.turn = PLAY2;
            } else {
                targetSlot.classList.add("red");
                this.board[col][emptyRow] = PLAY2;
                this.turn = PLAY1;
            }
            this.board[col][emptyRow] = PLAY1;
            console.log( this.board );
        }


        
    }
}



let gameContainer = document.getElementsByClassName("column")[1];

function buildBoard () {
    let gameBoard = document.createElement("div");
    gameBoard.classList.add("game-board");

    for ( let i = 0; i <= gameState.numColumns-1; i++ ) {
        let colDiv = document.createElement("div");
        colDiv.classList.add("column");
        colDiv.addEventListener("click", function() {
            gameState.makeMove(i);
        });
        let colArr = [];

        for ( let j = 0; j <= gameState.numRows-1 ; j++ ) {
            let openSlot = document.createElement("div");
            openSlot.classList.add("open-slot");
            colDiv.appendChild(openSlot);
            colArr.push(EMPTY);
        }
        console.log(colArr);
        gameBoard.appendChild(colDiv);
        gameState.board.push(colArr);

    }

    console.log(gameState.board);
    gameContainer.appendChild(gameBoard);
}

buildBoard( );




// function buildBoard ( numColumns, numRows ) {
//     let gameBoard = document.createElement("div");
//     gameBoard.classList.add("game-board");

//     for ( let i = 0; i <= numRows-1; i++ ) {
//         let row = document.createElement("div");
//         row.classList.add("row");
//         let rowArr = [];

//         for ( let j = 0; j <= numColumns-1 ; j++ ) {
//             let openSlot = document.createElement("div");
//             openSlot.classList.add("open-slot");
//             row.appendChild(openSlot);
//             rowArr.push(EMPTY);
//         }
//         console.log(rowArr);
//         gameBoard.appendChild(row);
//         gameState.board.push(rowArr);

//     }

//     console.log(gameState.board);
//     gameContainer.appendChild(gameBoard);
// }