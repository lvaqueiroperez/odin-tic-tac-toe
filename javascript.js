function createPlayer(name) {
    let gamesWon = 0;
    const giveWin = () => gamesWon++;
    const getWins = () => gamesWon;
    let boardSymbol = "";
    const setBoardSymbol = (symbol) => boardSymbol = symbol;
    const getBoardSymbol = () => boardSymbol;

    return { giveWin, getWins, setBoardSymbol, getBoardSymbol, name };
}

const gameBoard = (function () {
    // 9 posiciones fijas
    let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const displayBoard = () => console.log(
        `${board[0]}  ${board[1]}  ${board[2]}\n${board[3]}  ${board[4]}  ${board[5]}\n${board[6]}  ${board[7]}  ${board[8]}`
    );

    const checkWinner = function (player1, player2, round) {

        let winner = null;

        // horizontal
        if ((board[0] === board[1] && board[0] === board[2]) ||
            (board[3] === board[4] && board[3] === board[5]) ||
            (board[6] === board[7] && board[6] === board[8])) {

            winner = player1.getBoardSymbol() === board[0] ? player1 : player2;
            console.log("ROUND " + round + "WINNER IS: " + winner.name);
            winner.giveWin();

            // vertical        
        } else if ((board[0] === board[3] && board[0] === board[6]) ||
            (board[1] === board[4] && board[1] === board[7]) ||
            (board[2] === board[5] && board[2] === board[8])) {

            winner = player1.getBoardSymbol() === board[0] ? player1 : player2;
            console.log("ROUND " + round + "WINNER IS: " + winner.name);
            winner.giveWin();

            // diagonal
        } else if ((board[0] === board[4] && board[0] === board[8]) ||
            (board[2] === board[4] && board[2] === board[6])) {

            winner = player1.getBoardSymbol() === board[0] ? player1 : player2;
            console.log("ROUND " + round + "WINNER IS: " + winner.name);
            winner.giveWin();

        } else {
            console.log("NO WINNER YET");
        }

    }

    return { board, checkWinner, displayBoard };
})();

// recordar que en los objetos, al crear "copias" se almacena una referencia al objeto, no un objeto nuevo como copia!!!
// son 9 rondas por juego o hasta que alguien gane
const gameFlowModule = (function (player1, player2, board) {

    let round = 1;

    // player 1 siempre empieza
    player1.setBoardSymbol("O");
    player2.setBoardSymbol("X");

    let activePlayer = player1;


    const playRound = function (position) {
        console.log("ACTIVE PLAYER: " + activePlayer.name);
        console.log("BOARD STATE\n" + board.displayBoard());

        board.board[position] = activePlayer.getBoardSymbol();
        console.log("NEW BOARD STATE\n" + board.displayBoard());
        round++;
        activePlayer = round % 2 === 0 ? player2 : player1;

        console.log("ACTIVE PLAYER: " + activePlayer.name);

        if (round >= 5) {
            // check board
            board.checkWinner(player1, player2, round);
        }
    }

    return { playRound };


})(
    createPlayer("Player1"),
    createPlayer("Player2"),
    gameBoard
);
