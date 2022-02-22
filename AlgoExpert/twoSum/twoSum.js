// Find two integers in an array that the sum is equal to targetSum, and return them in a new array

// {
//     "array": [3, 5, -4, 8, 11, 1, -1, 6],
//     "targetSum": 10
// }
let array = [3, 5, -4, 8, 11, 1, -1, 6]
let targetSum = 10

// function twoNumberSum(array, targetSum) {
//     let result = []
//     for (let i = 0; i < array.length - 1; i++) {
//         for (let y = i + 1; y < array.length; y++) {
//             if (array[i] + array[y] === targetSum) {
//                 result.push(i)
//                 result.push(y)
//                 return result
//             }
//         }
//     }
//     return result //[ 4, 6 ], O(n^2), O(n)
// }
// The index of array starts at 0, the total numbers in an array is array.length, let i and y covered all the numbers in the array. Note that y = i + 1, not y = 1, so y is changing constantly with i.

// Better solution:
function twoNumberSum(arr, sum) {
    const aSet = new Set();
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (aSet.has(sum - arr[i])) {
            result.push(i);
            result.push(array.indexOf(sum - arr[i]));
            return result.sort((a, b) => a - b);
        }
        aSet.add(arr[i]);
    }
    return result; //[ 4, 6 ], O(n), O(n)
}
console.log(twoNumberSum(array, targetSum))