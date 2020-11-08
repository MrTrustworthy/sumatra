const {isSuperset, union, intersection, symmetricDifference, difference} = require("./sets");

test("Set operations work as expected", () => {
    // Taken from MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
    let setA = new Set([1, 2, 3, 4]);
    let setB = new Set([2, 3]);
    let setC = new Set([3, 4, 5, 6]);

    expect(isSuperset(setA, setB)).toEqual(true);
    expect(union(setA, setC)).toEqual(new Set([1, 2, 3, 4, 5, 6]));
    expect(intersection(setA, setC)).toEqual(new Set([3, 4]));
    expect(symmetricDifference(setA, setC)).toEqual(new Set([1, 2, 5, 6]));
    expect(difference(setA, setC)).toEqual(new Set([1, 2]));

});


