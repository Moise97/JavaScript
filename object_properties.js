// Object properties

/**
 *  Property flag
 * Object properties, besides a value, have three special attributes(so-called flags):
 *      - writable = if true, can be changes, otherwise it's read only
 *      - enumerable = if true, then listed in loops, otherwise not listed
 *      - configurable = if true, the property can be deleted and these atributes can be modified, 
 *                       otherwise not.
 * The syntax is: 
 *      let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
 * 
 * To change the flags, we can use Object.defineProperty().
 * The syntax is:
 *      Object.defineProperty(obj, propertyName, descriptor);
*/

let user = {
    name: 'John'
};
let descriptor = Object.getOwnPropertyDescriptor(user, 'name');
alert(JSON.stringify(descriptor, null, 2));

let user = {};
Object.defineProperty(user, 'name', {
    value: 'John'
});
let descriptor = Object.getOwnPropertyDescriptor(user, 'name');
alert(JSON.stringify(descriptor, null, 2));


// Read-only flag
// For new properties need to explicitly list what's true
let user = {
    name: 'John'
};

Object.defineProperties(user, 'name',{
    writable:false // read-only flag 
});

user.name = 'Michael'; // Error: Cannot assign to read only property 'name' ...



// Non-enumerable
let user = {
    name: 'John',
    toString(){
        return this.name;
    }
};

Object.defineProperty(user, 'toSting', {
    enumerable: false
});

for(let key in user){
    alert(key); // name - because name is enumerable
}


// Non-configurable
/**
 *  A non-configurable property can not be deleted or alternated with defineProperty.
 * Making a property non-configurable is a one-way road. We canno change it back, because
 * defineProperty doesn't work on non-configurable properties. 
*/

let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert(JSON.stringify(descriptor, null, 2));
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/
Math.PI = 3; // Error



// Sealing an object globally
/**
 *  Property descriptors work at level of individual properties.
 * These are also methods taht limit access to the whole project:
 * 
 * Object.preventExtensions(obj) - forbids to add property to the object
 * Object.seal(obj) - forbids to add/ remove properties, sets for all existing properties 'configurable: false'
 * Object.freeze(obj) - forbids to add/remove/change properties, sets for all existing properties
 *                      'configurable: false', 'writable: false'
 * 
 * And also there are tests for them:
 *      Object.isExtensible(obj)
 *      Object.isSealed(obj)
 *      Object.isFrozen(obj)
*/



// Getters and setters
/**
 *  Accessor properties are represented by 'getters' and 'setters' methods. In an object literal they are
 * denoted by get and set: 
*/
let user = {
    name: "John",
    surname: "Smith"
};
  
Object.defineProperty(user, 'fullName', {
    get() {
      return `${this.name} ${this.surname}`;
    },
  
    set(value) {
      [this.name, this.surname] = value.split(" ");
    }
});
  
alert(user.fullName); // John Smith
  
for(let key in user) alert(key); // name, surname

// Smart getters and setters
/**
 *  Getters/setters can be used as wrappers over 'real' property values to get more control over them. 
*/
let user = {
    get name(){
        return this._name;
    },
    set name(value){
        if(value.length < 4){
            alert("Nmae is too short, need at least 4 characters");
            return;
        }
        this._name = value;
    }
};

user.name = 'Pete';
alert(user.name); // Pete

user.name = ""; // Name is too short ...

// Using for compatibility
/**
 *  One of the great ideas behind getters and setters - they allow to take control over a 'normal'
 * data property and tweak it at any moment. 
*/

function User(name, birthday) {
    this.name = name;
    this.birthday = birthday;
  
    // age is calculated from the current date and birthday
    Object.defineProperty(this, "age", {
      get() {
        let todayYear = new Date().getFullYear();
        return todayYear - this.birthday.getFullYear();
      }
    });
}
  
let john = new User("John", new Date(1992, 6, 1));
  
alert( john.birthday ); // birthday is available
alert( john.age );      // ...as well as the age