// Currying and Partials
/*
    Until now we have only been talking about binding this. We can bind not only this, but also arguments.
    That's rarely done, but somethimes can be handy.
    The full syntax of bind: let bound = func.bind(context, arg1, arg2, ...);
*/

function mul(a, b){
    return a * b;
}

let double  = mul.bind(null, 2); // create a new function double that passes calls to mul, fixing null
                                 // as the context and 2 to the first argument. Further arguments are passed 'as in'

alert(double(2)); // 4
alert(double(3)); // 6
alert(double(4)); // 8




// Going partial without context
/*
    What if we'd like to fix some arguments, but not bind this? The native bind does not allow that.
    We can't just omit the context and jump to argumnets. Fortunatelly, a partial fuction for binding 
    only arguments can be easily implemented.
*/

function partial(func, ...argsBound){
    return function(...args){ // *
        return func.call(this, ...argsBound, ...args);
    }
}

/**
 * The result of the partial (func[, arg1, arg2, ...]) calls is a wrapper (*), that calls func with:
 *      - same this as it gets (for user.sayNow call it's user)
 *      - then gives it ...argsBound = arguments for the partial call ('10:00')
 *      - then gives it ...args = arguments given to the wrapper ("Hello")
*/

// Usage: 
let user = {
    firstName: 'John',
    say(time, phrase){
        alert(`[${time}] ${this.firstName}: ${phrase}`)
    }
};

// and a partial method thet says something now by fixing the first argument
user.sayNow = partial(user.say, new Date().getHours + ":" + new Date().getMinutes());

user.sayNow("Hello"); // [10:00] John: Hello


// Currying
/**
 * Currying is translating a function from callables as f(a, b, c) into callable as f(a)(b)(c).
 * Literally, currying is a transformation of functions: from one way of calling into another. 
 * In JavaScript, we usually make a wrapper tp keep the original function. Currying doesn't call
 * a function, it just transform it.
*/

function curry(f){ // curry(f) does not currying transform
    return function(a){
        return function(b){
            return f(a, b);
        };
    };
}

// usage
function sum(a, b){
    return a + b;
}

let carriedSum = curry(sum);
alert(carriedSum(1)(2)); // 3

/**
 *  A wrapper function is a design concept where a very minimal function is using another function to
 * do it's 'work' for it, sometimes using a slightly different set of arguments. 
*/

/**
 * More advanced implementation of currying like _.curry from lodash library do something more
 * sophisticated. They return a wrapper that allows a function to be called normally when all arguments
 * are supplied or returns a partial otherwise.  
*/

/**
 * To undestand the benefits of currying we definitelly need a worthy real-life example. Advanced currying
 * allows the function to be both callable normally and get partials.  
*/
function log(date, importance, message){
    alert(`[${date.getHours()}: ${date.getMinutes()}] [${importance}] ${message}`);
}

// Usage:
log = _.curry(log);
log(new Date(), "Debug", 'some debug');
log(new Date())("Debug")('some debug'); // log(a)(b)(c)

// todayLog will be the partial of log with fixed first argument
let todayLog = log(new Date());
todayLog("Info", 'message');



// Advanced curry implementation
function curry(func){

    return function curried(...args){
        if(args.length >= func.length){
            return func.apply(this, args);
        } else {
            return function(...args2){
                return curried.apply(this, args.concat(args2));
            }
        }
    };
}

function sum(a, b, c){
    return a + b + c; 
}

let curriedSum = curry(sum);

// still callable normally
alert(curriedSum(1, 2, 3)); // 6

// get the partial with curried(1) and call it with 2 other arguments
alert(curriedSum(1)(2,3)); // 6

// full curried form 
alert(curriedSum(1)(2)(3)); // 6
