// Write a function that takes in a sorted array of integers as well as a target integer. The function should use the Binary Search algorithm to determine if the target number is contained in the array and should return its index if it is, otherwise -1.
//sample input: [0, 1, 21, 33, 45, 61, 71, 72, 73]
//target = 33
//sample output: 3
function binarySearch(array, target) {
    let left = 0;
    let right = array.length - 1;
    if (!target in array) {
        return -1;
    }
    while (left <= right) {
        const middle = Math.floor((left + right) / 2);
        const potentialIndexed = array[middle];
        if (target === potentialIndexed) {
            return middle;
        } else if (target > potentialIndexed) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }
    return -1;
}
exports.binarySearch = binarySearch;