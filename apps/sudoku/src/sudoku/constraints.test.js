const {Field} = require("./fields");
const {MustContainOnceConstraint, EVALUATION_RESULT, ConstraintGroup} = require("./constraints");

describe('Correct validation of MustContainConstraint', () => {
    it.each`
    fieldNumbers                    | constraintNumbers                 | result
    ${[1, 2, 3, 4, 5, 6, 7, 8, 9]}  | ${[1, 2, 3, 4, 5, 6, 7, 8, 9]}    | ${EVALUATION_RESULT.VALID}
    ${[9, 2, 3, 4, 5, 6, 7, 8, 9]}  | ${[1, 2, 3, 4, 5, 6, 7, 8, 9]}    | ${EVALUATION_RESULT.INVALID}
    ${[1, 2, 3, 4]}                 | ${[1, 2, 3, 4]}                   | ${EVALUATION_RESULT.VALID}
    ${[3, 2, 3, 4]}                 | ${[1, 2, 3, 4]}                   | ${EVALUATION_RESULT.INVALID}
    ${[1, 2, 3, 4]}                 | ${[5, 6, 7, 8]}                   | ${EVALUATION_RESULT.INVALID}
    ${[5, 6, 7, 8]}                 | ${[1, 2, 3, 4]}                   | ${EVALUATION_RESULT.INVALID}        
    ${[1, 2, 3, 4, 5]}              | ${[1, 2, 3, 4, 5, 6, 7, 8, 9]}    | ${EVALUATION_RESULT.VALID}    
    ${[1, 2, 3, 4, 5]}              | ${[2, 3, 4, 5, 6]}                | ${EVALUATION_RESULT.INVALID}    
    ${[1, 2, 3, 4, 5, undefined]}   | ${[1, 2, 3, 4, 5, 6, 7, 8, 9]}    | ${EVALUATION_RESULT.VALID}
  `('should return $result when $fieldNumbers and $constraintNumbers are used',
        ({fieldNumbers, constraintNumbers, result}) => {
            const fields = Array.from(fieldNumbers).map(i => new Field(i, i)); // fields from 1-9
            const constraint = new MustContainOnceConstraint(constraintNumbers);
            expect(constraint.validate(fields)).toBe(result);
        });
});


test("ConstraintGroup reliably detects fields via position", () => {
    const field1 = new Field(0, 0);
    const field2 = new Field(1, 0);
    const constraintGroup = new ConstraintGroup([field1], []);

    expect(constraintGroup.hasPosition(field1.position)).toBeTruthy();
    expect(constraintGroup.hasPosition(field2.position)).toBeFalsy();

});