const arr1 = ['a', 'b', 'c', 'd']
const arr2 = ['x', 'y', 'c']

function containsSameLetter(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                return true;
            }
        }
    }
    return false;
}
// console.log(containsSameLetter(arr1, arr2))

// Better solution
function containsSameLetter1(arr1, arr2) {
    return arr1.some(el => arr2.includes(el))
}
console.log(containsSameLetter1(arr1, arr2))