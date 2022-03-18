// Input: nums = [1,2,3,1]
// Output: true
/**
 * @param {number[]} nums
 * @return {boolean}
 */
// var containsDuplicate = function(nums) {
//     let newArray = nums.filter((item, index) => nums.indexOf(item) != index)
//     if (newArray.length > 0) {
//         return true;
//     }
//     return false;
// };
//O(n)
//O(n)


//Better solution: faster
var containsDuplicate = function(nums) {
    let set = new Set();
    for (let i = 0; i < nums.length; i++) {
        if (set.has(nums[i])) {
            return true;
        }
        set.add(nums[i]);
    }
    return false;
};
console.log(containsDuplicate([1, 2, 3, 1]))