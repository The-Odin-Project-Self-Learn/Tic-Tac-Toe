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

    const getBoard = () => board;

    const isValid = (index) => {
        return !(index < 0 || index >= board.length);
    }

    const checkCell = (index) => {
        if (isValid(index)) {
            return board[index];
        } else {
            return 'invalid index';
        }
    }

    const isEmpty = (index) => {
        return (isValid(index) && board[index] === '');
    }

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
    const players = [
        {name: p1Name, marker: 'X'}, 
        {name: p2Name, marker: 'O'}
    ];

    let gameOver = false;

    let currentPlayer = players[0];
    const switchPlayerTurn = () => {
        if (currentPlayer === players[0]) {
            currentPlayer = players[1];
        } else {
            currentPlayer = players[0];
        }
    }

    const getCurrentPlayer = () => currentPlayer;

    const boardFull = (board) => {
        return !(board.includes(''));
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
        //if in a diagonal, then a sequence of matches in the right or left diagonals constitutes a win
        return (
            (board[0] === marker && board[4] === marker && board[8] === marker)
            ||
            (board[2] === marker && board[4] === marker && board[6] === marker)
        );
    }
    

    //determines whether the current move led to game completion
    const evaluateMove = (index, marker) => {
        const board = gameBoard.getBoard();

        if (checkRowWin(board, index, marker) || checkColumnWin(board, index, marker) || checkDiagonalWin(board, index, marker)) {
            return 'win';
        } else if (boardFull(board)) {
            return 'tie';
        } else {
            return null;
        }
    }
    

    //a round begins when a player leaves a marker at a particular position on the board
    const playRound = (index) => {

        if (!gameOver) {
            const update = gameBoard.updateCell(index, currentPlayer.marker)
            if (update != 'successful') {
                return 'unsuccessful move';
            } else {
                const result = evaluateMove(index, currentPlayer.marker);
                if (result == 'win') {
                    gameOver = true;
                    return 'win';
                } else if (result == 'tie') {
                    gameOver = true;
                    return 'tie';
                } else {
                    switchPlayerTurn();
                }
            }
        }
    }

    const resetGame = () => {
        gameBoard.resetBoard();
        gameOver = false;
        currentPlayer = players[0];
    }

    const isGameOver = () => gameOver;

    return {getCurrentPlayer, playRound, resetGame, isGameOver};
})();




//screen controller factory function
const screenController = (() => {
    const cells = document.querySelectorAll('.cell');
    const currentRoundMessage = document.querySelector('p');
    currentRoundMessage.textContent = `${gameController.getCurrentPlayer().name} turn`;

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            playRound(cell, index); 
        });
    });

    //add an event listener to the reset button, which resets the game-state when clicked
    const resetButton = document.querySelector('#reset-button');
    resetButton.addEventListener('click', () => {
        gameController.resetGame();
        cells.forEach((cell) => {
            cell.textContent = '';
        });
        currentRoundMessage.textContent = `${gameController.getCurrentPlayer().name} turn`;
    });

    const playRound = (cell, index) => {
        if (gameController.isGameOver() == true) {return};

        const currentPlayer = gameController.getCurrentPlayer();
        const round = gameController.playRound(index);

        if (round != 'unsuccessful move') {
            cell.textContent = currentPlayer.marker;
            if (round == 'win') {currentRoundMessage.textContent = `${currentPlayer.name} wins!`;} 
            else if (round == 'tie') {currentRoundMessage.textContent = `Tie game`;} 
            else {
                //player has now switched, so update message with new current player reference
                currentRoundMessage.textContent = `${gameController.getCurrentPlayer().name} turn`;
            }
        }
    };
})();

