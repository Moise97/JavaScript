// Decorators and forwarding
/*
    Javascript gives exceptional flexibility when dealing with functions. They can be passed around, used as
    objects, and now we'll see how to forward calls between them and decorate them. 
*/

// Transparent caching.
/*
    Let's say we have a function slow(x) which is CPU-heavy, but its results are stable. In other words, for 
    the same x it always returns the same result. If the function is called often, we may want to cache
    (remember) the results for different x to avoid spending extra-time on recalculation. But instead of 
    adding that functionality into slow() we'll create a wrapper.  
*/

function slow(x){
    // there can be a heavy CPU-intensive job here
    alert(`Called with ${x}`); 
    return x;
}

function cachingDecorator(func){
    let cache = new Map();
    return function(x){
        if(cache.has(x)){ // if the result is in the map
            return cache.get(x); // return it
        }
        let result = func(x); // otherwise, call function

        cache.set(x,result); // and cache, remember the result
        return result;
    };
}

slow = cachingDecorator(slow);
alert(slow(1)); // slow(1) is called
alert(slow(1)); // the same 


// Using 'fuction.call' for the context
/*
    The caching decorator mentioned above is not suited to work with object methods.
*/
let worker = {
    someMethod() {
      return 1;
    },
  
    slow(x) {
      alert("Called with " + x);
      return x * this.someMethod(); // (*)
    }
};
  
function cachingDecorator(func) {
    let cache = new Map();
    return function(x) {
      if (cache.has(x)) {
        return cache.get(x);
      }
      let result = func.call(this, x); // "this" is passed correctly now
      cache.set(x, result);
      return result;
    };
}
  
worker.slow = cachingDecorator(worker.slow); // now make it caching
  
alert( worker.slow(2) ); // works
alert( worker.slow(2) ); // works, doesn't call the original (cached)


// Going multi-argument with "func.apply"
/*
    The syntax is: func.apply(context, args)
    It runs the func setting this = context and using an array-like object args as the list of arguments.
    The only syntax difference between call and apply is the call expects a list of arguments, while apply
    takes an array-like object with them.
    One of the most important uses of apply is passing the call to another function.
*/
function say(time, phrase){
    alert(`[${time}] ${this.name}: ${phrase}`);
}

let user = {name: 'John'};

let messageData = ['10:00', 'Hello']; // become time and phrase

// user becomes this, messageData is passed as a list of arguments(time, phrase)
say.apply(user, messageData); // [10:00] John: Hello

// Powerful cachingDecorator
/*
    There are 2 changes:
        In the line * it calls hash to create a single key from arguments. Here we use a simple 'joining'
        function that turns arguments(3, 5) into the key '3,5'. More complex cases may require other hashing
        functions.

        Then ** uses func.apply to pass both the context and all arguments the wrapper got to the  original
        function.
*/
let worker = {
    slow(min, max) {
      alert(`Called with ${min},${max}`);
      return min + max;
    }
};
  
function cachingDecorator(func, hash) {
    let cache = new Map();
    return function() {
      let key = hash(arguments); // (*)
      if (cache.has(key)) {
        return cache.get(key);
      }
  
      let result = func.apply(this, arguments); // (**)
  
      cache.set(key, result);
      return result;
    };
}
  
function hash(args) {
    return args[0] + ',' + args[1];
}
  
worker.slow = cachingDecorator(worker.slow, hash);
  
alert( worker.slow(3, 5) ); // works
alert( "Again " + worker.slow(3, 5) ); // same (cached)


// Borrowing a method
/*
    Improve function hash to work for any number of argumnets.
    The solution is to use arr.join method. We take (borrow) a join method from a regular array [].join.
    And use [].join.call to run it in the context of arguments.
*/

function hash() {
    alert( [].join.call(arguments) ); // 1,2
}
hash(1, 2);