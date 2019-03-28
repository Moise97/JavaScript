// Map, Set, WeakMap and WeakSet

// Map is a collection of keyed data items, just like an Object. But the main difference is that Map allows
// keys of any type

let map = new Map();
map.set('1', 'str1');
map.sset(1, 'num1');
map.set(true, 'bool1');

alert(map.get('1')); // str1
alert(map.get(1)); // num1
alert(map.get(true)); // bool1
alert(map.size); // 3

// Map can also use objects as keys
let john = { name: 'John'};
map.set(john, 'Object');

// Chaining - every map.set returns the map itself, so we can chain the calls
let fruitMap = new Map();
fruitMap.set('1', "Apple")
        .set('2', "Orange")
        .set('3', "Lemon");


// Map from Object
let randomMap = new Map(Object.entries({
    name: 'John',
    age: 30
}));

// Iteration over Map
let recipeMap = new Map([
    ['cucumber', 500],
    ['tomatoes', 350],
    ['onion', 50]
]);

// iterate over keys
for(let keysOfMap of recipeMap.keys){
    alert(keysOfMap); 
}

// iterate over values 
for(let valuesOfMap of recipeMap.values){
    alert(valuesOfMap);
}

// iterate over entities
for(let entitiesOfMap of recipeMap.entries){
    alert(entitiesOfMap);
}


// Set is a collection of values, where each value may occur only once
let set = new Set();
let john = {name: 'John'};
let mary = {name: 'Mary'};
let pete = {name: 'Pete'};
set.add(john);
set.add(mary);
set.add(john);
set.add(pete);
set.add(pete);
alert(set.size); // 3
for(let user of set){
    alert(user.name);
}

// Iteration over set
set.forEach((value, valueAgain, set) => {
    alert(value);
});


// WeakMap and WeakSet
// WeakSet is a special kind of Set that does not prevent JavaScript from removing its items from memory.
// WeakMap is the same thing for Map.
// WeakMap and WeakSet allows only keys of type onject!!

let plane = {name: 'Airbus'};
let planeMap = new Map();
planeMap.set(plane, 'Plane');
plane = null; // overwrite the reference
// but plane is stored inside the map, so we can get it by using map.keys()

let planeWeakMap = new WeakMap();
planeWeakMap.set(plane);
plane = null;
// plane is removed from memory.
