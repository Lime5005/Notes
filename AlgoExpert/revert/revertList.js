//List [3, 5, 8, 9, 10, 40, 6];

function reverseNum(array) {
    let list = [];

    for (let i = array.length - 1; i >= 0; i--) {
        list.push(array[i]);
    }
    return list;
}
console.log(reverseNum([3, 5, 8, 9, 10, 40, 6]));
//[
//   6, 40, 10, 9,
//   8,  5,  3
// ]