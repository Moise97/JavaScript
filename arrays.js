// Arrays

// Declaration
let arr = new Array();
let arr1 = [];

let fruits = ['apple', 'orange', 'plum'];
fruits[3] = 'pear';

alert(fruits.length); // 4

let arrMix = ['apple', {name: 'John'}, true, function(){ alert("Hello"); }];
alert(arr[3]()); // Hello


// Methods 
// push - append an element to the end
// pop - takes an element from the end
// shift - get an element from the beginning, advancing the queue, so that the 2rd element becomes the 1st
// unshift - add the element to the beginning of the array

let names = ['John']; // John
names.unshift('Peter'); // add Peter to the beginning of the array
names.shift(); // remove Peter from the beginning of array and alert it
names.push('Mateo'); // append Mateo to the end of array
names.pop(); // remove Mateo from the end of array and alert it


// Iterates over array elements
let cars = ['BMW', 'Audi', 'Mercedes', 'Subaru'];
for(let car of cars){
    alert(car); // BMW, Audi, Marcedes, Subaru
}


// Length
alert(cars.length); // 4
cars[10] = 'Dacia';
alert(cars.length); // 11
cars.length = 2; // truncate to 2 elements
alert(cars); // BMW, Audi


// new Array()
// If new Array() is called with a single argument of type number, then it createa an 
// array without items, but with the given length. 
let computers = new Array("Asus", 'Dell');

let smartphones = new Array(2);
alert(smartphones[0]); // undefined, no elements
alert(smartphones.length); // 2


// Multidimensional arrays
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
alert(matrix[1][1]); // 5


// to String
let nums = [1, 2, 3];
alert(nums); // 1, 2,3
alert(String(nums) === '1,2,3'); // true

// When the binary + operator adds something to a string, it converts it to a string as well
alert([] + 1); // '1'
alert([1] + 1); // '11'
alert([1, 2] + 1); // '1, 21'



// Array methods

// Delete is not good for remove elements from array
let numbers = [1, 3, 5, 7, 9];
delete numbers(4); // remove element 9
alert(numbers[4]); // undefined - because delete removes a value by the key
alert(numbers.length); // 5

// Splice or slice - can add, remove and insert elements in arrays
let planes = ['Airbus', 'Boeing', 'Birdman', 'Conair'];

planes.splice(2, 1); // from index 2 remove 1 element
alert(planes); // Airbus, Boeing, Conair

planes.splice(0, 2, "Comper"); // remove first 2 elements and replace with other one
alert(planes); // Comper, Conair

planes.splice(1, 0, "Airbus", "Boeing"); // from index 1 delete 0 elements and add 2 new elements
alert(planes); // Comper, Conair, Airbus, Boeing

planes.splice(-1, 0, "Douglas"); // from index -1(one step from the end) delete 0 elements and add new one
alert(planes); // Comper, Conair, Airbus, Douglas, Boeing

// Concat - joins the array with other arrays and/or items
let numArr = [1, 2];
alert(numArr.concat([3, 4])); // 1, 2, 3, 4
alert(numArr.concat([3, 4], 5)); // 1, 2, 3, 4, 5

let arrayLike = {
    0: 'something',
    length: 1
};
alert(numArr.concat(arrayLike)); // 1, 2, [object Object]


// Iterate - forEach
[1, 2, 3].forEach(alert); // 1, 2,3 


// Searching in array
let nameArray = ['Bilbo', 'Gandalf', 'Nazgul'];
alert(nameArray.indexOf(0)); // Biblo
alert(nameArray.includes("Batman")); // false
let users = [
    {id: 1, name: 'John'},
    {id: 2, name: 'Pete'},
    {id:3, name: 'Mary'}
];
// find() method
let user = users.find(item => item.id == 1); 
alert(user.name); // John
// filter() method
let someUsers = users.filter(item => item.id < 3);
alert(someUsers.name); // John, Pete


// Transform an array

//map() function
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6

// sort(fn)
let someNum = [1, 2, 15];
someNum.sort();
alert(someNum); // 1, 15, 2 - !!!!! The items are sorted as strings by default

function compareNumeric(a, b) { // a comparison function is required to return a positive number 
    if (a > b) return 1;        // to say 'greater' and a negative one to say 'less'
    if (a == b) return 0;
    if (a < b) return -1;
}
someNum.sort(compareNumeric);
alert(someNum); // 1, 2, 15

someNum.sort(function(a, b){
    return a - b;
});
alert(someNum); // 1, 2, 15

someNum.sort((a,b) => a - b); // arrow function for the best

// reverse
someNum.reverse();
alert(someNum); // 15, 2, 1

// split
let legends = 'Bilbo, Gandalf, Nazgul';
let arrOfLegends = legends.split(', ');
alert(arrOfLegends[0]); // Bilbo

let str = "test";
alert( str.split('') ); // t,e,s,t

// join
let arrName = ['Bilbo', 'Gandalf', 'Nazgul'];
let str = arrName.join(';');
alert( str ); // Bilbo;Gandalf;Nazgul

// reduce - are used for calculate a single value bassed on the array
let arrNum = [1, 2, 3, 4, 5];
let result = arrNum.reduce((sum, current) => sum + current, 0);
alert(result); // 15


// thisArg
let user = {
    age: 18,
    younger(otherUser) {
      return otherUser.age < this.age;
    }
};
  
let users = [
    {age: 12},
    {age: 16},
    {age: 32}
];
  
// find all users younger than user
let youngerUsers = users.filter(user.younger, user);
  
alert(youngerUsers.length); // 2
