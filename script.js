/*
Factory function for gameBoard object, wrapped inside of an IIFE so that only one gameBoard can be
created at a time
*/
const gameBoard = (() => {
    let board = new Array(9).fill('');
    /*
    [
        '', '', '',
        '', '', '',
        '', '', ''
    ] 
    */
    const resetBoard = () => {
        board.fill('');
    }
    
    //make the board state accessible outside of the factory
    const getBoard = () => board;

    //returns true if given cell exists on the board
    const isValid = (index) => {
        return !(index < 0 || index >= board.length);
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
        return (isValid(index) && board[index] === '');
    }

    //update cell with a particular marker at the given index
    const updateCell = (index, marker) => {
        if (isValid(index) && isEmpty(index)) {
            board[index] = marker;
            return 'successful';
        } else {
            return 'unsuccessful';
        }
    }

    return {getBoard, resetBoard, updateCell};
})();



/*
Factory function for gameController object, wrapped inside of an IIFE
*/
const gameController = ((p1Name = "P1", p2Name = "P2") => {
    //create two players based on names passed in to controller
    const players = [
        {name: p1Name, marker: 'X'}, 
        {name: p2Name, marker: 'O'}
    ];

    //game-state flag
    let gameOver = false;

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

    //returns true if board does not contain any empty string
    const boardFull = () => {
        return !(gameBoard.getBoard().includes(''));
    }

    //checks to see if the marker that the player just put down results in a row-win condition
    const checkRowWin = (board, index, marker) => {
        //evaluate the row that this marker was placed in
        const row = Math.floor(index/3);

        //obtain the upper and lower index bounds of this row
        const lowerBound = row * 3;
        const upperBound = row * 3 + 2;

        //once lower and upper bounds obtained, check the markers at all indices between these bounds
        let matchingMarkers = 0;
        let pointer = lowerBound;
        while (pointer <= upperBound) {
            if (board[pointer] === marker) {
                matchingMarkers++;
            }
            pointer++;
        }

        //return (board[lowerBound] === marker && board[lowerBound + 1] === marker && board[upperBound === marker]);
        return (matchingMarkers === 3);
    }

    //checks to see if the marker that the player just put down results in a column-win condition
    const checkColumnWin = (board, index, marker) => {
        //evaluate the column that this marker was placed in
        const column = index % 3;

        //obtain the upper and lower index bounds of this column
        const lowerBound = column;
        const upperBound = column + 6;

        //once lower and upper bounds obtained, check the markers at all indices between these bounds
        let matchingMarkers = 0;
        let pointer = lowerBound;
        while (pointer <= upperBound) {
            if (board[pointer] === marker) {
                matchingMarkers++;
            }
            pointer+=3;
        }

        return (matchingMarkers === 3);
    }

    //checks to see if the marker that the player just put down results in a diagonal-win condition
    const checkDiagonalWin = (board, index, marker) => {
        //first determine whether the marker was placed at an index that belongs to a diagonal
        const inDiagonal = (index % 2) == 0;

        //if not in a diagonal, return early
        if (inDiagonal == false) {
            return false;
        } else {
            //if in a diagonal, then a sequence of matches in the right or left diagonals constitutes a win
            return (
                (board[0] === marker && board[4] === marker && board[8] === marker)
                ||
                (board[2] === marker && board[4] === marker && board[6] === marker)
            );
        }
    }

    //determines whether the current move led to game completion
    const evaluateMove = (index, marker) => {

        //check for win in all directions from position of currently-placed marker
        if (checkRowWin(gameBoard.getBoard(), index, marker) || checkColumnWin(gameBoard.getBoard(), index, marker) || checkDiagonalWin(gameBoard.getBoard(), index, marker)) {
            return 'win';

        //if no win condition fulfilled and board is full, game is a tie
        } else if (boardFull()) {
            return 'tie';

        } else {
            return null;
        }
    }

    const printNewRound = () => {
        const currentPlayer = getCurrentPlayer();
        console.log(`${currentPlayer.name}'s turn`);
    }

    //a round begins when a player leaves a marker at a particular position on the board
    const playRound = (index) => {

        if (!gameOver) {
            //place marker and check current state of the board
            const update = gameBoard.updateCell(index, currentPlayer.marker)

            if (update != 'successful') {
                console.log('invalid move');
            } else {
                //check game-completion conditions based on board-state if cell update is successful
                const result = evaluateMove(index, currentPlayer.marker);
                if (result == 'win') {
                    gameOver = true;
                    console.log(`${currentPlayer.name} wins!`);
                    return;
                } else if (result == 'tie') {
                    gameOver = true;
                    console.log('Tie game.');
                    return;
                } else {
                    switchPlayerTurn();
                    printNewRound();
                }
            }
        } else {
            resetGame();
            return;
        }
    }

    //starts a new game by resetting the board, the flag, and the current player
    const resetGame = () => {
        console.log('new game..');
        gameBoard.resetBoard();
        gameOver = false;
        currentPlayer = players[0];
    }

    return {playRound, resetGame};
})();


const game = gameController();

