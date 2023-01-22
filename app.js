// GAME STATE
const EMPTY = 0;
const PETER = 1;
const MILES = 2;

let gameState = {
    board: [],
    numColumns: 7,
    numRows: 6,
    gameActive: true,
    winner: EMPTY,
    turn: PETER,
    gameMode: "Single Player",
    peterName: "Peter",
    milesName: "Miles",
    
    makeMove: function( col ) {
        if (!this.gameActive) return; // stops moves from being made after win

        // Find the first empty row in the chosen column
        let emptyRow;
        for (let i = this.numColumns; i >= 0; i--) {
            if (this.board[col][i] == 0) {
                emptyRow = i;
                break;
            }
        }
        if (emptyRow == undefined) return; // stops "move" when column is full

        // Determine the chosen column and empty row's corresponding slot number, get it from the DOM
        let slotNum = (col * this.numRows) + emptyRow;
        if (emptyRow >= 0 && emptyRow <= this.numRows) {
            let targetSlot = document.getElementsByClassName("open-slot")[ slotNum ];

            // Set color and claim spot on board
            if (this.turn == PETER) {
                targetSlot.classList.add("peter-slot");
                this.board[col][emptyRow] = PETER;
            } else {
                targetSlot.classList.add("miles-slot");
                this.board[col][emptyRow] = MILES;
            }
        }

        // Check for a win
        if (this.checkWin()) {
            this.gameActive = false;
            this.winner == PETER ? congratulateWinner( this.peterName ) : congratulateWinner( this.milesName );
        }

        // Change turns
        this.changeTurns();
        if (this.gameMode == "Single Player" && this.turn == MILES) {
            // Computer makes a move
            this.computerMove();
        }
    },

    computerMove: function() {
        let chosenCol = Math.floor(Math.random() * (this.numColumns)); // TODO: make smarter choice
        // setTimeout(this.makeMove(chosenCol), 3000); // TODO: make this work ugh
        this.makeMove(chosenCol);
    },

    checkWin: function() {
        // Check down win
        for (let i = 0; i < this.numColumns; i++) {
            for (let j = 0; j < 3; j++) { // can't win down unless "above" row 3 ( in row 0, 1 or 2)
                if ( this.checkLine (this.board[i][j], this.board[i][j+1], this.board[i][j+2], this.board[i][j+3]) ) {
                    this.winner = this.board[i][j];
                    return true;
                }
            }
        }
        // Check right win
        for (let i = 0; i < 4; i++) { // can't win right unless left of col 4
            for (let j = 0; j < this.numRows; j++) {
                if ( this.checkLine (this.board[i][j], this.board[i+1][j], this.board[i+2][j], this.board[i+3][j]) ) {
                    this.winner = this.board[i][j];
                    return true;
                }
            }
        }
        // Check diagonal down-right win
        for (let i = 0; i < 4; i++) { // can't win right unless left of col 4
            for (let j = 0; j < 3; j++) { // can't win down unless "above" row 3
                if ( this.checkLine (this.board[i][j], this.board[i + 1][j + 1], this.board[i + 2][j + 2], this.board[i + 3][j + 3]) ) {
                    this.winner = this.board[i][j];
                    return true;
                }
            }
        }
        // Check diagonal down-left win
        for (let i = 0; i < 4; i++) {
            for (let j = 3; j < this.numRows; j++) { // can't win down unless "above" row 3
                if ( this.checkLine (this.board[i][j], this.board[i+1][j-1], this.board[i+2][j-2], this.board[i+3][j-3]) ) {
                    this.winner = this.board[i][j];
                    return true;
                }
            }
        }
    },

    checkLine: function( targetCell, cell2, cell3, cell4 ) {
        return ( (targetCell !== 0) && ( targetCell === cell2) && ( targetCell === cell3) && (targetCell === cell4) );
    },

    changeTurns: function ( setTurn ) {
        if (!this.gameActive) return; // stop from switching pointlessly after win

        let peterPlayer = document.getElementsByClassName("player")[0];
        let peterPlayerMsg = document.getElementsByClassName("youre-up")[0];
        let milesPlayer = document.getElementsByClassName("player")[1];
        let milesPlayerMsg = document.getElementsByClassName("youre-up")[1];

        // Switch from player peter to player miles
        if (this.turn == PETER && setTurn != PETER) {
            peterPlayer.classList.remove("red-background");
            peterPlayerMsg.classList.add("hidden");
            milesPlayerMsg.classList.remove("hidden");
            milesPlayer.classList.add("black-background");
            this.turn = MILES;
        // Switch from player miles to player peter
        } else {
            peterPlayer.classList.add("red-background");
            peterPlayerMsg.classList.remove("hidden");
            milesPlayerMsg.classList.add("hidden");
            milesPlayer.classList.remove("black-background");
            this.turn = PETER;
        }
    },

    newGame: function() {
        // Remove game board and congrats display from the middle container
        let gameBoard = document.getElementsByClassName("game-board")[0];
        middleContainer.removeChild(gameBoard);

        if (gameState.winner != 0) {
            let congratsDisplay = document.getElementsByClassName("congrats")[0];
            middleContainer.removeChild(congratsDisplay);
        }

        // Determine single or multiplayer game
        let gameModeSelect = document.getElementById("selector");
        gameState.gameMode = gameModeSelect.value;

        // Rebuild game board and reset gameState values
        buildBoard();
        playerSetup();
        gameState.gameActive = true;
        gameState.winner = 0;

        if (gameState.gameMode == "Single Player") gameState.changeTurns( PETER ); // peter goes first single player
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
        gameBoard.appendChild(colDiv);
        gameState.board.push(colArr);
    }
    middleContainer.appendChild(gameBoard);
}


function playerSetup() {
    // changing peters name
    let peterChangeNameButton = document.getElementsByClassName("change-name-btn")[0];
    peterChangeNameButton.addEventListener("click", function() {
        let peterNameInput = document.getElementsByTagName("input")[0];
        let peterNameDisplay = document.getElementById("peter-name");
        peterNameDisplay.textContent = peterNameInput.value;
        gameState.peterName = peterNameInput.value;
    });
    // changing miles name
    let milesChangeNameButton = document.getElementsByClassName("change-name-btn")[1];
    milesChangeNameButton.addEventListener("click", function() {
        let milesNameInput = document.getElementsByTagName("input")[1];
        let milesNameDisplay = document.getElementById("miles-name");
        milesNameDisplay.textContent = milesNameInput.value;
        gameState.milesName = milesNameInput.value;
    });

    // toggle name change option for second player when playing single player mode
    let milesNameInputOption = document.getElementById("miles-name-change");
    let milesNameDisplay = document.getElementById("miles-name");
    if (gameState.gameMode === "Single Player") {
        milesNameInputOption.classList.add("hidden");
        milesNameDisplay.textContent = "Miles";
        gameState.milesName = "Miles";
    } else {
        milesNameInputOption.classList.remove("hidden");
        if (gameState.milesName == "Miles") {
            gameState.milesName = "Miles";
            milesNameDisplay.textContent = gameState.milesName;
        }
    }
}


function gameSetup() {
    // new game button
    let newGameBtn = document.getElementById("new-game-btn");
    newGameBtn.addEventListener("click", gameState.newGame);

    // peter goes first on refresh
    let milesPlayer = document.getElementsByClassName("player")[1];
    milesPlayer.classList.remove("black-background");
    let milesPlayerMsg = document.getElementsByClassName("youre-up")[1];
    milesPlayerMsg.classList.add("hidden");

    let peterPlayerMsg = document.getElementsByClassName("youre-up")[0];
    peterPlayerMsg.classList.remove("hidden");
}


function congratulateWinner( winner ) {
    let congratsDisplay = document.createElement("div");
    congratsDisplay.classList.add("congrats");
    congratsDisplay.innerHTML = `Congratulations ${winner}!`;

    let gameBoard = document.getElementsByClassName("game-board")[0];
    middleContainer.insertBefore(congratsDisplay, gameBoard);
}
