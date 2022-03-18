//Given an array, rotate the array to the right by k steps, where k is non-negative.
//Input: nums = [1,2,3,4,5,6,7], k = 3
// Output: [5,6,7,1,2,3,4]
// Explanation:
// rotate 1 steps to the right: [7,1,2,3,4,5,6]
// rotate 2 steps to the right: [6,7,1,2,3,4,5]
// rotate 3 steps to the right: [5,6,7,1,2,3,4]

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
let nums = [-1, -100, 3, 99]
    //let nums = [1, 2, 3, 4, 5, 6, 7]
let k = 2
var rotate = function(nums, k) {
    let begain = nums.slice(nums.length - k, nums.length)
    console.log(begain) //[ 5, 6, 7 ]

    for (let i = 0; i < k; i++) {
        nums.pop()
    }
    console.log(nums) //[ 1, 2, 3, 4 ]
    return begain.concat(...nums)

};
// var reverseHelper = (nums, start, end) => {
//     while (start < end) {
//         let temp = nums[start];
//         nums[start] = nums[end];
//         nums[end] = temp;
//         start++;
//         end--;
//     }
// };

// var rotate = function(nums, k) {
//     k = k % nums.length;
//     nums.reverse()
//     reverseHelper(nums, 0, k - 1);
//     reverseHelper(nums, k, nums.length - 1);
//     return nums;
// };
//console.log(rotate(nums, k)) //[5, 6, 7, 1, 2, 3, 4]
console.log(rotate(nums, k)); //[ 3, 99, -1, -100 ]