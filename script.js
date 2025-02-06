const gameBoard = (() => {
    const board = []; 
    const cells = 9;

    //populate the board with empty space
    /*
    [
        [''], [''], ['']
        [''], [''], [''],
        [''], [''], ['']
    ] 
    */
    const resetBoard = () => {
        for (let i = 0; i < cells; i++) {
            board[i] = [];
            board[i].push('');
        }
    }
    
    //make the board state accessible outside of the factory
    const getBoard = () => board;

    //checks the value in the cell positioned at the given index
    const checkCell = (index) => {
        if (index < 0 | index >= board.length) {
            return 'non-existent cell';
        }
        
        if (board[index].includes("X")) {
            return 'X';
        }

        if (board[index].includes("O")) {
            return 'O';
        }
    }

    //update cell with a particular marker at the given index
    const updateCell = (index, marker) => {
        
    } 


})();



