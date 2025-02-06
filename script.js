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
        //check if cell is empty before updating
        if (isValid(index)) {
            if (isEmpty(index)) {
                board[index] = marker;
            } else {
                return 'cell is full';
            }
        } else {
            return 'invalid index';
        }
    }

    return {getBoard, resetBoard, checkCell, updateCell};
})();



/*
Factory function for gameController object, wrapped inside of an IIFE
*/
const gameController = ((p1Name, p2Name) => {
    //obtain current state of the board
    const board = gameBoard.getBoard();

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

    const getCurrentPlayer = () => currentPlayer;

    
})();
