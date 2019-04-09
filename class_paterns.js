// Class paterns

/**
 * In object-oriented programming, a class is an extensible program-code-template for creating objects, providing initial vlues for state (member variables) and
 * implementations of behavior (member functions or methods). There's a special syntax for construct and keyword class in JavaScript. In JavaScript there are
 * several well-known programming patterns to make classes even without using the class keyword. people talk about 'classes' meaning not only those defined with 
 * class, but also with these patterns. The class construct will be described in the next chapter, but in JavaScript it's a 'syntax-sugar' and an extension of the 
 * prototypal class pattern described here.
*/

// Functional class pattern
// The constructor function below can be considered a 'class' according to the definition:

function User(name){
    this.sayHi = function(){
        alert(name);
    };
}

let user = new User("John");
user.sayHi(); // John

/**
 * This is called 'functional class pattern'.
 * In the functional class pattern, local variables and nested functions inside User, that are not assigned to this, are visible from inside, but not accessibe
 * by the outher code. So we can easily add internal functions and varialbes. 
*/

function User(name, birthday){
    // only visible from other methods inside User
    function calcAge(){
        return new Date().getFullYear() - birthday.getFullYear();
    }

    this.sayHi = function(){
        alert(`${name}, age:${calcAge()}`);
    };
}

let user = new User("John", new Date(2000, 0, 1));
user.sayHi(); // John, age:19

/**
 * In this code variables name, birthday and the function calcAge() are internal, private to the object. They are only visible from inside of it.
 * On the other hand, sayHi() is the external, public method. The external code thet create user can access it. 
 * this way we can hide internal implementation detaild and helper methods from the outher code. Only what's assigned to 'this' becomes visible outside.
*/


// Factory class pattern
// We can create a class without using new at all, like this:

function User(name, birthday){
    // only visible from other methods inside User
    function calcAge(){
        return new Date().getFullYear() - birthday.getFullYear();
    }

    this.sayHi = function(){
        alert(`${name}, age:${calcAge()}`);
    };
}

let user = User("John", new Date(2000, 0, 1));
user.sayHi(); // John, age:19



// Prototype-based classes
/**
 * Prototype-based classes are the most important and generally the best. Functional and factory class patterns are rarely used in practice.
*/

function User(name, birthday){
    this._name = name;
    this._birthday = birthday;
}

User.prototype._calcAge = function(){
    return new Date.getFullYear() - this._birthday.getFullYear();
};

User.prototype.sayHi = function(){
    alert(`${this._name}, age:${this._birthday}`);
};

let user = new User("John", new Date(2000, 0, 1));
user.sayHi(); // John, age: 19

/**
 * The code structure:
 *      - the constructor Usser only initializes the current object state
 *      - methods are added to User.prototype.
 * 
 * As we can see, methods are lexically not inside function User, they do not share a common lexical environment. If we declare variables inside function User, then they 
 * won't be visible to methods. So, there is a widely known agreement that internal properties and methods are prepended with an underscore '_'. technically, that's just an 
 * agrement, the outher code still can access them. But most developer recognise the meaning of '_' and try not to touch prefixed properties and methods in the external code.
 * 
 * Prototypes allow us to setup the inheritance in a really efficient way. Build-in JavaScript objects all use prototypes. Also there's a special syntax construct: 'class'
 * that provides nice-looking syntax for them. 
*/


// Prototype-based inheritance for classes

function Animal(name){
    this.name = name;
}

Animal.prototype.eat = function(){
    alert(`${this.name} eats.`);
}

function Rabbit(name){
    this.name = name;
}

Rabbit.prototype.jump = function(){
    alert(`${this.name} jumps`);
}

Rabbit.prototype.__proto__ = Animal.prototype; // *

let rabbit = new Rabbit("White Rabbit");
rabbit.eat(); // White Rabbit eats.
rabbit.jump(); // White Rabbit jumps

/**
 * The line * sets up the prototype chain. So the rabbit first searches methods in Rabbit.prototype, then Animal.prototype. And then just for completeness, let's 
 * mention that if the method is not found in Animal.prototype, then the search continues in Object.prototype, because Animal.prototype is a regular plain object,
 * so it inherit from it.
*/