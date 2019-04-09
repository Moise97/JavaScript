// Getting all properties
/**
 * There are many ways to get keys/values from an object.
 * Most of them operate on the object itself, excluding the prototype, let's recall them:
 *      - Object.keys(obj)/Object.values(obj)/Object.entries(obj) = returns an array of enumerable own string property names/values/key-value pairs. These methods
 *                                                                  only list enumerable properties, and those that have string as keys.
 *      - Object.getOwnPropertySymbols(obj) = returns an array of all own symbolic property names
 *      - Object.getOwnPropertyNames(obj) = returns an array of all own string property names
 *      - Reflect.ownKeys(obj) = returns an array of all own property names
 * These methods are a bit different about which properties key return, but all of them operate on a object itself. properties from the prototype are not listed.  
*/


// The for..in loop is different: it loops over inherited properties too.

let animal = {
    eats: true
};

let rabbit = {
    jumps: true,
    __proto__: animal
};

// only own keys
alert(Object.keys(rabbit)); // jumps

// inherited keys too
for(let prop in rabbit){
    alert(prop); //jumps, eats
}


/**
 * If that's not what we want, and we'd like to exclude inherited properties, there's a buils-in method obj.hasOwnProperty(key): it returns true if obj has its own 
 * (not inherited) property named key 
*/
let animal = {
    eats: true
};

let rabbit = {
    jumps: true,
    __proto__: animal
};

for(let prop in rabbit){
    let isOwnProp = rabbit.hasOwnProperty(prop);
    alert(`${prop}: ${isOwnProp}`); // jumps: true
                                    // eats: false
}

/**
 * Note, there's one funny thing. Where is the method rabbit.hasOwnProperty comming from? Looking at the chain we can see that the method is provided by 
 * Object.prototype.hasOwnProperty. In other words, it's inherited. 
 * ..But why hasOwnProperty does not appear in for..in loop, if it lists allinherited properties? The answer is simple: it's not enumerable. 
 * Just like all other properties of Object.prototype. That's why they are not listed. 
*/