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
    let board = [];

    return { board };
})();



