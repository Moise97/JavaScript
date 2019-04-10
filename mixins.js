// Mixins
/**
 * In JavaScript we can only inherit from a single object. There can be only one [[ Prototype ]] for an object. And a class may extend only one other class.
 * As defined in Wikipedia, a mixin is a class that contains methods for use by other classes without having to be the parent class of those other classes.
 * in other words, a mixin provides methods that implement a certain behavior, but we do not use it alone, we use it to add the behavior to other classes. 
*/

/**
 * A mixin example.
 * The simpest way to make a mixin in JavaScript is to make an object with useful methods, so that we can easily merge them into a prototype of any class.
*/

//mixin
let sayHiMixin = {
    sayHi(){
        alert(`Hello ${this.name}`);
    },
    sayBye(){
        alert(`Bye ${this.name}`);
    }
};

//usage
class User {
    constructor(name){
        this.name = name;
    }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

//now User can say hi
new User("John").sayHi(); // Hello John

/**
 * There's no inheritance, but a simple method copying. So User may extend some other class and also include the mixin to 'mix-in' the additional mathods.
 * Mixins can make use of inheritance inside themselves. Example:
*/

let sayMixin = {
    say(phrase){
        alert(phrase);
    }
};

let sayHiMixin = {
    __proto__: sayMixin,

    sayHi(){
        // call parent method
        super.say(`Hello ${this.name}`);
    },

    sayBy(){
        super.say(`Bye ${this.name}`);
    }
};

class User {
    constructor(name){
        this.name = name;
    }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("John").sayHi(); // Hello John