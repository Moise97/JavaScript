// The 'if' statement

let year = prompt('In whitch year was ECMAScript-2015 specification published?', '');
if(year == 2015){
    alert("That's correct!");
    alert("You're so smart!");
}


// Boolean conversion

let cond = (year == 2015); // equality evaluates to true or false


// The 'else' clause

if(cond){
    alert("That's correct");
} else {
    alert("Try again");
}


// Ternary operator '?'

let result = cond? 'true' : 'false';
let accessAllowed = (age > 18) ? 'true' : 'false';