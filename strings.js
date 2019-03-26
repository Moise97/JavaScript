 // Strings

 // Quotes
 let single = 'single-quoted';
 let double = "double-quoted";
 let backticks = `backticks`;

 function sum(a, b){
     return a + b;
 }
 alert(`1 + 2 = ${sum(1, 2)}`); // 1 + 2 = 3

 let questList = `Guests; 
 *John
 *Pete
 *Mary
 `;
 alert(questList); // a list of guests, multiple lines

 alert("Hello\nWorld"); // Hello
                        // World

alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, a rare chinese hieroglyph (long unicode)
alert( "\u{1F60D}" ); // 😍, a smiling face symbol (another long unicode)
alert( `The backslash: \\` ); // The backslash: \
alert( `My\n`.length ); // 3

// Accessing characters
let str = `Hello`;
alert(str[0]); // H
alert(str.charAt(0)); // H
alert(str[str.length] - 1); // o
alert(str[1000]); // undefined
alert(str.charAt(1000)); // ''

// Strigs are immutable
str[0] = 'h'; // error
alert(str[0]); // does not work

let string = 'Hi';
string = 'h' + string[1]; // replace the string
alert(string); // hi


// Searching for a substring
let name = "FirstName LastName";
alert(name.indexOf('Name')); // 5
alert(name.indexOf('Name',2)); // 14


// The bitwise NOT trick
alert( ~2 ); // -3  (~n = -(n + 1))

// Includes, startWith, endsWith
alert("Widget".includes("id")); // true
alert("Widget".startsWith("W")); // true
alert("Widget".endsWith("et")); // true


// Getting a substring
// slice(start, end) - from start to end(not include end)
// substring(strat, end) - between start and end 
// subst(strat, length) - from start get length characters

let example = "Example";
alert(example.slice(0,2)); // Ex
alert(example.slice(-5,-1)); // ampl

alert(example.substring(2, 4)); // am
alert(example.substring(4, 2)); // am

alert(example.substr(1,4)); // xamp


// Comparing String
// codePointAt - returns the code for the caracter at position pos
// fromCodePoint - create a character by its numeric code
// localCompare - method to compare string( returns 1, -1, 0)
alert("z".codePointAt(0)); // 122
alert(String.fromCodePoint(122)); //"z"
alert("ea".localeCompare("ea")); // 0