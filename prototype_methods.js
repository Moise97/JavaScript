// Prototype methods, ojects without __proto__
/**
 * The __proto__ is considered outdated and somewhat deprecated.
 * The modern methods are:
 *      - Object.create(proto[ ,descriptor ]) = create an empty object with given proto as [[ Prototype ]] and optional property descriptors
 *      - Object.getPrototypeOf(obj) = returns tha [[ Prototype ]] of obj.
 *      - Object.setPrototypeOf(obj, proto) = sets the [[ Prototype ]] of obj to proto.
 * These should be used instead of __proto__
*/

let animal = {
    eats: true
};

// create a new object with animal as a prototype
let rabbit = Object.create(animal);

alert(rabbit.eats); // true
alert(Object.getPrototypeOf(rabbit) === animal); // true

Object.setPrototypeOf(rabbit, {}); // change the prototype of rabbit to {}


/**
 * Object.create has an optional second argument: property descriptors. We can provide additional properties to the new object there.
*/

let animal = {
    eats: true
};

let rabbit = Object.create(animal,{
    jumps: {
        value: true
    }
});

alert(rabbit.jumps); // true


/**
 * We can use Object.create to perform an object cloning  more powerful than copying properties in for..in
*/

// fully identical shallow clone of obj
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptor(obj));


// 'Very plain' objects
/**
 * As we know, objects can be used as associative arrays to store key/value pairs.
 * ..But if we try to store user-provided keys in it, we can see an interesting glich: all keys work fine except '__proto__'.
 * The '__proto__' property is special: it must be either an object or null, a string can not become a prototype.
 * So, if obj.__proto__ is read or set, the corresponding getter/setter is called from its prototype, and it gets/sets [[ Prototype ]].
 * And it was said in the beginning of this tutorial section: __proto__ is a way to access [[ Prototype ]], it is not [[ Prototype ]] itself.
*/
let obj = {};

let key = prompt("What's the key?","__proto__");
obj[key] = 'some value';

alert(obj[key]); // [object Object], not 'some value'

/**
 * Now, if we want to use an object as an associative array, we can do it with a little trick:
*/
let obj = Object.create(null);

let key = prompt("What's the key?", '__proto__');
obj[key] = "some value";

alert(obj[key]); // some value

/**
 * Object.create(null) creates an empty object without a prototype ([ Prototype ] is null). So, there is no inherited getter/setter for __proto__.
 * Now it is processed as a regular data property, so the example above works right. 
*/