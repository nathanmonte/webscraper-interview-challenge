const simpleFunction = (a,b) => {
    return a + b;
}

test("returns the sum of the two parameters", () => {
    expect(simpleFunction(1,2)).toStrictEqual(3);
})