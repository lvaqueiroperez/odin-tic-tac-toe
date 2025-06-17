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

    return { board };
})();



