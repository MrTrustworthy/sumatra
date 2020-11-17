const {Sudoku, FIELDS_FROM_STRING, CREATE_DEFAULT_CONSTRAINT_GROUPS} = require("./sudoku");
const {FIELD_STATI} = require("./fields");

SUDOKU_STRING = "379502000500089603006004925490350000068090537005820091600275300057003086920600750";
WRONG_SUDOKU_STRING = "379512111511189613116114925491351111168191537115821191611275311157113186921611751";
CORRECT_SUDOKU_STRING = "379562148542189673816734925491357862268491537735826491684275319157943286923618754"

test("Successfully create a list of fields from string", () => {
    const fields = FIELDS_FROM_STRING(SUDOKU_STRING);
    expect(fields[0].status).toBe(FIELD_STATI.SOLVED);
    expect(fields[0].idx).toBe(0);
    expect(fields[0].number).toBe(3);
    expect(fields[0].isGiven).toBe(true);

    expect(fields[4].status).toBe(FIELD_STATI.UNSOLVED);
    expect(fields[4].idx).toBe(4);
    expect(fields[4].number).toBe(undefined);
    expect(fields[4].isGiven).toBe(false);
});



test("Successfully create a list of default constraints from", () => {
    const fields = FIELDS_FROM_STRING(SUDOKU_STRING);
    const constraintGroups = CREATE_DEFAULT_CONSTRAINT_GROUPS(fields);
    expect(constraintGroups.length).toBe(3 * 9);
    constraintGroups.forEach(group => {
        expect(group.fields.length).toBe(9);
    });
    fields.forEach(field => {
        expect(constraintGroups.filter(group => group.hasPosition(field.position)).length).toBe(3);
    });
});

test("Unfilled Sudoku from String works for basic checks", () => {
    const sudoku = Sudoku.fromString(SUDOKU_STRING);
    expect(sudoku).toBeDefined();
    expect(sudoku.isValid()).toBe(true);
    expect(sudoku.isFilled()).toBe(false);
    expect(sudoku.isCompleted()).toBe(false);
});

test("Wrongly filled Sudoku from String works for basic checks", () => {
    const sudoku = Sudoku.fromString(WRONG_SUDOKU_STRING);
    expect(sudoku).toBeDefined();
    expect(sudoku.isValid()).toBe(false);
    expect(sudoku.isFilled()).toBe(true);
    expect(sudoku.isCompleted()).toBe(false);
});

test("Correctly filled Sudoku from String works for basic checks", () => {
    const sudoku = Sudoku.fromString(CORRECT_SUDOKU_STRING);
    expect(sudoku).toBeDefined();
    expect(sudoku.isValid()).toBe(true);
    expect(sudoku.isFilled()).toBe(true);
    expect(sudoku.isCompleted()).toBe(true);
});