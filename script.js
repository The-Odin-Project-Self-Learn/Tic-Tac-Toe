const gameBoard = (() => {
    const board = []; 
    const rows = 3;
    const columns = 3;
     /*
    [
        [''], [''], ['']
        [''], [''], [''],
        [''], [''], ['']
    ] 
    */

    //populate the board with empty space
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push('');
        }
    }

    //make the board state accessible outside of the factory
    const getBoard = () => board;

});



