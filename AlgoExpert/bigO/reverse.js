let str = 'Hi My name is Lime';
//emiL si eman yM iH
// function myReverse(str) {
//     //let list = str.split('');
//     let array = [];
//     for (let i = str.length - 1; i >= 0; i--) {
//         array.push(str[i]);
//     }
//     return array.join(''); // Why? otherwise it will return letters one by one
// }

// console.log(myReverse(str));

// Better solution: using the built-in reverse function
function myReverse1(str) {
    return str.split('').reverse().join('');
}
console.log(myReverse1(str));