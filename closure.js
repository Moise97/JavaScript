// Closure

// Nasted functions - a nested function is called nested when it is created inside another function.

function makeCounter(){
    let count =0;

    return function(){
        return count++; // has acces to the outer counter
    }
}
let counter = makeCounter();
alert(counter()); // 0
alert(counter()); // 1
alert(counter()); // 2



// IIFE - immediately-invoked function expressions

(function(){
    let message = "hello";
    alert(message);
})();