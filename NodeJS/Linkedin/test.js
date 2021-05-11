//1. appeler la fonction addTax, passer 50 en tant qu'argument?
function addTax(total) {
    return total * 1.05
}

console.log(addTax(50)) // 52.5

//2. Creer un objet via le constructeur Person
// var student = new Person()

//3. La valeur de a.length
var a = ['chien', 'chat', 'poule']
a[100] = 'renard';
console.log(a.length); // 101

// 4. Une fonction possible de suspendre l'execution de de la reprendre plus tard? 
// fonciton asynchrone/d'attente

// 5. En quoi differe "forEach" et "for" 
// Seule une instruction forEach vous permet de specifier votre iterateur
// for est uniquement compatible avec un tableau
// 6. Comment importer lodash en rendant son API de niveau suprieur disponible en tant que _ ?
// import entire library
// import _ from "lodash"

// 7. Problem de code ?
var a;
var b = (a = 3) ? true : false
    // il est impossible d'utiliser un operateur a droite d'un operateur d'affection

// 8 comment return 42?
class X {
    get Y() {
        return 42
    }
}
var x = new X()
console.log(x.Y);

// 9. 
var v = 1;
var f1 = function() {
    console.log(v);
}
var f2 = function() {
    var v = 2
    f1()
}
f2() // 1

// 10.
// setTimeout(function() {
//     modal.classList.remove('masque')
// }, 2000)
// console.log('resultat affiches'); // apres 10 secondes

// 11. definir une fonction de fleche qui retourne un objet vide
// () => { return {} }
// () => ({})
// () => {} // incorrect
// () => (({}))

// 12 
const dessert = { type: 'tarte' }
dessert.type = 'gateau'
console.log(dessert);

// 13 Quand utiliser une instruction conditionnelle? 
// Boolean, quand vous souhaiter regrouper des donnee

// 14 quelle return true
console.log(3 != '3'); // false
console.log(3 === '3'); // false
console.log(3 == '3'); // true

// 15 comment reference au mot 'avenue' ?
let typeVoies = ['rue', 'route', 'avenue', 'rocade']
console.log(typeVoies[2]);