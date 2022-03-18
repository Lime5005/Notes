//input: [[0,3,4,31], [4,6,30]]
//output: [0,3,4,4,6,30,31]
let arr1 = [0, 3, 4, 31];
let arr2 = [4, 6, 30];

// function mergeSortedArray(arr1, arr2) {
//     let i = 1;
//     let j = 1;
//     const sortedArrayResult = []
//         //fail fast:
//     if (arr1.length === 0) {
//         return arr2;
//     }
//     if (arr2.length === 0) {
//         return arr1;
//     }

//     let arr1Item = arr1[0];
//     let arr2Item = arr2[0];
//     while (arr1Item || arr2Item) {
//即便第二個數列不存在元素了，還將繼續下去
//         if (!arr2Item || arr1Item < arr2Item) {
//             sortedArrayResult.push(arr1Item);
//             arr1Item = arr1[i];
//             i++;
//         } else {
//             sortedArrayResult.push(arr2Item);
//             arr2Item = arr2[j];
//             j++;
//         }
//     }
//     return sortedArrayResult;
// }

// Another solution:
function mergeSortedArray(arr1, arr2) {
    let i = 0;
    let j = 0;
    const sortedArrayResult = [];
    // if (arr1.length === 0) {
    //     return arr2;
    // }
    // if (arr2.length === 0) {
    //     return arr1;
    // }
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            sortedArrayResult.push(arr1[i]);
            i++;
        } else {
            sortedArrayResult.push(arr2[j]);
            j++;
        }
    }
    //即便數量不對等，其中一個已經循環完畢，另一個也會繼續循環下去
    while (i < arr1.length) {
        sortedArrayResult.push(arr1[i]);
        i++;
    }
    while (j < arr2.length) {
        sortedArrayResult.push(arr2[j]);
        j++;
    }
    return sortedArrayResult;
}

console.log(mergeSortedArray(arr1, arr2));