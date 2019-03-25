// Object methods

let user = {
    name: 'John',
    age: 22
};

user.sayHeelo = function(){
    alert("Hello");
};

function sayHy(){
    alert("Hy");
}
user.sayHy = sayHy; 

user.sayHello(); // Hello
user.sayHy; // Hy


let user1 = {
    name: "Name",
    surname: "Surname",
    gatName(){
        alert(this.name + " " + this.surname); // to access the object, a method can use the this keyword 
    }
}


let user2 = { name: "John" }; 
let user3 = { name: "Michael" };

function getMyName(){
    return this.name;
}
//use the same function in two objects
user2.f = getMyName;
user3.f = getMyName;

user2.getMyName(); // John - this == user2
user3.getMyName(); // Michael - this == user3


// Arrow functions have no this
let user4 = {
    firstName: "firstName",
    saySomething(){
        let arrow = () => alert(this.firstName);
        arrow();
    }
}
user4.saySomething(); // firstName




