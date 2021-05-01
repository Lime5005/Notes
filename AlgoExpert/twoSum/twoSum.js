// Find two integers in an array that the sum is equal to targetSum, and return them in a new array

// {
//     "array": [3, 5, -4, 8, 11, 1, -1, 6],
//     "targetSum": 10
// }

function twoNumberSum(array, targetSum) {
    let result = []
    for (let i = 0; i < array.length - 1; i++) {
        for (let y = i + 1; y < array.length; y++) {
            if (array[i] + array[y] === targetSum) {
                result.push(array[i])
                result.push(array[y])
                return result
            }
        }
    }
    return result
}
// The index of array starts at 0, the total numbers in an array is array.length, let i and y covered all the numbers in the array. Note that y = i + 1, not y = 1, so y is changing constantly with i.