// {
//   "arrayOne": [-1, 5, 10, 20, 28, 3],
//   "arrayTwo": [26, 134, 135, 15, 17]
// } //比较两个数组，每个数组中各提取一个数字，这两个数字的相差是所有其它所在组内相比最小的。
function smallestDifference(arrayOne, arrayTwo) {
    //By default, the sort() function sorts values as strings.
    sortedOne = arrayOne.sort((a, b) => a - b); //不可以简写，因为sort()方法默认是按照字符串排序的，数字排序不一定准确。
    sortedTwo = arrayTwo.sort((a, b) => a - b);
    let idxOne = 0;
    let idxTwo = 0;
    let smallest = Infinity; //所有的可能，代表无限大，all iteration's difference
    let currentDiff = Infinity; //current difference
    let smallestPair = []; // keep track
    while (idxOne < arrayOne.length && idxTwo < arrayTwo.length) {
        let firstNum = arrayOne[idxOne];
        let secondNum = arrayTwo[idxTwo];
        if (firstNum < secondNum) {
            currentDiff = secondNum - firstNum;
            idxOne++; // left pointer move forward
        } else if (firstNum > secondNum) {
            currentDiff = firstNum - secondNum;
            idxTwo++; // right pointer move forward
        } else {
            return [firstNum, secondNum];
        }
        if (smallest > currentDiff) { //smallest是绝对大于目前的差额的，这里是更新最小值
            smallest = currentDiff;
            smallestPair = [firstNum, secondNum];
        }
    }
    return smallestPair;
}

// Do not edit the line below.
exports.smallestDifference = smallestDifference;