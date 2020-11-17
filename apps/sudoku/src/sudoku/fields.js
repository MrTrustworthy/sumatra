const {createNanoEvents} = require("nanoevents");

const POSSIBLE = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

const FIELD_STATI = Object.freeze({
    SOLVED: Symbol("solved"),
    UNSOLVED: Symbol("unsolved")
});


class Field {
    constructor(position, number) {
        this._position = position;
        this._number = POSSIBLE.has(number) ? number : undefined;
        this.isGiven = POSSIBLE.has(number);
        this._emitter = createNanoEvents();
    }

    get number() {
        return this._number;
    }

    get position() {
        return this._position;
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
}


module.exports = {POSSIBLE, FIELD_STATI, Field};