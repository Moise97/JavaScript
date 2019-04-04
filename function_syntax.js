// The 'new Function' syntax

// When a function is created using new Function, it's environment references not the current Lexical
// Environment, but instead the global one.

function getFunction(){
    let value = 'test';

    let func = new Function('alert(value)');

    return func;
}
getFunction()(); // Error: value is not defined


function getFunction1(){
    let value = "test";

    let func = function(){ alert(value)};

    return func;
}
getFunction1()(); // "test" - from the Lexical Environment of getFunction1