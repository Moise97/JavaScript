// Unary

let x = 1;
x = -x; // -1
let b1 = +true; // 1
let b2 = +""; // 0 


// Binary

let y = 2, z = 3;
let sum  = y + z; // 5
let s = "my" + "String"; // myString
let q = '1' + 2; // "12"
let w = 2 + 2 + '1'; // "41"
let e = 2 - '1'; // 1
let r = '6' / '2';  
let apples = 2, oranges = 3;
let t = apples + oranges; // "23"
let y = +apples + +oranges; // 5


// Asignment

let a, b, c;
a = b = c = 2 + 2; // a = 4, b = 4, c = 4
let a1 = 1, b1 = 2;
let c1 = 3 - (a1 = b1 + 1); // a1 = 3, b1 = 2, c1 = 0;


// Reminder

let rem = 5 % 2; // 1
let ren = 6 % 3; // 0


// Exponentiation

let exp = 2 ** 2; // 4
let rad = 4 ** (1/2); // 2


// Increment, Decrement

let incr = 0;
incr++; // 0 - return the old value
let incr1 = 3;
++incr1; // 4 - return the new value
let incr2 = 0;
incr2--; // 0 - return the old value
let incr3 = 3;
--incr3; // 2 - return the new value


// Comma

let com = (1 + 2, 3 + 4); // a = 7 (not 3) 