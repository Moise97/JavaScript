// Methods of RegExp and String

/**
 * There are two sets of methods to deal with regular expressions.
 * 1. First, regular expressions are objects of the build-in RegExp class, it provides many methods.
 * 2. Besides that, there are methods in regular strings can work with regexp.
*/

/**
 * Recipes
 * Which method to use depends on what we'd like to do.
 * Methods became much easier to understand if we separate them by their use in real-life task:
 * 1. To search for all matches ~ Use regexp g flag and:
 *      - get a flat array of matches - str.match(reg)
 *      - get an array or matches with details - str.matchAll(reg)
 * 2. To search for the first match only:
 *      - get the full first match - str.match(reg) (without g flag)
 *      - get the string position of the first match - str.search(reg)
 *      - check if there's a match - regexp.test(str).
 *      - find the match from the given position - regexp.exec(str) (set regexp.lastIndex to position)
 * 3. To replace all matches:
 *      - replace with another string or a function result - str.replace(reg, str|func)
 * 4. To split the string by a separator
 *      - str.split(str|reg)
*/

/**
 * str.search(reg)
 * we've seen this method already. it returns the position of the first match or -1 if none found.
 * The important limitation: search only finds the first match. We can't find next position using search,
 * there's just no syntax for that. But there are other methods that can.
*/
let str = "A drop of ink may make a million think";
alert(str.search(/a/i)); // 0 (the first position)

/**
 * str.match(reg), no "g" flag
 * The behavior of str.match varies depending on whether reg has g flag or not.
 * First, if there's no "g" flag, then str.match(reg) looks for the first match only.
 * The result is an array with that match and additional properties:
 *      - index = the position of the match inside the string
 *      - input = the subject string
*/

let str = "Fame is the thirst of youth";
let result = str.match(/fame/i);
alert(result[0]); // fame (the match)
alert(result.index); // 0 (at the zero position)
alert(result.input); // "Fame is the thirst of youth" (the string)

// !!! A match result may have more than one element.

/**
 * If a part of the pattern is delimited by parantheses (...), then it becomes a separate element in the array.
 * If parantheses have a name, designated by (?<name>...) at their start, then result.groups[ name ] has the content.
*/

let str = "JavaScript is a programming language";
let result = str.match(/Java(SCRIPT)/i); 
alert(result[0]); // JavaScript (the whole match)
alert(result[1]); // Script (the part of the match that coresponds to the parantheses)
alert(result.index); // 0
alert(result.input); // JavaScript is a programming language

/**
 * str.match(reg) with "g" flag
 * When there's a "g" flag, then str.match returns an array of all matches. There are no additional properties
 * in the array, and parantheses do not create any elements.
*/

let str = "HO-Ho-ho!";
let result = str.match(/ho/ig);
alert(result); // HO, Ho, ho (array of three matches, case-insensitive)

// parantheses do not change anything, here we go:
let str = "HO-Ho-ho";
let result = str.match(/h(o)/ig);
alert(result); // HO, Ho, ho

// So, with "g" flag str.match returns a simple array of all matches, without details.

// !!! If there are no matches, str.match returns null

/**
 * str.matchAll(regexp)
 * The method str.matchAll(regexp) is used to find all matches with all details
*/

let str = "Javascript or JavaScript? Should we uppercase 'S'?";
let result = str.matchAll(/java(script)/ig);
let [match1, match2] = result;

alert(match1[0]); // Javascript
alert(match1[1]); // script
alert(match1.index); // 0
alert(match1.input); // = str

alert(match2[0]); // JavaScript
alert(match2[1]); //Script
alert(match2.index); // 14
alert(match2.input); // = str

/**
 * matchAll returns an iterable, not array.
 * For instance, if we try to get the first match by index, it won't work.
 * The reason is that the iterator is not an array. We need to run Array.from(result) on it, or
 * use for..of loop to get all matches. In practice, if we need all matches, then for..of works
 * so it's not a problem. And, to get only a few matches, we can destructing.
*/

let str = "Javascript or JavaScript?";
let result = str.matchAll(/javascript/ig);
alert(result[0]); // undefined (?! there must be a match)

let [firstMatch] = str.matchAll(/javascript/ig);
alert(firstMatch); // Javascript

/**
 * str.split(regexp|substr, limit)
 * Splits the string using the regexp(or a substring) as a delimiter.
 * We already used split with strings, like this:
*/
alert('12-34-56'.split('-')); // array of [12, 34, 56];

// But we can split by regular expression, the same way:
alert('12-34-56'.split(/-/)); // array of [12, 34, 56]


/**
 * str.replace(str|reg, str|func)
 * That's actually a great method, one of the most useful ones. The swiss army knife for searching and replacing.
 * the simplest use - searching and replacing a substring, like this:
*/
// replace a dash by a colon
alert('12-34-56'.replace('-', ':')); // 12:34-56

/**
 * When the first argument of replace is a string, it only looks for the first match.
 * You can see that in the example above: only the first '-' is replaced by ':'.
 * To fins all dashes, we need to use not the string '-', but a regexp /-/g, with an obligatory g flag:
*/
// replace all dashes by a colon

alert('12-34-56'.replace(/-/g)); // 12:34:56

/**
 * The second argument is a replacement string. We can use special characters in it:
 * 
 * ....Symbol..........Insert......................
 *      $$              "$"
 *      $&              the whole match              
 *      $`              a part of the string before the match
 *      $'              a part of the string after the match
 *      $n              if n is a 1-2 digit number, then it means the contents of n-th
 *                      parantheses counting from left to right, otherwise it means a 
 *                      parantheses with the given name.
*/

// $&
let str = "John Doe, John Smith and John Bull";
// for each John - replace it with Mr. and then John
alert(str.replace(/John/g, 'Mr.$&')); // Mr.John Doe, Mr.John Smith and Mr.John Bull


// &1, $2
let str = "John Smith";
// swap first and last name
alert(str.replace(/(john) (smith)/i, '$2, $1')); // Smith, John


/**
 * For situations taht require "smart" replacement, the second argument can be a function
 * It will be called for a match, and its result will be inserted as a replacement.
*/

let i = 0;
// replace each 'ho' by the result of the function
alert('HO-Ho-ho'.replace(/ho/gi, function(){
    return ++i;
})); // 1-2-3

// Let's see how to show full information about matches:
// show and replace all matches
function replacer(str, offset, input) {
    alert(`Found ${str} at position ${offset} in string ${input}`);
    return str.toLowerCase();
}
  
let result = "HO-Ho-ho".replace(/ho/gi, replacer);
alert( 'Result: ' + result ); // Result: ho-ho-ho

// shows each match:
// Found HO at position 0 in string HO-Ho-ho
// Found Ho at position 3 in string HO-Ho-ho
// Found ho at position 6 in string HO-Ho-ho


/**
 * regexp.exec(str).
 * We've already seen these searching methods:
 *      - search = looks for the position of the match,
 *      - match = if there's no g flag, returns the first match with parentheses and all details,
 *      - match = if there's a g flag - returns all matches, without details parentheses,
 *      - matchAll = returns all matches with details.
 * 
 * The regexp.exec is the most flexible searching method of all. Unlike previous methods, exec should be 
 * called on a regexp, rather than on a string. It behaves differently depending on whather the regexp has the g flag.
 * If there's no g, then regexp.exec(str) returns the first match, exactly as str.match(reg). Such behavior does not give 
 * us anything new.
 * But if there's g, then:
 *      - regexp.exec(str) returns the first match and remembers the position after it in regxp.lastIndex property.
 *      - the next call starts to search from regexp.lastIndex and returns the next match.
 *      - if there are no more matches then regexp.exec returns null and regexp.lastIndex is set to 0.
 * 
 * We could use it to get all matches with their positions and parentheses groups in a loop, instead of matchAll:
*/

let str = 'A lot about JavaScript at http://javascript.info';

let regexp = /javascript/ig;

let result;

while(result = regexp.exec(str)){
    alert(`Found ${result[0]} at ${result.index}`);
}

// Result:
// Found JavaScript at 12
// Found javascript at 34

/**
 * Surely, matchAll does the same, at least for modern browsers. But what matchAll can't do - is to search from a given position.
 * let's search from position 13. What we need is to assign regexp.lastIndex = 13 and call regexp.exec:
*/

let str = "A lot about Javascript at https://javascript.info";

let regexp = /javascript/ig;
regexp.lastIndex = 13;

let result;

while(result = regexp.exec(str)){
    alert(`Found ${result[0]} at ${result.index}`);
}

// Result
// Found javascript at 34

// Now, starting from the position given position 13, there's only one match.

/**
 * regexp.test(str)
 * The method regexp.test(str) looks for a match and returns true/false whether it finds it.
*/

let str = 'I love JavaScript';
alert(/love/i.test(str)); // true
alert(str.search(/love/i) != -1); // true

let str = 'Bla-bla-bla'; 
alert(/love/i.test(str)); // false
alert(str.search(/love/i) != -1); // false

/**
 * If the regexp has 'g' flag, then regexp.test advances regexp.lastIndex property, just like regexp.exec.
 * So we can use it to search from a given position.
*/

let regexp = /love/gi; // regexp just created: regexp.lastIndex = 0
let str = "I love JavaScript"; 

// start the search from position 10
regexp.lastIndex = 10;
alert(regexp.test(str)); // false (no match)