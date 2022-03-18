// Input: nums = [0,1,0,3,12]
// Output: [1,3,12,0,0]
//A two-pointer approach could be helpful here. The idea would be to have one pointer for iterating the array and another pointer that just works on the non-zero elements of the array.
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
let nums = [0, 1, 0, 3, 12]
    //let nums = [0]
    //My solution:
    // function moveZeroes(nums) {
    //     let newArray = nums.filter(num => num != 0);
    //     console.log(newArray)
    //     let ls = nums.length - newArray.length
    //     for (let i = 0; i < ls; i++) {
    //         newArray.push(0)
    //     }
    //     return newArray
    // };
    // Another solution:
    //var moveZeroes = function(nums) {
function moveZeroes(nums) {
    let i = 0;
    let j = 0;

    while (j < nums.length) {
        if (nums[j] !== 0) {
            nums[i] = nums[j];
            i++;
        }
        j++;
    }
    console.log(nums)
    while (i < nums.length) {
        nums[i] = 0;
        i++;
    }
    console.log(nums) //[ 1, 3, 12, 0, 0 ]
    return nums;
};
console.log(moveZeroes(nums))