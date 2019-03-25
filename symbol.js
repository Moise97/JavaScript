// Symbol type

// By specification, the object property keys may be either of string type, or of symbol type.
let id = Symbol(); // id is a new Symbol
let id1 = Symbol("id"); // id is a symbol with the description "id"
alert(id); // TypeError - Cannot convert a Symbol value to a string

let user = {
    name = 'John'
};
user[id] = "value";
alert(user[id]); // 'value'

for(let key in user){
    alert(key); // name - symbol properties are skipped by for...in loops
}

alert(user[id]); // 'value' - the direct acces by the symbol works

let user1 = {
    [id1]: 123
};
let clone = Object.assign({}, user1);
alert(clone[id]); // 123 - assign copies both string and symbols properties


let sym = Syblol.for("name");
let sym2= Symbol.for("age");
alert(Symbol.keyFor(sym)); // name
alert(Symbol.keyFor(sym2)); // age

