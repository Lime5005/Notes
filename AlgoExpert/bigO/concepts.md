### Big O measures how quickly our runtime or space   grows as our input size grows.使用字母 O 是因为函数的增长率也称为函数的阶数(order of the function)  
#### O(n): Linear time 
```js
const compressAllBoxes = boxes => {
  boxes.forEach(box => console.log(box));
}
```
##### O(1): Constant time
```js
function compressFirstBox(boxes) {
  console.log(boxes[0]);
}
```

- A test: how long does it take to run this function?
```js
function funChallenge(input) {
  let a = 10; // O(1)
  a = 50 +3; // O(1)
  for (let i = 0; i< input.length; i++) { // O(n), All things in the loop must run n times, n means the input size.
    anotherFunction(); // O(n)
    let stranger = true; // O(n)
    a++; // O(n)
  }
  return a; // O(1)
}
//To run funChallenge(), you have Big O (3 + 4n), it's O(n)
```
- Another test:  
```js
// What is the Big O of the below function? (Hint, you may want to go line by line)
function anotherFunChallenge(input) {
  let a = 5; // O(1)
  let b = 10; //O(1)
  let c = 50; //O(1)
  for (let i = 0; i < input; i++) {
    let x = i + 1; //O(n)
    let y = i + 2; //O(n)
    let z = i + 3; //O(n)

  }
  for (let j = 0; j < input; j++) {
    let p = j * 2; //O(n)
    let q = j * 2; //O(n)
  }
  let whoAmI = "I don't know"; //O(1)
}
// Answer: O(n)
```
- Make code more efficient:
```js
function findNemo(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === 'nemo') {
      console.log('Found Nemo');
      break; // with is line, the loop will stop after finding the first Nemo.
    }
  }
}
```
### Rules:
1, Always think about the worst case scenario first, i.e, the "Nemo" is in the end of the array.  
2, Drop constants from the equation, i.e, O(n/2+100) = O(n), O(2n) = O(n)  
- A test:
```js
function compressBoxesTwice(boxes, boxes2) {
  boxes.forEach(box => console.log(box));
  boxes2.forEach(box => console.log(box));
}
// Answer: O(a+b), != O(n), because we have two inputs.
```
- Another test:   
```js
// A nested loop
const boxes = ['a', 'b', 'c', 'd', 'e'];
function logAllPairsOfArray(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j ++) {
      console.log(array[i], array[j]);
    }
  }
}
logAllPairsOfArray(boxes)
// Answer: O(n * n) = O(n^2), 以平方次的量增長
```
3, Different variables for different inputs: `O(a+b)`, not `O(n)`, or `O(a*b)`, not `O(n*n)`.  

#### O(n^2) - Quadratic time
```js
function printAllNumbersThenAllPairSums(numbers) {
  console.log('these are the numbers: ');
  numbers.forEach(number => console.log(number));
  console.log('and these are their sums: ');
  numbers.forEach(firstNumber => {
    numbers.forEach(secondNumber => {
      console.log(firstNumber + secondNumber);
    });
  });// This part is more complicated to predict for scaling.
  // If there are 3 nested loops, then the answer is O(n^3), usually you are doing a bad job for scaling.
}
// Answer: O(n + n^2) = O(n^2), only keep the dominant term.
// Think about f(x) = 6x^4 − 2x^3 + 5, what is the dominant term? Answer: O(n^4)
```

#### O(n!) - Factorial time - you are adding a loop for every element in the array, expensive.

- Heap: store variables.
- Stack: track function calls.
- example:
```js
function booo(n) {
  for (let i = 0; i < n.length; i++) {
    console.log("booo");
  }
}
booo(['a', 'b', 'c']); // O(1)

function arrayForNTimes(n) {
  let hiArray = []; // A new variable will take up space in the heap.
  for (let i = 0; i < n; i++) {
    hiArray[i] = "hi";
  }
  return hiArray;
}
arrayForNTimes(5); // O(n)
```
- An example:
```js
const array = [{
  tweet: 'hi',
  date: 2012
},
  {
    tweet: 'hello',
    date: 2013
  },
  {
    tweet: 'goodbye',
    date: 2014
  }
];
// If you want to find the tweet with the most recent date, you have to compare each tweet to every other tweet, it will be a double nested loop.
// O(n^2), too expensive, must store the data in a different way.
```
- In javascript, a simple `afgjjfsggg.length` function call is O(1).
