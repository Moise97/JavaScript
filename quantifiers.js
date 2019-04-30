// Quantifiers +, *, ? and {n}

/** 
 * Let's say we have a string like +7(903)-123-45-67 and want to find all numbers in it. But unlike before, we
 * are interested not in single digits, but full numbers: 7, 903, 123, 45, 67.
 * A number is a sequence of 1 to more digits \d. To mark how many we need, we need to append a quantifier.
*/

/** 
 * Quantity {n}
 * The simplest quantifier is a number in curly braces: {n}.
 * A quantifier is appended to a character and specifies how many we need.
 * It has a few advanced forms:
*/

/**
 * The exact count {5}
 * \d{5} denotes exactly 5 digits, the same as \d\d\d\d\d.
 * We can add \b to exclude longer numbers: \b\d{5}\b
*/
alert("I'm 12345 years old".match(/\d{5}/)); // 12345

/** 
 * The range {3-5}, match 3-5 times
 * To find numbers from 3 to 5 digits we can put the limits into curly braces: \d{3-5}
*/

alert("I'm not 12, but1234 years old".match(/\d{3-5}/)); // 1234

/** 
 * Then a regexp \d{3,} looks for a sequences of digits of length 3 or more:
*/

alert("I'm not 12, but 23456789 years old".match(/\d{3,}/)); // 23456789

let str = "+7(903)-123-45-67";
let numbers = str. match(/\d{1,}/g); 
alert(numbers); // 7, 903, 123, 45, 67


/**
 * Shorthands
 * There are shorthands for most used qualifiers:
 *      + means "one or more", the same as {1,}.
 *      ? means "zero or none", the same as {0,1}.
 *      * means "zero or more", the same as {0,} 
*/
let str = "+7(903)-123-45-67"; 
alert(str.match(/\d+/g)); // 7, 903, 123, 45, 67

let str = "Should I write color or colour?";
alert(str.match(/colou?r/g)); // color, colour

alert("100 10 1".match(/\d0*/g)); // 100, 10, 1