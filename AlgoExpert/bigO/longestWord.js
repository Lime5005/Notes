//let sen = "fun&!! time"
//let sen = "I love dogs"
let sen = "This is the logest word in the sentence"

function LongestWord(sen) {
    // code goes here
    var letters = /^[A-Za-z]+$/;
    let words = sen.split(' ')
    words = words.filter(word => word.match(letters))
    words.sort((a, b) => b.length - a.length)

    return words[0];
}

// keep this function call here 
console.log(LongestWord(sen));