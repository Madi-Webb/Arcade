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
    playerOneColor: "red",
    playerTwoColor: "yellow",
    makeMove: function( col ) {
        console.log("MAKING MVOES: " + col);
        console.log( this.board[col] );
        console.log( this.board );

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

            if (this.turn == PLAYER1) {
                targetSlot.classList.add(this.playerOneColor);
                this.board[col][emptyRow] = PLAYER1;
                this.turn = PLAYER2;
            } else {
                targetSlot.classList.add(this.playerTwoColor);
                this.board[col][emptyRow] = PLAYER2;
                this.turn = PLAYER1;
            }
            this.board[col][emptyRow] = PLAYER1;
            console.log( this.board );
        }
    },

    newGame: function() {
        console.log("new game");
        let gameBoard = document.getElementsByClassName("game-board")[0];
        console.log(gameBoard);
        console.log(middleContainer);
        // middleContainer.innerHTML="";
        middleContainer.removeChild(gameBoard); // TODO: make this work
        buildBoard();
        
        // this.board = [];
        console.log(this.board);


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
    gameState.board = [];

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

    let redPlayerNameInput = document.createElement("input");
    leftContainer.appendChild(redPlayerNameInput);
    let changeNameBtn = document.createElement("button");
    changeNameBtn.textContent = "Change Name";
    changeNameBtn.classList.add("change-name-btn");
    leftContainer.appendChild(changeNameBtn);

    changeNameBtn.addEventListener("click", function() {
        console.log("name change");
        console.log(redPlayerNameInput.value);
        redPlayerName.textContent = redPlayerNameInput.value;
        gameState.playerOneName = redPlayerNameInput.value;
    });
    
    
    let yelPlayerImg = document.createElement("img");
    yelPlayerImg.classList.add("profile-pic");
    yelPlayerImg.src = "images/yellow-player-silhouette.jpg";
    rightContainer.appendChild(yelPlayerImg);
    let yelPlayerName = document.createElement("h2");
    yelPlayerName.textContent = gameState.playerTwoName;
    rightContainer.appendChild(yelPlayerName);
}

// function nameInputSetup(nameDisplay) {
//     let redPlayerNameInput = document.createElement("input");
//     leftContainer.appendChild(redPlayerNameInput);
//     let changeNameBtn = document.createElement("button");
//     changeNameBtn.textContent = "Change Name";
//     changeNameBtn.classList.add("change-name-btn");
//     leftContainer.appendChild(changeNameBtn);

//     changeNameBtn.addEventListener("click", function() {
//         console.log("name change");
//         console.log(redPlayerNameInput.value);
//         nameDisplay = redPlayerNameInput.value;
//     });
// }


function gameSetup() {
    // new game button
    let newGameBtn = document.getElementById("new-game-btn");
    console.log(newGameBtn);
    newGameBtn.addEventListener("click", gameState.newGame);
}

