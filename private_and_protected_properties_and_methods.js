// Private and protected properties and methods

/**
 * One of the most important principles of object oriented programming - delimiter internal interface from external one.
 * That is a "must" practice in developing anything more complex than a 'hello world' app.
 * 
 * 
 * Internal and external interface
 * In object-oriented programming, properties and methods are split into two groups:
 *      Internal interface - methods and properties, accessible from other methods of the class, but not from the outside.
 *      External interface - methods and properties, accessible also from outside the class.
 * 
 * In JavaScript, there are tree types of properties and members;
 *      Public: accessible from anywhere. They comprise the external interface. Till now we were only using public properties and methods.
 *      Private: accessible only from inside the class. There are for internal interface.
*/

// Let's make a simple coffee machine class first
class CoffeeMachine {

    waterAmount = 0; // waterAmont is public

    constructor(power){
        this.power = power; // power is public
        alert(`Created a coffee-machine, power: ${power}`);
    }
} 

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

// add water
coffeeMachine.waterAmount = 200; 


/**
 * Protected properties are usually prefixed with an underscore '_'
 * That is not enforced on the language level, but there's a convention that such properties and methods should not be accessed from the outside.
 * Most programmers follow it.
*/

class CoffeeMachine {
    _waterAmount = 0; // protected

    set waterAmount(value){
        if(value < 0){
            throw new Error("Negative water");
        }
        this._waterAmount = value;
    }

    get waterAmount(){
        return this._waterAmount;
    }

    constructor(power){
        this._power = power; // protected
    }

    get power(){
        return this._power; // read-only - because we have only getter, but not setter
    }
}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

// add water
coffeeMachine.waterAmount = -10; // error: Negative water

alert(`Power is : ${coffeeMachine.power}W`); // Power is: 100W
coffeeMachine.power = 25; // Error (no setter)


// Private #
/**
 * There's a finished JavaScript proposal, almost in the standard, that provides language-level support for private properties and methods.
 * Private should start with #. They are only accessible from inside the class. We can't access it from outside or from inhereting classes.
 * Private fields do not conflict with public ones. We can have both private #waterAmount and public waterAmount fields at the same time.
*/