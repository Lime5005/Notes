// Given an array of integers, return a new array with the same integers but squared, each item must be in ascending order.
// {
//     "array": [-3, 1, 2]
// };


function sortedSquaredArray(array) {
    // Write your code here.
    let newArray = []
    for (i = 0; i < array.length; i++) {
        array[i] *= array[i]
        newArray.push(array[i])
    }
    return newArray.sort((a, b) => a - b);
}
// -3 * -3 = 9;
// -10 * 10 = -100;
// 1. Have to resort them after squared.
// (a,b) => a -b;
// 2. If a - b > 0, a > b, a is left, b is right, using a as a pointer for the next comparison, if c > a, c is left, a is right, so (c, a, b)