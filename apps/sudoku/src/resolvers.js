const knexClient = require("./knexclient");
const {logger} = require("./log");

const createSudoku = (...args) => {
    logger.info("Sudoku endpoint got called!")
    return {
        id: "blub",
        data: "sudoku!!!!"
    }
}

module.exports = {
    createSudoku,
};
