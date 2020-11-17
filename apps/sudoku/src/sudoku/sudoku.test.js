const {FIELDS_FROM_STRING, CREATE_DEFAULT_CONSTRAINT_GROUPS} = require("./sudoku");
const {FIELD_STATI} = require("./fields");

SUDOKU_STRING = "379502000500089603006004925490350000068090537005820091600275300057003086920600750";

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