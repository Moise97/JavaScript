// Character clases

/**
 * A character class is a special notation that matches any symbol from a certain set.
 * For the start, let's explore a "digit" class. It's written as \d. We put it in  the 
 * pattern, that means "any single digit". Example:
*/

let str = "+7(903)-123-45-67";
let reg = /\d/;
alert(str.match(reg)); // 7

/**
 * Without the flag g, the regular expression only look for the first match,
 * that is the first digit \d. Let's add the g flag to find all digits:
*/

let regExp = /\d/g;
alert(str.match(regExp)); // array of matches [7, 9, 0, 3, 1, 2, 3, 4, 5, 6, 7]
alert(str.match(regexp).join("")); // 79031234567


/**
 * That was a character class for digits. There are other character classes as well.
 * Most used are:
 *  ~ \d = a digit: a character from 0 to 9 
 *  ~ \s = a space symbol: that includes spaces, tabs, newlines.
 *  ~ \w = a 'wordly' character: either a  letter of English alphabet or a digit or an 
 *         underscore. Non-english letters (like cyrillic or hindi) do not belong to \w
 * 
 * For instance, \d\s\w means a digit, followed by a space character, followed by a 
 * wordly character, like "1 a".
 * 
 * 
 * A regex may contain both regular symbols and character classes.
 * For instance, CSS\d matches a string CSS with a digit after it: 
*/

let str = "CSS4 is cool";
let reg = /CSS\d/;
alert(str.match(reg)); // CSS4

alert("I love HTML5".match(/\s\w\w\w\w\d/)); // " HTML5"


/**
 * Word boundary: \b
 * A word boundary \b - is a special character class.
 * It does not denote a character, but rather a boundary between characters.
 * Usually we use \b to find standalone English words. Word boundary doesn't 
 * work for non-English alphabets.
*/

alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
alert( "Hello, Java!".match(/\bJava\b/) );  // Java
alert( "Hello, Java!".match(/\bHell\b/) );  // null (no match)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (no match)
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78


/**
 * Inverse classes
 * For every character classes there exists an "inverse class", denoted with the 
 * same letter, but uppercased. The "reverse" means that it matches all other 
 * characters, for instance:
 *  ~ \D = non-digit: any character except \d, for instance a letter.
 *  ~ \S = non-space: any character except  \s
 *  ~ \W = non-wordly character: anything but \w
 *  ~ \B = non-boundary: a test reverse to \b
*/

let str = "+7(903)-123-45-67";
alert(str.match(/\d/g).join('')); // 79031234567

alert(str.replace(/\D/g, '')); // 79031234567


/**
 * Spaces are regular characters
 * Usually we pay little atention to spaces. For us strings 1-5 and 1 - 5 are 
 * nearly identical. But if a regexp doesn't take spaces into account, it may 
 * fail to work.
 */

alert("1 - 5".match(/\d-\d/)); // null, no match

alert("1 - 5".match(/\d - \d/)); // 1 - 5, now it works 

// A space is a character. Equal is importance with any other character.


/**
 * A dot is any character
 * The dot "." is a special character class that matches "any character except 
 * a newline". 
*/

alert("z".match(/./)); // Z
let reg = "CS.4";
alert("CSS4".match(reg)); // CSS4
alert("CS 4".match(reg)); // CS 4 - (space is also a character)

// Note that dot means any charcater, but not the absence of a character.
alert("CS4".match(reg)); // no match, because there's no characterto match it


/**
 * The dotall "s" flag
 * Usually a dot doesn't match a newline character. Somethimes it's inconvenient,
 * we really want "any character", newline included. That's what s flag does.
 * If a regexp has it, then the dot "." match literally any character: 
*/

alert("A\nB".match(/A.B/)); // null (no match)

alert("A\nB".match(/A.B/s)); // A\nB (match)