// Class checking: "instanceof"
/**
 * The instanceof operator allows to check whether an object belongs to a certain class. It also takes inheritance into account.
 * Such a check may be necessary in many cases, here we'll use it for building a polymorphic function, the one that treats arguments
 * differently depending on theyr type.
 */ 

 // The instanceof operator: obj instanceof Class
 // It returns true if obj belongs to the Class (or a class inheriting from it)

 class Rabbit {}
 let rabbit = new Rabbit();
 alert(rabbit instanceof Rabbit); // true

 // It also work with constaructor functions
 //instead of class
 function Rabbit(){}
 alert(new Rabbit() instanceof Rabbit); // true

 // And with build-in classes like Array
 let arr = [1, 2, 3];
 alert(arr instanceof Array); // true
alert(arr instanceof Object); // true



// Object toString for the type
// We already know that plain objects are converted to string as [object Object]
let obj = {}
alert(obj); // [object Object]
alert(obj.toString()); // [object Object]

/**
 * By specification, the build-in toString can be extracted from the object and executed in the context of any other value.
 * And its result depends on that value:
 *      - for a number, it will be [object Number]
 *      - for a boolean, it will be [object Boolean]
 *      - for null: [object Null]
 *      - for undefined: [obejct Undefined]
 *      - for arrays: [object Array]
 *      - etc ... 
*/

// copy toString method into a variable for convenience
let objectToString = Object.prototype.toString;

let arr = [];
alert(objectToString.call(arr)); // [object Array]

/**
 * Here we used call as described in the chapter Decorators and forwarding, call/apply to execute the function objectToString
 * in the context this = arr. Internally, the toString algoritm examines this and returns the coresponding result. 
*/


// Symbol.toStringTag
/**
 * The behavior of Object toString can be customized using a special object property Symbol.toStringTag. 
*/

let user = {
    [Symbol.toStringTag]: "User"
};

alert({}.toString.call(user)); //[object User]

/**
 * The result is exactly Symbol.toStringTag(if exist), wrapped into [object ...].
*/