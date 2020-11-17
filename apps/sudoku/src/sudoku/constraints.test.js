const {Field} = require("./fields");
const {MustContainOnceConstraint, ConstraintGroup} = require("./constraints");

describe('Correct validation of MustContainConstraint', () => {
    it.each`
    fieldNumbers                    | constraintNumbers                 | result
    ${[1, 2, 3, 4, 5, 6, 7, 8, 9]}  | ${[1, 2, 3, 4, 5, 6, 7, 8, 9]}    | ${true}
    ${[9, 2, 3, 4, 5, 6, 7, 8, 9]}  | ${[1, 2, 3, 4, 5, 6, 7, 8, 9]}    | ${false}
    ${[1, 2, 3, 4]}                 | ${[1, 2, 3, 4]}                   | ${true}
    ${[3, 2, 3, 4]}                 | ${[1, 2, 3, 4]}                   | ${false}
    ${[1, 2, 3, 4]}                 | ${[5, 6, 7, 8]}                   | ${false}
    ${[5, 6, 7, 8]}                 | ${[1, 2, 3, 4]}                   | ${false}        
    ${[1, 2, 3, 4, 5]}              | ${[1, 2, 3, 4, 5, 6, 7, 8, 9]}    | ${true}    
    ${[1, 2, 3, 4, 5]}              | ${[2, 3, 4, 5, 6]}                | ${false}    
    ${[1, 2, 3, 4, 5, undefined]}   | ${[1, 2, 3, 4, 5, 6, 7, 8, 9]}    | ${true}
  `('should return $result when $fieldNumbers and $constraintNumbers are used',
        ({fieldNumbers, constraintNumbers, result}) => {
            const fields = Array.from(fieldNumbers).map(i => new Field(i, i)); // fields from 1-9
            const constraint = new MustContainOnceConstraint(constraintNumbers);
            expect(constraint.isValid(fields)).toBe(result);
        });
});


test("ConstraintGroup reliably detects fields via position", () => {
    const field1 = new Field(0, 0);
    const field2 = new Field(1, 0);
    const constraintGroup = new ConstraintGroup([field1], []);
    expect(constraintGroup.hasPosition(field1.position)).toBeTruthy();
    expect(constraintGroup.hasPosition(field2.position)).toBeFalsy();
});

test("ConstraintGroup can validate valid constraints successfully", () => {
    const field = new Field(0, 1);
    const constraintGroup = new ConstraintGroup(
        [field],
        [new MustContainOnceConstraint([1, 2, 3])]
    );
    expect(constraintGroup.isValid()).toBe(true);
});

test("ConstraintGroup can validate invalid constraints successfully", () => {
    const field = new Field(0, 1);
    const constraintGroup = new ConstraintGroup(
        [field],
        [new MustContainOnceConstraint([2])]
    );
    expect(constraintGroup.isValid()).toBe(false);
});