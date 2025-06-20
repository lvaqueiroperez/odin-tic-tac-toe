function createPlayerFactory(name) {

    let boardSymbol = "";
    const setBoardSymbol = (symbol) => boardSymbol = symbol;
    const getBoardSymbol = () => boardSymbol;

    return { setBoardSymbol, getBoardSymbol, name };
}

/*
1 2 3
4 5 6
7 8 9
*/
const gameBoardModule = (function () {

    let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const displayBoard = function () {
        console.log(
            `
            ${board[0]}  ${board[1]}  ${board[2]}\n
            ${board[3]}  ${board[4]}  ${board[5]}\n
            ${board[6]}  ${board[7]}  ${board[8]}
            `
        );
    }

    // Los arrays son tratados como objetos especiales, pero siguen siendo objetos!!!
    // No podemos cambiarles un valor así como así, tenemos que acceder a sus índices!
    const resetBoard = function () {
        let counter = 1;
        board.forEach((item, index, array) => {
            array[index] = counter;
            counter++;
        })
    };

    return { board, displayBoard, resetBoard };
})();

// stored objects are references, not copies!
// player 1 always starts
const gameFlowModule = (function (gameBoardModule) {

    let player1 = null;
    let player2 = null;
    let round = 1;
    let activePlayer = null;

    const resetGame = () => {
        round = 1;
        activePlayer = null;
        player1 = null;
        player2 = null;
    }

    const nextRound = () => {
        console.log("NEXT");
        round++;
        activePlayer = round % 2 === 0 ? player2 : player1;
    }

    const startGame = function () {

        gameBoardModule.resetBoard();
        resetGame();

        player1 = createPlayerFactory(prompt("Please, introduce Player 1 name: ", ""));
        player2 = createPlayerFactory(prompt("Please, introduce Player 2 name: ", ""));

        activePlayer = player1;
        player1.setBoardSymbol("O");
        player2.setBoardSymbol("X");

        // typeof null === "object"!
        let result = "";

        do {

            result = playRound();

        } while ((result !== "cancelGame") && (result !== "tie") && (typeof result !== "object"));

        switch (result) {
            case "tie":
                alert("IT'S A TIE!");
                break;
            case "cancelGame":
                alert("CANCELING GAME...");
                break;
            default:
                alert("THE WINNER IS:\n" + result.name);
                break;
        }

    };

    const playRound = function () {

        console.log("*****ROUND " + round + "*****");
        console.log("*****ACTIVE PLAYER: " + activePlayer.name + "*****");

        console.log("BOARD STATE\n");
        gameBoardModule.displayBoard();

        let position = "";

        const regex = /^[1-9]$/;

        do {
            position = prompt("SELECT A POSITION FROM 1 TO 9", "");

            if (position === null) {
                return "cancelGame";
            } else {
                position = +position;
            }

            if (!regex.test(position)) {
                alert("SELECT A VALID POSITION FROM 1 TO 9!");
            }

        } while (!regex.test(position));

        // array-compatible position
        position = position - 1;

        // comprobar que la posición no esté ocupada
        if (isNaN(gameBoardModule.board[position])) {

            alert("POSITION ALREADY OCCUPIED! TRY AGAIN");
            return "occupiedPosition";

        } else {

            gameBoardModule.board[position] = activePlayer.getBoardSymbol();
            console.log("NEW BOARD STATE\n");
            gameBoardModule.displayBoard();

            // there can't be winners until round 5, faster runtime and memory save
            if (round >= 5) {
                winner = checkWinner(player1, player2, round, gameBoardModule.board);

                switch (winner) {

                    case "tie":
                        return "tie";

                    case "continue":
                        nextRound();
                        return "continue";

                    default:
                        return winner;

                }

            } else {
                nextRound();
                return "continue";
            }

        }

    }
    // pendiente: algoritmo que compruebe todo sin necesidad de if/elses...
    // con array.reduce()....
    function checkWinner(player1, player2, round, board) {

        if ((board[0] === board[1] && board[0] === board[2])) {

            return board[0] === "O" ? player1 : player2;


        } else if ((board[3] === board[4] && board[3] === board[5])) {

            return board[3] === "O" ? player1 : player2;

        } else if ((board[6] === board[7] && board[6] === board[8])) {

            return board[6] === "O" ? player1 : player2;

        } else if ((board[0] === board[3] && board[0] === board[6])) {

            return board[0] === "O" ? player1 : player2;

        } else if ((board[1] === board[4] && board[1] === board[7])) {

            return board[1] === "O" ? player1 : player2;

        } else if ((board[2] === board[5] && board[2] === board[8])) {

            return board[2] === "O" ? player1 : player2;

        } else if ((board[0] === board[4] && board[0] === board[8])) {

            return board[0] === "O" ? player1 : player2;

        } else if ((board[2] === board[4] && board[2] === board[6])) {

            return board[2] === "O" ? player1 : player2;

        } else {

            if (round === 9) {

                return "tie";

            } else {
                return "continue"
            }
        }

    }

    return { startGame };

})(gameBoardModule);
