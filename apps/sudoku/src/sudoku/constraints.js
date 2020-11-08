const {isSuperset, union, intersection, symmetricDifference, difference} = require("./sets");

const EVALUATION_RESULT = Object.freeze({
    VALID: Symbol("valid"),
    INVALID: Symbol("invalid")
});

class Constraint {
    validate(fields) {
        throw Error("Can't evaluate a base constraint!");
    }
}

class MustContainOnceConstraint extends Constraint {
    constructor(numbers) {
        super();
        this.numbers = new Set(numbers); // is idempotent, so a set or list can be passed as argument
    }

    validate(fields) {
        let fieldNumbers = fields.map(f => f.number).filter(n => n !== undefined);
        let fieldNumberSet = new Set(fieldNumbers);
        // repetition of numbers is invalid
        if (fieldNumbers.length !== fieldNumberSet.size) return EVALUATION_RESULT.INVALID;
        // numbers outside of constraint are invalid
        if (!isSuperset(this.numbers, fieldNumberSet)) return EVALUATION_RESULT.INVALID;

        return EVALUATION_RESULT.VALID;
    }
}

class ConstraintGroup {
    constructor(fields, constraints) {
        this.fields = fields;
        this.constraints = constraints;
    }
}

module.exports = {EVALUATION_RESULT, Constraint, MustContainOnceConstraint};