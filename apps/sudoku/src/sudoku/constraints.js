const {isSuperset, union, intersection, symmetricDifference, difference} = require("./sets");

class Constraint {
    isValid(fields) {
        throw Error("Can't evaluate a base constraint!");
    }
}

class MustContainOnceConstraint extends Constraint {
    constructor(numbers) {
        super();
        this.numbers = new Set(numbers); // is idempotent, so a set or list can be passed as argument
    }

    isValid(fields) {
        let fieldNumbers = fields.map(f => f.number).filter(n => n !== undefined);
        let fieldNumberSet = new Set(fieldNumbers);
        // repetition of numbers is invalid
        if (fieldNumbers.length !== fieldNumberSet.size) return false;
        // numbers outside of constraint are invalid
        if (!isSuperset(this.numbers, fieldNumberSet)) return false;
        // if no failure cases are met, we can be sure it's valid
        return true;
    }
}

class ConstraintGroup {
    constructor(fields, constraints) {
        this.fields = fields;
        this.constraints = constraints;
    }

    hasPosition(position) {
        return this.fields.filter(f => f.position.equals(position)).length > 0;
    }

    isValid() {
        return this.constraints.every(c => c.isValid(this.fields));
    }
}

module.exports = {Constraint, MustContainOnceConstraint, ConstraintGroup};