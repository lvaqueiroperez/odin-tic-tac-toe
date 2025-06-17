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
    let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const checkBoard = function (board) {

        // 4 COMPROBACIONES tras la 5ª iteracción de los usuarios para ahorrar memoria (antes es imposible que ocurra)
        // solo comprobamos item[0] item[1] item[2] e item[0] item[3] item[6]

        // item === posicion item +1 === posicion item +2 --> 3 en raya horizontal
        // item posicion item +3 posicion item +6 --> 3 en raya vertical
        // item posicion item +4 posicion item +8 --> 3 en raya diagonal desde arriba izquierda
        // item posicion item +2 posicion item +4 -->  3 en raya diagona desde arriba derecha



    }

    return { board, checkBoard };
})();

const gameFlowModule = (function (player1, player2, board) {
    // recordar que en los objetos, al crear "copias" se almacena una referencia al objeto, no un objeto nuevo como copia!!!
    // son 9 rondas por juego

    let round = 1;

    player1.setBoardSymbol("O");
    player2.setBoardSymbol("X");

    let activePlayer = player1;


    const playRound = function (position) {
        console.log("ACTIVE PLAYER: " + activePlayer.name);
        console.log("BOARD STATE\n" + board.board);

        board.board[position] = activePlayer.getBoardSymbol();
        console.log("BOARD STATE\n" + board.board);
        round++;
        activePlayer = round % 2 === 0 ? player2 : player1;

        console.log("ACTIVE PLAYER: " + activePlayer.name);
        // check board
    }

    return { playRound };


})(
    createPlayer("Player1"),
    createPlayer("Player2"),
    gameBoard
);
