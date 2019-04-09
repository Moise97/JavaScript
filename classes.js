// Classes
/**
 * The 'class' construct allows one to define prototype-based classes with a clean, nice-looking syntax. It also introduces great new features which are useful for 
 * object-oriented programming. 
*/

// Prototype-based class:
function User(name){
    this.name = name;
}
User.prototype.sayHi = function(){
    alert(this.name);
}
let user = new User("John");
user.sayHi(); // John

// Using class syntax
class User {
    constructor(name){
        this.name = name;
    }

    sayHi(){
        alert(this.name);
    }
}
let user = new User("userName");
user.sayHi(); // username

/**
 * In JavaScript a class is a kind of function.
 * The definition class User{...} creates a function under the same name and puts the methods into User.prototype.
*/

//proof: User is a function
alert(typeof User); // function

//proof: User is the 'constructor' function
alert(User === User.prototype.constructor); // true

//proof: there are two methods in its 'prototype'
alert(Object.getOwnPropertyNames(User.prototype)); //constructor, sayHi



// Class Expression
// Just like functions, classes can be defined inside another expression, passes around, returned, etc

function makeClass(phrase){
    // declare a class and return it
    return class {
        sayHi(){
            alert(phrase);
        };
    };
}

let User = makeClass("Hello");
new User.sayHi(); // Hello



// Differences between classes and functions
/**
 * Classes have some differences compared to regular functions:
 *      Constructor requires new - unlike a regular function, a class constructor can't be called without new.
 *      Different string output - if we output it like 'alert(User)', some engines show "class User ...", while others show "function User ..."
 *      Class methods are not enumerable - A class definition sets enumerable flag to false for all methods in the 'prototype'. That's good, 
 *                                         because if we for..in over an object, we usually don't want its class methods
 *      Classes have a default constructor(){} - If there's no constructor in the class construct, then an empty function is generated, just as 
 *                                               if we had written constructor(){}
 *      Classes always "use strict" - All code inside the class construct is automatically in strict mode
*/


// Getters/setters, other shorthands
/**
 * Classes also include getters/setters, generators, computed properties etc.
 * Internally, getters and setters are created on User.prototype. 
*/

class User {

    constructor(name){
        // invokes the setter
        this.name = name;
    }

    get name(){
        return this._name;
    }

    set name(value){
        if(value.length < 4){
            alert("Name is too short");
            return;
        }
        this._name = value;
    }
}

let user = new User("John");
alert(user.name); // John
user = new User(""); // Name is too short