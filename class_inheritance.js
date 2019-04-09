// Class inheritance
/**
 * Classes can extend one another. That's a nice syntax, technically based on the prototypal inheritance.
 * To inherit from another class, we should specify "extends" and the parent class before the brackets {..}. 
*/

class Animal {
    constructor(name){
        this.speed = 0;
        this.name = name;
    }

    run(speed){
        this.speed +=speed;
        alert(`${this.name} runs with speed ${this.speed}.`);
    }

    stop(){
        this.speed = 0;
        alert(`${this.name} stopped.`);
    }
}

// Inherit from Animal
class Rabbit extends Animal {
    hide(){
        alert(`${this.name} hides!`);
    }
}

let rabbit = new Rabbit("White Rabbit");
rabbit.run(5); // White Rabbit runs with spped 5
rabbit.hide(); // White Rabbit hides!

/**
 * The extends keywords actually adds a [[ Prototype ]] reference from Rabbit.prototype to Animal.prototype, just as you expect
 * it to be. 
*/

/**
 * Any expression is allowed after extends
 * Class syntax allows to specify not just a class, but any expression after extends. For instance, a function call that generates
 * the parent class: 
*/

function f(phrase){
    return class {
        sayHi(){
            alert(phrase)
        }
    }
}

class User extends f("hello"){}

new User().sayHi(); // hello


// Overriding a method
/**
 * Classes provide "super" keyword
 *      super.method() - to call a parent method
 *      super() - to call a parent constructor(inside our constructor only) 
*/

class Animal {

    constructor(name){
        this.speed = 0;
        this.name = name;
    }

    run(speed){
        this.speed +=speed;
        alert(`${this.name} runs at speed ${this.speed}`);
    }

    stop(){
        this.speed = 0;
        alert(`${this.name} stopped`);
    }

}

class Rabbit extends Animal {

    hide(){
        alert(`${this.name} hides!`);
    }

    stop(){
        super.stop(); // call parent stop()
        this.hide(); 
    }
}

let rabbit = new Rabbit('White Rabbit');

rabbit.run(5); // White Rabbit runs at spped 5
rabbit.stop(); // White Rabbit stopped.
               // White Rabbit hides!



// Overriding constructor
/**
 * According to the specification, if a class extends another class and has no constructor, then the following constructor is generated.
 * As we can see, it bassically calls the parent constructor, pssing it all the arguments. That happens if we don't write a constructor of our own.
*/
class Rabbit extends Animal {
    // generated for extending classes without own constructor
    constructor(...args){
        super(...args);
    }
}

// Add a custom constructor to Rabbit
class Animal {
    constructor(name){
        this.speed = 0;
        this.name = name;
    }
    // ...
}

class Rabbit extends Animal {
    constructor(name, earLength){
        this.speed = 0;
        this.name = name;
        this.earLength = earLength;
    }
    // ...
}

// Does't work
let Rabbit = new Rabbit("Black rabbit", 10); // Error: this is not defined

/** 
 * We got this error because constructors in inherided classes must call 'super(...)' and do it before using this.
 * When a normal constructor runs, it creates an empty object as this and continues with it. But, when a derived constructor runs 
 * it does't do it. It expects the parent constructor to do his job. 
 * So, if we're making a constructor of our own, then we must call super, because otherwise the object with this reference to it 
 * won't be created. And wi'll get an error.
*/

class Animal {

    constructor(name){
        this.speed = 0;
        this.name = name;
    }
    // ...
}

class Rabbit extends Animal {

    constructor(name, earLength){
        super(name); // call parent constructor
        this.earLength = earLength;
    }
    // ...
}

// now it's working
let rabbit = new Rabbit("Black rabbit", 10);
alert(rabbit.name); // Black Rabbit
alert(rabbit.earLength); // 10


// SUPER: inyternals, [[ HomeObject ]]
/**
 * When a method runs, it gets the current object as this. If we call super.method() then, how to retrieve the method? 
 * Naturally, we need to take the method from its prototype of the current object. How, technically JS engine can do it?
 * Maybe we can get the method from [[ Prototype ]] of this, as this.__proto__.method? Let's try to do it.
*/
let animal = {
    name: 'Animal',
    eat(){
        alert(`${this.name} eat!`);
    }
};

let rabbit = {
    __proto__: animal,
    name: "Rabbit",
    eat(){
        this.__proto__.eat.call(this); // that's how super.eat() could presumably work *
    }
};

rabbit.eat(); // Rabbit eat!  

/**
 * At the line * we take eat from the prototype (animal) and call it in the context of the current object. please note that 
 * .call(this) is important here, because a simple this.__proto__.eat() would expect parent eat in the context of prototype,
 * not the current object. 
 * And in the code above it actually works as intended: we have the correct alert.
 * 
 * Now let's add one more object to the chain. We'll see how things break:
*/

let animal = {
    name: 'Animal',
    eat(){
        alert(`${this.name} eat!`);
    }
};

let rabbit = {
    __proto__: animal,
    name: "Rabbit",
    eat(){
        this.__proto__.eat.call(this); // ...bounce around rabbit-style and call parent (animal) method *
    }
};

let longEar = {
    __proto__: rabbit,
    eat(){
        this.__proto__.eat.call(this); // ...do something with long ears and call parent(rabbit) method **
    }
};

longEar.eat(); // Error: maximum call stack exceed

/**
 * The code doesn't work anymore!!! it may be not that obvious, but if we trace longEar.eat() call, then we can see why.
 * In both lines * and ** the value of this is the current object(longEar). That's essential: all object methods get the 
 * current object at this, not a prototype or something. So, in both lines * and ** the value of this.__proto__ is exactly 
 * the same: rabbit. They both call rabbit.eat without going any up the chain in the endless loop. So, rabbit.eat() calls 
 * itself in the endless loop, because it can ascend any further.
 * the problem can't be solved by using this alone.
*/


// [[ HomeObject ]]
/**
 * To provide the solution, JS adds one more special internal property for functions: [[ HomeObject ]].
 * When a function is specified as a class or object methods, its [[ HomeObject ]] property becomes that object.
 * [[ HomeObject ]] is used only for calling parent methods in super, to resolve the prototype.
*/

let animal = {
    name: 'Animal',
    eat(){  // [[HomeObject]] == animal
        alert(`${this.name} eat!`);
    }
};

let rabbit = {
    __proto__: animal,
    name: "Rabbit",
    eat(){  // [[HomeObject]] == rabbit
        super.eat();
    }
};

let longEar = {
    __proto__: rabbit,
    eat(){  // [[HomeObject]] == longEar
        super.eat();
    }
};

longEar.eat();

/**
 * [[ Homeobject ]] is defined for methods defined both in classes and in plain objects. But for objects, methods must be
 * specified exactly the given way: as method() not "method: function()". 
*/

let animal = {
    eat: function(){ // should be the short syntax: eat() {...}
        // ...
    }
};

let rabbit = {
    __proto__: animal,
    eat: function(){
        super.eat();
    }
};

rabbit.eat(); // Error calling super (because there's no [[ HomeObject]])