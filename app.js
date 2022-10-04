// GAME STATE
const EMPTY = 0;
const PLAYER1 = 1;
const PLAYER2 = 2;

let gameState = {
    board: [],
    numColumns: 7,
    numRows: 6,
    gameActive: true,
    winner: 0,
    turn: PLAYER1,
    gameMode: "Single Player",
    playerOneName: "Player 1",
    playerTwoName: "Player 2",
    playerOneColor: "red",
    playerTwoColor: "yellow",
    
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
        // Determine the chosen column and empty row's corresponding slot number, get it from the DOM
        let slotNum = (col * this.numRows) + emptyRow;
        if (emptyRow >= 0 && emptyRow <= this.numRows) {
            let targetSlot = document.getElementsByClassName("open-slot")[ slotNum ];

            // Set color and claim spot on board
            if (this.turn == PLAYER1) {
                targetSlot.classList.add(this.playerOneColor);
                this.board[col][emptyRow] = PLAYER1;
            } else {
                targetSlot.classList.add(this.playerTwoColor);
                this.board[col][emptyRow] = PLAYER2;
            }
        }

        // Check for a win
        if (this.checkWin()) {
            this.gameActive = false;
            if (this.winner == 1) congratulateWinner( this.playerOneName, this.playerOneColor );
            else congratulateWinner( this.playerTwoName, this.playerTwoColor );
        }

        // Change turns
        this.changeTurns();
        if (this.gameMode == "Single Player" && this.turn == PLAYER2) {
            // Computer makes a move
            this.computerMove();
        }
    },

    computerMove: function() {
        let chosenCol = Math.floor(Math.random() * (this.numColumns)); // TODO: make smarter choice
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

        let redTurn = document.getElementsByClassName("your-turn")[0];
        let yelTurn = document.getElementsByClassName("your-turn")[1];

        // Switch from player 1 to player 2
        if (this.turn == PLAYER1 && setTurn != PLAYER1) {
            redTurn.classList.add("hidden");
            yelTurn.classList.remove("hidden");
            this.turn = PLAYER2;
        // Switch from player 2 to player 1
        } else {
            redTurn.classList.remove("hidden");
            yelTurn.classList.add("hidden");
            this.turn = PLAYER1;
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
        let gameModeSelect = document.getElementsByClassName("selector")[0];
        gameState.gameMode = gameModeSelect.value;

        // Rebuild game board and reset gameState values
        buildBoard();
        playerSetup();
        gameState.gameActive = true;
        gameState.winner = 0;

        if (gameState.gameMode == "Single Player") gameState.changeTurns( PLAYER1 ); // player 1 goes first
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
    // Change the Red Player's Name
    let redChangeNameBtn = document.getElementsByClassName("change-name-btn")[0];
    redChangeNameBtn.addEventListener("click", function() {
        let redPlayerNameInput = document.getElementsByTagName("input")[0];
        let redPlayerNameDisplay = document.getElementById("red-player-name");
        redPlayerNameDisplay.textContent = redPlayerNameInput.value;
        gameState.playerOneName = redPlayerNameInput.value;
    });
    // Change the Yellow Player's Name
    let yelChangeNameBtn = document.getElementsByClassName("change-name-btn")[1];
    yelChangeNameBtn.addEventListener("click", function() {
        let yelPlayerNameInput = document.getElementsByTagName("input")[1];
        let yelPlayerNameDisplay = document.getElementById("yel-player-name");
        yelPlayerNameDisplay.textContent = yelPlayerNameInput.value;
        gameState.playerTwoName = yelPlayerNameInput.value;
    });

    // Toggle name change option for second player when playing single player mode
    let yelPlayerNameInputOption = document.getElementById("yel-name-input");
    let yelPlayerNameDisplay = document.getElementById("yel-player-name");
    if (gameState.gameMode === "Single Player") {
        yelPlayerNameInputOption.classList.add("hidden");
        yelPlayerNameDisplay.textContent = "Computer";
        gameState.playerTwoName = "Computer";
    } else {
        yelPlayerNameInputOption.classList.remove("hidden");
        if (gameState.playerTwoName == "Computer") {
            gameState.playerTwoName = "Player 2";
            yelPlayerNameDisplay.textContent = gameState.playerTwoName;
        }
    }
}

function gameSetup() {
    // red goes first on refresh
    let redTurn = document.getElementsByClassName("your-turn")[0];
    redTurn.classList.remove("hidden");

    // new game button
    let newGameBtn = document.getElementById("new-game-btn");
    newGameBtn.addEventListener("click", gameState.newGame);
}

function congratulateWinner( winner, winnersColor ) {
    let congratsDisplay = document.createElement("div");
    congratsDisplay.classList.add("congrats");
    congratsDisplay.classList.add(winnersColor);
    congratsDisplay.innerHTML = `Congratulations ${winner}!`;

    let gameBoard = document.getElementsByClassName("game-board")[0];
    middleContainer.insertBefore(congratsDisplay, gameBoard);
}
