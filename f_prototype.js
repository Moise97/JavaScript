// F.prototype
/**
 * JavaScript had prototypal inheritance from the beginning. It was one of the core features of the language.
 * But in the old times, there was not direct access to it. The only thing thet worked reliably  was a 
 * 'prototype' property constructor function, described in the chapter. So there are many scripts that still 
 * use it.
*/

let animal = {
    eats: true
};

function Rabbit(name){
    this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit"); // rabbit.__proto__ == animal

alert(rabbit.eats); // true

/**
 * F.prototype is only used when new F is called, it assign [[ Pototype ]] of the new object.
 * After that, there's no connection between F.prototype and the new object. Think of it as a
 * 'one-time gift'. 
*/

//Default F.prototype , constructor property
/**
 * Every function has the 'prototype' property even if we don't supply it.
 * The default 'prototype' is an object with the only property constructor that points
 * back to the function itself.  
*/

function Rabbit(){ // default prototype
    // Rabbit.prototype = { constructor: Rabbit };
}


/**
 * We can use constructor property to create a new object using the same constructor as the existing one. 
*/

function Rabbit(name){
    this.name = name;
    alert(name);
}

let rabbit1 = new Rabbit("White Rabbit");
let rabbit2 = new rabbit1.constructor("Black Rabbit");

/**
 * JavaScript itself does not ensure the right 'constructor' value !!!!!!
*/

function Rabbit(){}
Rabbit.prototype = {
    jumps: true
};

let rabbit = new Rabbit();
alert(rabbit.constructor == Rabbit); //false

/**
 * So, to keep the right 'constructor' we can choose o add/remove properties to teh default 'prototype'
 * instead of overwriting it as a whole, or, alternativelly, create the constructor property manually.
*/

function Rabbit(){}
// not overwriting Rabbit.prototype totally
// just add to it 
Rabbit.prototype.jumps = true;
// the default Rabbit.prototype.constructor is preserved


//create manual constructor
Rabbit.prototype = {
    jumps: true,
    constructor: Rabbit
};
// now constructor is also correct because we added it