//array = [12, 3, 1, 2, -6, 5, -8, 6]
//targetSum = 0;
// output = [[-8,2,6],[-8,3,5],[-6,1,5]]
// 解决方案：先整理数组从小到大，从左边最小的开始算哪两个数相加可以等于它，它的右边一位和最后一位相加是多少？然后左右各移动一位的方式多退少补，直到这第一位的和各种可能都算完了，再接着拿第二位开始算，直到所有数的和都算完了。
// time = o[n^2], space = o[n]
function threeNumberSum(array, targetSum) {

    array.sort((a, b) => a - b); //Sort the whole array from small to big.
    const triplets = [];
    for (let i = 0; i < array.length - 2; i++) { // i++ 继续拿下一位当求和的基数, array.length - 2, 因为需要至少2位数相加.
        let left = i + 1; // i = array[0], left = array[1].
        let right = array.length - 1; //The last number of the array.
        while (left < right) { // If the right pointer point to left of the left pointer, then stop.
            const sum = array[i] + array[left] + array[right];
            if (sum === targetSum) {
                triplets.push([array[i], array[left], array[right]]);
                left++;
                right--; //不多不少的情况下，两个指针要同时移动看下一个可能，不然不是多就是少了。
            } else if (sum < targetSum) { // -1 < 0, need a bigger number from left.
                left++; //Move the pointer to right.
            } else { // 2 > 0, need a smaller number from right.
                right--; //move the pointer to left.
            }
        }
    }
    return triplets;
}

exports.threeNumberSum = threeNumberSum;