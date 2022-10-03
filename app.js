// GAME STATE
const EMPTY = 0;
const PLAYER1 = 1;
const PLAYER2 = 2;

let gameState = {
    board: [],
    numColumns: 7,
    numRows: 6,
    turn: PLAYER1,
    playerOneName: "Me",
    playerTwoName: "Computer",
    makeMove: function( col ) {
        // console.log("MAKING MVOES: " + col);
        // console.log( this.board[col] );

        let emptyRow;
        for (let i = this.numColumns; i >= 0; i--) {
            if (this.board[col][i] == 0) {
                emptyRow = i;
                // console.log("Empty row: " + emptyRow);
                break;
            }
        }
        let slotNum = (col * this.numRows) + emptyRow;
        if (emptyRow >= 0 && emptyRow <= this.numRows) {
            // console.log("slot# " + slotNum );
            let targetSlot = document.getElementsByClassName("open-slot")[ slotNum ];

            if (this.turn == PLAYER1) {
                targetSlot.classList.add("red");
                this.board[col][emptyRow] = PLAYER1;
                this.turn = PLAYER2;
            } else {
                targetSlot.classList.add("yellow");
                this.board[col][emptyRow] = PLAYER2;
                this.turn = PLAYER1;
            }
            this.board[col][emptyRow] = PLAYER1;
            // console.log( this.board );
        }
    },

    newGame: function() {
        console.log("new game");
        let gameBoard = document.getElementsByClassName("game-board");
        console.log(gameBoard);
        console.log(middleContainer);
        // middleContainer.removeChild(gameBoard); TODO: make this work
        
        
        this.board = [];

        buildBoard();
    }

}

// Page Set up
document.addEventListener("DOMContentLoaded", gameSetup);
document.addEventListener("DOMContentLoaded", buildBoard);
document.addEventListener("DOMContentLoaded", playerSetup);

let leftContainer = document.getElementsByClassName("column")[0];
let middleContainer = document.getElementsByClassName("column")[1];
let rightContainer = document.getElementsByClassName("column")[2];

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
        // console.log(colArr);
        gameBoard.appendChild(colDiv);
        gameState.board.push(colArr);

    }

    // console.log(gameState.board);
    middleContainer.appendChild(gameBoard);
}

function playerSetup() {
    let redPlayerImg = document.createElement("img");
    redPlayerImg.classList.add("profile-pic");
    redPlayerImg.src = "images/red-player-silhouette.jpg";
    leftContainer.appendChild(redPlayerImg);
    let redPlayerName = document.createElement("h2");
    redPlayerName.textContent = gameState.playerOneName;
    leftContainer.appendChild(redPlayerName);

    let yelPlayerImg = document.createElement("img");
    yelPlayerImg.classList.add("profile-pic");
    yelPlayerImg.src = "images/yellow-player-silhouette.jpg";
    rightContainer.appendChild(yelPlayerImg);
    let yelPlayerName = document.createElement("h2");
    yelPlayerName.textContent = gameState.playerTwoName;
    rightContainer.appendChild(yelPlayerName);
}


function gameSetup() {
    // new game button
    let newGameBtn = document.createElement("button");
    newGameBtn.classList.add("new-game-btn");
    newGameBtn.textContent = "New Game";
    middleContainer.appendChild(newGameBtn);
    newGameBtn.addEventListener("click", gameState.newGame);

    // game type selector
    let gameSelector = document.createElement("select");
    gameSelector.classList.add("selector");
    let singlePlayerOption = document.createElement("option");
    singlePlayerOption.text = "Single Player";
    gameSelector.appendChild(singlePlayerOption);
    let multiplayerOption = document.createElement("option");
    multiplayerOption.text = "Multiplayer";
    gameSelector.appendChild(multiplayerOption);

    middleContainer.appendChild(gameSelector);

}

