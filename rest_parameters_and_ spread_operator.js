// Rest parameters and spread operator

// Rest parameters ... - a function can be called with any number of arguments, no matter how it is defined
// The rest parameter must be at the end!!!!!

function sum(a, b){
    return a + b;
}
alert(sum(2, 3)); // 5

function sumAll(...args){
    let sum = 0;
    for(let item in args){
        sum+=item;
    }
    return sum;
}
alert(sumAll(1, 2, 3, 4,5)); //15



// The 'arguments' variable - there is also a special array-like object named arguments that contains all arguments by their index
// Arrow functions do not have 'arguments'

function showName(){
    alert(arguments.length);
    alert(arguments[0]);
    alert(arguments[1]);

    // it's iterable
    // for(let arg in arguments) alert(arg)
}

showName('John'); // 1, John, undefined



// Spread operator 
// The spread operator internally uses iterators to gather elements, the same way as for..of does.

let arr = [3, 5, 1];
alert(Math.max(arr)); // NaN

let arr1 = [4, 2, 7];
let arr2 = [7, 8, 9];
alert(Math.max(100, ...arr1, ...arr2, 999)); // 999
