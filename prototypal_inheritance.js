// Prototypal inheritance

/**
 * In JS, objects have a special hidden property [[ Prototype]], that is either null or references another object.
 * That [[ Prototype ]] has a magical meaning. When we want to read a property from object, and it's meaning, JS 
 * automatically takes it from the prototype. In programming, such thing is called 'prototypal inheritance'.
 * The property [[ Prototype ]] is internal and hidden, but there are many ways to set it. One of them is to use
 * __proto__ but in modern language it is replaced with functions Object.getPrototypeOf/Object.setPrototypeOf that
 * alse get/set the prototype.
*/

let animal = {
    eats: true,
    walk(){
        alert('Animal walk');
    }
};

let rabbit = {
    jumps: true
};

rabbit.__proto__ = animal; // *

// we can find both properties in rabbit now:
alert(rabbit.eats);
alert(rabbit.jumps);
alert(rabbit.walk());

/**
 * There are actually only two limitations:
 *  - The references can't go in circles. JavaScript will throw an error if we try to assign __proto__ in a circle.
 *  - The value of __proto__ can be either an object or null, other types are ignored. 
*/

/**
 * Writing donesn't use prototype - the prototype is only used for reading properties.
 * Write/delete operations work directly with the object.  
*/

let animal = {
    eats: true,
    walk(){
        // this method won't be used by rabbit
    }
};

let rabbit = {
    __proto__: animal
};

rabbit.walk = function(){
    alert("Rabbit is walk");
};

rabbit.walk(); // Rabbit is walk


/**
 * If a property is a getter/setter, then it behaves like a function: getters/setters are looked up in the prototype. 
*/

let user = {
    name: 'John',
    surname: 'Smith',
    set fullName(value){
        [this.name, this.surname] = value.split(" ");
    },
    get fullName(){
        return `${name} ${surname}`;
    }
};

let admin = {
    __proto__ = user,
    isAdmin: true
};

alert(admin.fullName); // John Smith 
admin.fullName = "Alice Cooper";

/**
 * The value of 'THIS'.
 * No matter where the method is found: in an object or its prototype. In a method call, this is always the object before 
 * the dot. 
*/

// animal has methods
let animal = {
    walk(){
        if(this.isSleeping){
            alert('I walk');
        }
    },
    sleep(){
        this.isSleeping = true;
    }
};

let rabbit = {
    name: 'White Rabbit',
    __proto__ = animal
};

// modifies rabbit.isSleeping
rabbit.sleep; // this refers to rabbit

alert(rabit.isSleeping); // true
alert(animal.isSleeping); // undefined