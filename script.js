/*
Factory function for gameBoard object, wrapped inside of an IIFE so that only one gameBoard can be
created at a time
*/
const gameBoard = (() => {
    const board = []; 
    const cells = 9;

    //populate the board with empty space
    /*
    [
        '', '', '',
        '', '', '',
        '', '', ''
    ] 
    */
    const resetBoard = () => {
        for (let i = 0; i < cells; i++) {
            board[i] = '';
        }
    }
    
    //make the board state accessible outside of the factory
    const getBoard = () => board;

    //returns true if given cell exists on the board
    const isValid = (index) => {
        return (index < 0 || index >= board.length);
    }

    //checks the value in the cell positioned at the given index
    const checkCell = (index) => {
        if (isValid(index)) {
            return board[index];
        } else {
            return 'invalid index';
        }
    }

    //returns true if given cell is empty
    const isEmpty = (index) => {
        return (isValid(index) & board[index] === '');
    }

    //update cell with a particular marker at the given index
    const updateCell = (index, marker) => {
        if (isValid(index) & isEmpty(index)) {
            board[index] = marker;
        }
    }

    return {getBoard, isValid, resetBoard, checkCell, updateCell};
})();



/*
Factory function for gameController object, wrapped inside of an IIFE
*/
const gameController = ((p1Name, p2Name) => {
    //create two players based on names passed in to controller
    const players = [
        {name: p1Name, marker: 'X'}, 
        {name: p2Name, marker: 'O'}
    ];

    //player turn-switching logic
    let currentPlayer = players[0];
    const switchPlayerTurn = () => {
        if (currentPlayer === players[0]) {
            currentPlayer = players[1];
        } else {
            currentPlayer = players[0];
        }
    }

    //fetch the current player
    const getCurrentPlayer = () => currentPlayer;

    //check if board is full
    const boardFull = (board) => {
        return (board.includes(''));
    }

    //determines whether the current move led to game completion
    const evaluateMove = (index, marker) => {
        //obtain the current state of the board
        const board = gameBoard.getBoard();

        //check for win in all directions from position of currently-placed marker
        if (checkRowWin(index, marker) || checkColumnWin(index, marker) || checkDiagonalWin(index, marker)) {
            return 'win';
        }

        //if no win condition fulfilled and board is full, game is a tie
        if (boardFull(board)) {
            return 'tie';
        }
    }

    const checkRowWin = (index, marker) => {
        //evaluate the row that this marker was placed in
        const row = Math.floor(index/3);

        //check for three consecutively-similar markers by moving right within the row
        while (Math.floor(index/3) < row + 1) {
            
        }
    }

    //a round begins when a player leaves a marker at a particular position on the board
    const playRound = (index) => {
        //fetch current player
        const currentPlayer = getCurrentPlayer();

        //indicate start of round
        console.log(`${currentPlayer.name}'s turn`);

        //place marker and check current state of the board
        gameBoard.updateCell(index, currentPlayer.marker)
        
        //check game-completion conditions
        if (evaluateMove(index, currentPlayer.marker) === 'win') {
            console.log(`${currentPlayer.name} wins!`);
        }
        if (evaluateMove(index, currentPlayer.marker) === 'tie') {
            console.log(`Tie game.`);
        }
    }
})();
