const {Field} = require("./fields");

class Sudoku {
    constructor(fields, constraintGroups) {
        this.fields = fields;
        this.constraintGroups = constraintGroups;
    }


}

const FIELDS_FROM_STRING = function (string) {
    return Array.from(string).map(
        (character, idx) => new Field(idx + 1, parseInt(character, 10))
    );
};

module.exports = {FIELDS_FROM_STRING};