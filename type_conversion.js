// ToString

let value = true; //boolean
value = String(value); //string


// ToNumber

let str = '123'; //string
str = Number(str); //number
let age = Number('number'); //Nan, coversion failed

// ToBoolean

let b1 = Boolean(1); //true
let b2 = Boolean(0); //false
let b3 = Boolean("0"); //true
let b4 = Boolean("hhh"); //true
let b5 = Boolean(""); //false

