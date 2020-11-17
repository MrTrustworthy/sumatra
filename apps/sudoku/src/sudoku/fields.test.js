const {FIELD_STATI, Field, Position} = require("./fields");


test("Field constructor recognizes unsolved status", () => {
    expect((new Field(0)).status).toBe(FIELD_STATI.UNSOLVED);
});


test("Field constructor recognizes solved status", () => {
    expect((new Field(0, 2)).status).toBe(FIELD_STATI.SOLVED);
    expect((new Field(0, 2)).number).toBe(2);
});

test("Field constructor resolved positions", () => {
    expect((new Field(0)).position).toEqual(new Position(0, 0));
    expect((new Field(8)).position).toEqual(new Position(0, 8));
    expect((new Field(9)).position).toEqual(new Position(1, 0));
    expect((new Field(13)).position).toEqual(new Position(1, 4));
    expect((new Field(19)).position).toEqual(new Position(2, 1));
    expect((new Field(80)).position).toEqual(new Position(8, 8));

});

test("Field constructor correctly deals with 0-data", () => {
    const field = new Field(0, 0);
    expect(field.number).toBe(undefined);

    expect(field.status).toBe(FIELD_STATI.UNSOLVED);
    expect(field.isGiven).toBe(false);
});

test("Field doesn't accept changed numbers", () => {
    const field = new Field(0, 2);
    expect(field.status).toBe(FIELD_STATI.SOLVED);
    expect(field.number).toBe(2);
    expect(() => field.number = 3).toThrow(Error);
});

test("Field accepts new numbers and emits events", () => {
    const field = new Field(0);
    expect(field.status).toBe(FIELD_STATI.UNSOLVED);
    let emitted = false;
    field.on("STATUS_CHANGE", () => emitted = true);
    field.number = 3;
    expect(emitted).toBeTruthy();
    expect(() => field.number = 4).toThrow(Error);
    expect(field.status).toBe(FIELD_STATI.SOLVED);
    expect(field.number).toBe(3);
});

