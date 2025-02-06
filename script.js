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

    //check conditions of game
    const evaluateMove = (board, index) => {
        //check for win



        //check for tie
    }

    //a round begins when a player leaves a marker at a particular position on the board
    const playRound = (index) => {
        //fetch current player
        const currentPlayer = getCurrentPlayer();

        //indicate start of round
        console.log(`${currentPlayer}'s turn`);

        //place marker and check current state of the board
        gameBoard.updateCell(index, currentPlayer.marker)
        const board = gameBoard.getBoard();
        
        //check win conditions
        if (evaluateMove(gameBoard.getBoard(), index) === 'win') {
            console.log(`${getCurrentPlayer().name} wins!`);
        }

        
    }
})();
