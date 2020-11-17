const {FIELDS_FROM_STRING} = require("./sudoku");
const {FIELD_STATI} = require("./fields");

SUDOKU_STRING = "379502000500089603006004925490350000068090537005820091600275300057003086920600750";

test("Successfully create a list of fields from string", () => {
    const fields = FIELDS_FROM_STRING(SUDOKU_STRING);
    expect(fields[0].status).toBe(FIELD_STATI.SOLVED);
    expect(fields[0].position).toBe(1);
    expect(fields[0].number).toBe(3);
    expect(fields[0].isGiven).toBe(true);

    expect(fields[4].status).toBe(FIELD_STATI.UNSOLVED);
    expect(fields[4].position).toBe(5);
    expect(fields[4].number).toBe(undefined);
    expect(fields[4].isGiven).toBe(false);

});