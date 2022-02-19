// Recursion: Use the sum of int array, multiply by the depth of the array in the whole array.
//let array = [5, 2, [7, -1], 3, [6, [-13, 8], 4]]; // 5+2+(6*2)+3+[(6+(-5*3)+4)*2] = 7+12+3+(-5*2)=22+(-10) = 12
let array = [1, 2, [3], 4, 5]; //12 + 3*2 = 18
let multiplier;

function productSum(array, multiplier = 1) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            sum += productSum(array[i], multiplier + 1);
        } else {
            sum += array[i];
        }
    }
    return sum * multiplier;
}
console.log(productSum(array));