//Check if any two elements in an array of integers sum to a given value:
let arr = [3, 3, 8, 18]
let sum = 6

// function hasPairForSum(arr, sum) {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = i + 1; j < arr.length; j++) {
//             if (arr[i] + arr[j] == sum) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }
// console.log(hasPairForSum(arr, sum))

// A better solution
// function hasPairForSum2(arr, sum) {
//     let obj = {};
//     for (let i = 0; i < arr.length; i++) {
//         let diff = sum - arr[i];
//         if (obj[diff]) {
//             return true;
//         }
//         obj[arr[i]] = true;
//     }
//     return false;
// }
// console.log(hasPairForSum2(arr, sum))

// A similar solution
function hasPairForSum3(arr, sum) {
    const mySet = new Set();
    for (let i = 0; i < arr.length; i++) {
        if (mySet.has(sum - arr[i])) {
            return true;
        }
        mySet.add(arr[i]);
    }
    return false;
}
console.log(hasPairForSum3(arr, sum))

// Another better solution
// function hasPairForSum1(arr, sum) {
//     return arr.some((el, i) => arr.includes(sum - el, i + 1))
// }
// console.log(hasPairForSum1(arr, sum))