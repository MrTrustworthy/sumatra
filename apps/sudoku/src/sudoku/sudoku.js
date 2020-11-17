const {Field, POSSIBLE} = require("./fields");
const {MustContainOnceConstraint, ConstraintGroup} = require("./constraints");

class Sudoku {
    constructor(fields, constraintGroups) {
        this.fields = fields;
        this.constraintGroups = constraintGroups;
    }
}

const FIELDS_FROM_STRING = string => {
    return Array.from(string).map(
        (character, idx) => new Field(idx, parseInt(character, 10))
    );
};

const idxToPosition = (idx) => idx;

const CREATE_DEFAULT_CONSTRAINT_GROUPS = fields => {
    const onceConstraint = new MustContainOnceConstraint(POSSIBLE);
    const fieldGroups = [];

    // horizontal and vertical groups
    [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(idx => {
        fieldGroups.push(fields.filter(field => field.position.row === idx));
        fieldGroups.push(fields.filter(field => field.position.column === idx));
    });

    // block groups in 3x3 steps
    [0, 3, 6].forEach(row => {
        [0, 3, 6].forEach(column => {
            const block = fields.filter(field => {
                let correctRow = field.position.row >= row && field.position.row < row + 3;
                let correctColumn = field.position.column >= column && field.position.column < column + 3;
                return correctRow && correctColumn;
            });
            fieldGroups.push(block);
        });
    });
    return fieldGroups.map(fields => new ConstraintGroup(fields, [onceConstraint]));
};


module.exports = {FIELDS_FROM_STRING, CREATE_DEFAULT_CONSTRAINT_GROUPS};