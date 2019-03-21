// Boolean is the result

let x = (2 > 1); // true
let x1 = (2 != 1); // true
let x3 = (2 == 1); // false


// String comparison

let y = 'Z' > 'A'; // true
let y1 = 'Glow' > 'Glee'; // true
let y2 = 'Bee' > 'Be'; // true


// Comparison of different types

let t = '2' > 1; // true - string '2' becomes a number
let t1 = ('01' == 1); // true - string '01' becomes a number


// Strict equality

let b = ( 0 == false ); // true
let b1 = ( '' == false ); // true
let b2 = ( 0 === false ); // false - because the types are different


// Comparison with null and undefined

let j = ( null === undefined ); // false
let j1 = ( null == undefined ); // true


// Strange result: null vs 0

let r = ( null > 0 ); // false
let r1 = ( null == 0 ); // false
let r2 = ( null >= 0 ); //true


// An incompatible undefined

let p = ( undefined == 0 ); // false
let p = ( undefined > 0 ); // false
let p = ( undefined < 0 ); // false
