// In two arrays of integers, check if one is the subsequence of the other, means one contains all the integers that the other has in the same order.
// {
//   "array": [5, 1, 22, 25, 6, -1, 8, 10],
//   "sequence": [1, 6, -1, 10]
// }
function isValidSubsequence(array, sequence) {
    let arrIdx = 0
    let seqIdx = 0
    while (arrIdx < array.length && seqIdx < sequence.length) {
        if (sequence[seqIdx] === array[arrIdx]) {
            seqIdx++
        }
        arrIdx++
    }
    return seqIdx === sequence.length
}
// Note seqIdx++ must be before arrIdx++ in a while loop. We use the sequence array's first integer as a pointer, loop through the main array to find it first, then look for the next one.