const {createNanoEvents} = require("nanoevents");

const POSSIBLE = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const LINE_LENGTH = POSSIBLE.size;

const FIELD_STATI = Object.freeze({
    SOLVED: Symbol("solved"),
    UNSOLVED: Symbol("unsolved")
});

class Position {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }

    equals(other) {
        return this.row === other.row && this.column === other.column;
    }

    toString() {
        return `Position<row ${this.row}, col ${this.column}>`;
    }
}

class Field {
    constructor(idx, number) {
        this._idx = idx;
        this._number = POSSIBLE.has(number) ? number : undefined;
        this.isGiven = POSSIBLE.has(number);
        this._emitter = createNanoEvents();
    }

    get number() {
        return this._number;
    }

    get position() {
        return new Position(Math.floor(this.idx / LINE_LENGTH), this.idx % LINE_LENGTH);
    }

    get idx() {
        return this._idx;
    }

    set number(number) {
        if (this._number !== undefined) throw Error("Number is already set for this field!");
        this._number = number;
        this._emitter.emit("STATUS_CHANGE");
    }

    get status() {
        return this.number === undefined ? FIELD_STATI.UNSOLVED : FIELD_STATI.SOLVED;
    }

    on(event, callback) {
        return this._emitter.on(event, callback);
    }
    toString() {
        return `Field<pos ${this.position.toString()}, number ${this.number}>`;
    }
}


module.exports = {POSSIBLE, FIELD_STATI, Field, Position};