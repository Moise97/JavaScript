// Function Object, NFE

// As we already know, functions in JavaScript are values.
// Every value in JavaScript has a type. 
// In JavaScript, functions are objects.
// A good way to imagine functions is a callable "action object". 
// We can not only call them, but also treat them as objects: add/remove properties, pass by reference...

// The 'name' property - return the name of function
function sayHi(){
    alert("Hy");
}
alert(sayHi.name); // sayHi

let sayHallo = function(){
    alert("Hello");
}
alert(sayHallo.name); // sayHallo

let user = {
    showName(){
        alert("Name");
    },
    showSurname: function(){
        alert("Surname");
    }
}

alert(user.showName.name); // showName
alert(user.showSurname.name); // showSurname


// The 'length' property - return the number of function parameters
function f1(a){};
function f2(a, b, ...many){};
alert(f1.length); // 1
alert(f2.length); // 2


// Custom property
// A property is not a variable

function apel(){
    alert("Apel");

    // let's count how many times we run
    alert.counter++;
}
alert.counter = 0; // initial value

apel();
apel();

alert(`Called apel() ${apel.counter} times`); // Called apel() 2 times


// NFE - Named function expresion
// NFE is a term for function expressions that have a name
// Advantages:  -it allows the function to reference itself internally 
//              -it is not visible outside of the function  

let alertName = function alertUserName(whichUser){
    alert(`Hello, ${whichUser}`);
};

alertName("admin"); // Hello admin
