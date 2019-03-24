    // Functions

function showMessage(){
    alert('Hello!');
}
showMessage();



let userName = 'John';
function display(){
    userName = 'Bob';
    alert("Hello, " + userName);
}
alert(userName); // John
display();
alert(userName); // Bob - the value was modified by the function


 // Parameters

 function alertSomething(from, text = 'no text given'){
     alert(from + ' ' + text);
 }
alertSomething('John'); // John no text given
alertSomething('John ', 'is the best!'); // John is the best


// A function with an empty return or without it returns undefined

function doNothing(){}
alert(doNothing() === undefined); // true

function doNothing1(){
    return;
}
alert(doNothing1() === undefined); // true


// Function Expression

let sayHi = function(){
    alert("Hi!");
};
alert(sayHi); //shows the function code

let func = sayHi; // copy

func(); // Hi! - runs the copy
sayHi(); // Hi! 


// Callback functions

function ask(question, yes, no){
    if(confirm(question))
        yes();
    else
        no();
}

function showOk(){
    alert("You agreed.");
}

function showCancel(){
    alert("You cancel the execution");
}

ask("Do you agree?", showOk, showCancel);


// Arrow functions

let sum = (a, b) => a + b;
sum(1, 2); // 3

// The arrow function is a shorter form of:
let sum = function(a, b){
    return a + b;
};

let sayHy = () => alert("Hello!!");