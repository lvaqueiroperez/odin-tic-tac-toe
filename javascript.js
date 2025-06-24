function createPlayerFactory(name) {

    let color = "";
    let boardSymbol = "";
    const setBoardSymbol = (symbol) => boardSymbol = symbol;
    const getBoardSymbol = () => boardSymbol;
    const setColor = (newColor) => color = newColor;
    const getColor = () => color;


    return { setBoardSymbol, getBoardSymbol, name, setColor, getColor };
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

    const startGame = function (player1Name, player2Name, gameBoardContainer, cancelButton, startGameBtn, gameInfo) {

        gameBoardModule.resetBoard();
        resetGame();

        player1 = createPlayerFactory(player1Name);
        player2 = createPlayerFactory(player2Name);

        activePlayer = player1;
        player1.setBoardSymbol("O");
        player2.setBoardSymbol("X");
        player1.setColor("green");
        player2.setColor("blue");

        // typeof null === "object"!
        let result = "";

        cancelButton.addEventListener("click", (e) => {
            alert("CANCELING...");
            startGameBtn.style["display"] = "block";
            cancelButton.style["display"] = "none";
            gameBoardContainer.querySelectorAll("div").forEach((square) => { square.style["border-color"] = "black" });
            resetGame();
            gameBoardModule.resetBoard();
            // PENDIENTE: QUITAR ESTE EVENT LISTENER, ANTES REVISAR TODO EL CÓDIGO QUE ESTÉ ORDENADO, VITAL HACER NOTAS Y ESQUEMA
            // REBUSCAR CON LA FUNCIÓN "BIND"
            // gameBoardContainer.removeEventListener("click");
        });

        gameBoardContainer.addEventListener("click", (e) => {

            if ((e.target.className.at(0) === "s")) {
                console.log("square: " + e.target.className);

                result = playRound(+e.target.className.slice(-1), gameBoardContainer);

                switch (result) {
                    case "tie":
                        alert("IT'S A TIE! END OF THE GAME");
                        break;
                    case "cancelGame":
                        alert("CANCELING GAME...");
                        break;
                    case "occupiedPosition":
                        alert(activePlayer.name + "TRY AGAIN");
                        break;
                    case "continue":
                        alert(activePlayer.name + "TURN");
                        break;
                    default:
                        alert("THE WINNER IS:\n" + result.name + "\nEND OF THE GAME");
                        break;
                }

            }

        });

        /*
        do {

            gameInfo.textContent = activePlayer.name + " TURN!"

            // en vez de este dowhile y la función "playRound", 
            // poner un event listener que se encargue de todo, reciclar funcionalidades ya hechas
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
*/
    };


    const playRound = function (position, gameBoardContainer) {

        console.log("*****ROUND " + round + "*****");
        console.log("*****ACTIVE PLAYER: " + activePlayer.name + "*****");

        console.log("BOARD STATE\n");
        gameBoardModule.displayBoard();

        // array-compatible position
        console.log(position);

        // comprobar que la posición no esté ocupada
        if (isNaN(gameBoardModule.board[position])) {

            alert("POSITION ALREADY OCCUPIED! TRY AGAIN");
            return "occupiedPosition";

        } else {

            gameBoardModule.board[position] = activePlayer.getBoardSymbol();
            // querySelector no soporta IDs que empiecen por un número!
            console.log(gameBoardContainer);
            gameBoardContainer.querySelector(".s" + position).style["border-color"] = activePlayer.getColor();
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

// depender también del gameFlow?
const domLogicAndDisplayModule = (function (gameBoardModule, gameFlowModule) {

    const gameBoardContainer = document.querySelector(".gameBoardContainer");
    const squaresArray = Array.from(document.querySelectorAll(".gameBoardContainer>div"));
    const startGameBtn = document.querySelector("form button");
    const cancelButton = document.querySelector(".cancelButton");
    const gameInfo = document.querySelector(".gameInfoContainer>h2");

    startGameBtn.style["display"] = "block";
    cancelButton.style["display"] = "none";

    // al ser una IIFE, la función ya pondrá al principio el contenido del board inicial
    // sin que tengamos que hacer nada
    for (let i = 0; i < gameBoardModule.board.length; i++) {
        squaresArray[i].textContent = gameBoardModule.board[i];
    }

    startGameBtn.addEventListener("click", (e) => {

        const player1Name = document.querySelector("#player1Name").value;
        const player2Name = document.querySelector("#player2Name").value;

        if ((player1Name !== "") && (player2Name !== "")) {

            startGameBtn.style["display"] = "none";
            cancelButton.style["display"] = "block";
            // game start con los nombres como parámetros, y los nodos del dom necesarios
            gameFlowModule.startGame(player1Name, player2Name, gameBoardContainer, cancelButton, startGameBtn, gameInfo);

        } else {
            alert("Please, enter a name for both players!");
        }

    });


})(gameBoardModule, gameFlowModule);
