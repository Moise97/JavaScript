// Numbers

let billion = 1000000000; // same as 1e9

let ms = 0.000001; // same as 1e-6

let hexaNum = 0xff; // 255
let binaryNum = 0b11111111; // 255
let octalNum = 0o377; // 255


// The method num.toString(base) - return a string representation of num in the numeral
// system with the given base

let num = 255;
alert(num.toString(2)); // 11111111
alert(num.toString(16)); // ff

// Two dots to call a method
alert(123456..toString(36)); // 2n9c


// Rounding
let a = 3.1;
let b = Math.floor(a); // 3
let c = Math.ceil(a); // 4
let d = Math.round(a); // 3
let e = Math.trunc(a); // 3



// Imprecise calculation
alert(1e500); // Infinity
alert(0.1 + 0.2); // 0.30000000000000004
alert(0.1.toFixed(20)); // 0.10000000000000000555
alert(9999999999999999); // shows 10000000000000000


// parseInt and parseFloat
alert(parseInt("100px",10)); // 100
alert(parseFloat("12.5em")); // 12.5


// Other Math functions

let x = Math.random(); // returns a random number between 0 and 1
let maxim = Math.max(3, 6, 1, 10); // 10
let minim = Math.min(-3, -5, 4, -20, -100); // -100
let power = Math.pow(2, 10); // 1024
