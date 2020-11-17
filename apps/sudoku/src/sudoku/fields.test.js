const {FIELD_STATI, Field} = require("./fields");


test("Field constructor recognizes unsolved status", () => {
    expect((new Field(1)).status).toBe(FIELD_STATI.UNSOLVED);
});


test("Field constructor recognizes solved status", () => {
    expect((new Field(1, 2)).status).toBe(FIELD_STATI.SOLVED);
    expect((new Field(1, 2)).number).toBe(2);
});

test("Field constructor correctly deals with 0-data", () => {
    const field = new Field(1, 0);
        expect(field.number).toBe(undefined);

    expect(field.status).toBe(FIELD_STATI.UNSOLVED);
    expect(field.isGiven).toBe(false);
});

test("Field doesn't accept changed numbers", () => {
    const field = new Field(1, 2);
    expect(field.status).toBe(FIELD_STATI.SOLVED);
    expect(field.number).toBe(2);
    expect(() => field.number = 3).toThrow(Error);
});

test("Field accepts new numbers and emits events", () => {
    const field = new Field(1);
    expect(field.status).toBe(FIELD_STATI.UNSOLVED);
    let emitted = false;
    field.on("STATUS_CHANGE", () => emitted = true);
    field.number = 3;
    expect(emitted).toBeTruthy();
    expect(() => field.number = 4).toThrow(Error);
    expect(field.status).toBe(FIELD_STATI.SOLVED);
    expect(field.number).toBe(3);
});

