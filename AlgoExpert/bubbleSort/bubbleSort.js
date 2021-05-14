// Re-sort an array of integers in ascending order.
// array = [8, 5, 2, 9, 5, 6, 3]
// result = [2, 3, 5, 5, 6, 8, 9]
function bubbleSort(array) {
    let isSorted = false
    let counter = 0
    while (!isSorted) {
        isSorted = true
        for (let i = 0; i < array.length - 1 - counter; i++) {
            if (array[i] > array[i + 1]) {
                swap(i, i + 1, array)
                isSorted = false
            }
        }
        counter++
    }
    return array
}

function swap(i, y, array) {
    const temp = array[i]
    array[i] = array[y]
    array[y] = temp
}

// Compare from left one to right one, one by one, and swap their places, if the "if" condition continues, isSorted is still false, so re-start the loop.
// (i < array.length - 1), the left one is always 1 less than the right one, the pointer i is the left one.
// (array.length - 1 - counter), each time the loop will push the biggest integer in the end of the array, so, it's out of the loop, then more and more integers will not be counted in the loop.
// Bubble sort doesn't use a helper array, but swap inside itself.