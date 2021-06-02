// A function to sort an integer array from small to big number.
// [2, 8, 4, 3, 1]
// return [1, 2, 3, 4, 8]

function insertionSort(array) {
    array.sort((a, b) => a - b);
    return array;
}