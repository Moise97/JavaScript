// Native prototypes

/**
 * The 'prototype' property is widely used by the core of JavaScript itself. All build-in constructor 
 * functions use it.
*/

let obj = {};
alert(obj); // [object Object]
/**
 * Where is the code taht generates the string '[object Object]'? That's a build-in toString method, but 
 * where is it? The obj is empty!
 * ... But the short notation obj = {} is the same as obj = new Object(), where Object is a build-in object 
 * constructor function. And taht function has Object.prototype that references a huge object with toString 
 * and other functions.
 * ... When new Object() is called (or a literal object {...} is created), the [[ Prototype ]] of it is set to
 * Object.prototype.
 * ... Afterwwards when obj.toString() is called - teh method is taken from Object.prototype.
*/

//Other build-in prototypes
/**
 * Other build-in objects such as Array, Date, Function and others also keep methods in prototypes.
*/

let arr = [1, 2, 3];
// it inherit from Array.prototype
alert(arr.__proto__ === Array.prototype); // true
// it ingerit from Object.prototype
alert(arr.__proto__.__proto__ === Object.prototype); // true
// and null on teh top
alert(arr.__proto__.__proto__.__proto__ === null); // true

/**
 * Values null and undefined have no object wrappers
 * Special values null and undefined stand apart. They have no object wrappers, so methods and properties
 * are not available for them. And there are not corresponding prototypes too. 
*/

// Changing native prototypes
String.prototype.show = function(){
    alert(this);
};
"Boom".show(); //Boom



// Borrowing from prototypes 
/**
 * Borrowing is whe we take a method from one object and copy into another.
 * For instance, if we're making an arry-like object, we may want to copy some 
 * array methods to it.
*/

let obj = {
    0: 'Hello',
    1: ' World!',
    length: 2,
};

obj.join = Array.prototype.join;

alert(obj.join(",")); //Hello, World!