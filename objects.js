 // Objects

 let user = new Object(); // 'object constructor' syntax
 let user = {}; // 'object literal' syntax

 let userObj = {    // an object
     name: 'John',  // by key 'name' store value 'John'
     age = 30       // by key 'age' store value 30
 };

 alert(userObj.name); // John
 alert(userObj.age);  // 30

 delete user.age; // remove property age


 let userObject = {};

user["likes birds"] = true; // set

alert(user["likes birds"]); // get

delete user["likes birds"]; // delete



let fruit = 'apple';
let bag = {
    [fruit + 'Computers']: 5
}

alert(bag.appleCpmputers); // 5


let userCopy = {
    name:'John',
    age: 30
};
alert('name' in userCopy); // true
alert('somethingKey' in userCopy); // false

for (let key in userCopy) {
    alert(key); // name, age
    alert(user[key]); //'John', 30
}

let codes = {
    "3": 'Germany',
    "5": 'USA',
    "1": 'Romania'
};

for(let code in codes){
    alert(code); //1, 3, 5 // integer properties are sorted, others appear in creation order
}



// Copiyng by reference

let usr = {name: 'John'};
let admin = usr; // copy the reference
admin.name = 'Pete'; // changed by the admin reference
alert(usr.name); // 'Pete' - changes are seen from the usr reference

const objUser = {
    name: 'John'
};
objUser.age = 30; // an object decalred as const can be changed

let clone = {};
for(let key in objUser){
    clone[key] = objUser[key]; // copy all the objUser properties into clone
}
alert(clone.name); // 'John'


let userMerge = {
    name: "Brian"
};
let permissions1 = {canView: true};
let permissions2 = {canRead: true};
Object.assign(userMerge, permissions1, permissions2);
    // copies all the properties from permissions1 and permissions2 into userMerge
    // now userMerge = {name: "Brian", canView: true, canRead: true}

let userMergeClone = Object.assign({}, userMerge); // clonning userMerge with assign method