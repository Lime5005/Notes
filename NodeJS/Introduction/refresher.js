const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done')
        }, 1000)
    })
    return promise
};

setTimeout(() => {
    console.log('Time is out');
    fetchData().then(text => {
            console.log(text);
            return fetchData()
        })
        .then(text2 => {
            console.log(text2);
        })
}, 2000)

// setTimeout(() => {
//     console.log('Hello');
// }, 2000)
// console.log('1');
// console.log('2');


// Reference types 
// Objects
const person = {
    name: 'Lily',
    age: 30,
    greet() {
        console.log('Hi, I am ' + this.name)
    }
}

// person.greet()

const printName = ({ name }) => {
    console.log(name);
}

const { name, age } = person
console.log(name, age)

// printName(person)



// Arrays

const hobbies = ['sports', 'cooking']
const [hobby1, hobby2] = hobbies
console.log(hobby1, hobby2)
    //     // console.log(hobbies.map(hobby => 'Hobby: ' + hobby));
    //     // console.log(hobbies);

// const copiedArray = hobbies.slice()
// console.log(copiedArray)
//     // [ 'sports', 'cooking' ]

// const spreadArray = [...hobbies]
// console.log(spreadArray)
//     // [ 'sports', 'cooking' ]

// const toArray = (...args) => {
//     return args
// }

// console.log(toArray(1, 2, 3, 4))
//     // [ 1, 2, 3, 4 ]