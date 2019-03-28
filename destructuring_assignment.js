// Destructuring assignment

// Destructuring assignment is a special syntax that allows us to unpack arrays or objects into a bunch of
// variables, as somethimes thay are more convenient. Destructuring also work great with complex functions,
// that have a lot of parameters, default values, and soon we'll see how these are handled too.

// Array destructuring
let arr = ["name1", "name2"];
let [name, surname] = arr;
alert(name); // name1
alert(surname); // name2

let [firstName, lastName] = "Name Surname".split(" "); 

// Ignore first element
let [, , title] = ['Julius', 'Caesar', 'Consul', 'of the Roman Republic'];
alert(title); // Consul

// Works with any iterable on the right-side
let [a, b, c] = "abc"; 
let [one, two, tree] = new Set([1, 2, 3]);

// Assign to anything at the left-side
let user = {};
[user.name, user.surname] = "userName userSurname".split(' ');
alert(user.name); // userName

// Looping with .entries()
let userMap = new Map();
userMap.set("name", "john");
userMap.set("age", "20");
for(let [key, value] of userMap.entries()){
    alert(`${key}: ${value}`);
}


// The rest '...'
let [name1, name2, ...rest] = ["name1", "name2", "name3", "name4", "name5"];
alert(rest[0]); // name3
alert(rest[1]); // name4
alert(rest[2]); // name5


// Default values
let [name = 'Guest', surname = 'Anonymous'] = ["User"];
alert(name); // User
alert(surname); // Anonymous



// Object destructuring
let options = {
    title: "Menu",
    width: 100,
    height: 200
};
let {title, width, height} = options;
alert(title);  // Menu
alert(width);  // 100
alert(height); // 200


let options = {
    title: "Menu"
};
let {width = 100, height = 200, title} = options;  
alert(title);  // Menu
alert(width);  // 100
alert(height); // 200

// The rest operator
let options = {
    title: "Menu",
    height: 200,
    width: 100
};
let {title, ...rest} = options;  
// now title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100



// Smart function parameters

// we pass object to function
let options = {
    title: "My menu",
    items: ["Item1", "Item2"]
};
  
// ...and it immediately expands it to variables
function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
    // title, items – taken from options,
    // width, height – defaults used
    alert( `${title} ${width} ${height}` ); // My Menu 200 100
    alert( items ); // Item1, Item2
}
  
showMenu(options);