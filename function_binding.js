// Function Binding
/*
    When using setTimeout with object methods or passing object methods along, there's a known problem 
    'loosing this'. We already know that in JavaScript is easy to lose this. Once a method is passed somewhere,
    separately from the object - this is lose.
*/

let user = {
    firstName:'John',
    sayHi(){
        alert(`Hello, ${this.firstName}!`);
    }
};
setTimeout(user.sayHi,1000); // Hello, undefined!



// Solution 1: Wrapper

setTimeout(function(){
    user.sayHi();// Hello, John!
}, 1000);

// or

setTimeout(()=> user.sayHi(), 1000); // Hello, John!

//    Looks fine, but a slight vulnerability appears in our code structure

let user = {
    firstName: 'John',
    sayHi(){
        alert(`Hello, ${this.firstName}`);
    }
};

setTimeout(()=> user.sayHi(), 1000);

// within 1 sec ...

user = {
    sayHi(){
        alert("Another user in setTimeout!");
    }
}

// Another user in setTimeout




// Solution 2: Bind
/*
    The basic sintax is: let boundFunc = func.bind(context);
    The result of func.bind(context) is a special function-like 'exotic object', that is callable
    as function and transparently passed the call to func setting "this = context". In other words, 
    calling boundFunc, is like func with fixed this.
*/

let user = {
    firstname: 'John'
};

function func(){
    alert(this.firstName);
}

let userFunc = func.bind(user);
userFunc(); // John

// All arguments are passed to the oeriginal func 'as is'.

let user = {
    firstName: 'JOHN'
};

function func(phrase){
    alert(phrase + ", " + this.firstName);
}

// bind this to user
let funcUser = func.bind(user);

funcUser('Hello'); // Hello, JOHN - argument Hello is passed, and this = user


// Now, let's try with an object method
let user = {
    firstName: 'Peter',
    sayHi(){
        alert(`Hello, ${this.firstName}!`);
    }
};

let sayHi = user.sayHi.bind(user); // *

sayHi(); // Hello,Peter!

setTimeout(sayHy, 1000); // Hello, Peter! 


// Convenience method: BindAll
/*
    If an object has many methods and we plan to activelly pass it around, then we could 
    bind them all in a loop: 
*/

for(let key in user){
    if(typeof user[key] == 'function'){
        user[key] = user[key].bind(user);
    }
}