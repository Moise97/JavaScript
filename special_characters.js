// Escaping, special characters

/**
 * As we've seen, a backslash '\' is used to denote character classes. So it's a special character in regexp. 
 * There are other special characters as well, that have special meaning in regexp. They are used to do more
 * powerful searches. Here's a full list of them: " [ \ ^ $ . | ? * + ( ) "
*/

/**
 * Escaping
 * Let's say that we want to find a dot literally. Not any character, but just a dot.
 * To use a special character as a regular one, prepend it with a backslash: \.
 * That's also called 'escaping a character'.
*/
alert("Chapter 5.1".match(/\d\.\d/)); // 5.1 (match)
alert("Chapter 511".match(/\d\.\d/)); // null (looking for a real dot \.)

/**
 * Parentheses are also special characters, so if we want them, we should use \( 
*/

alert("function g()".match(/g\(\)/)); // g()

/**
 * If we're looking for a backslash \, it's a special character in both regular string and regexp, so we should
 * double it.
*/

alert("1\2".match(/\\/)); // \

/**
 * A slash
 * A slash symbol '/' is not a special character, but in JavaScript it is used to open and close regexp:
 * /......pattern....../, so we should escape it too.
 * Here's what a search for a slash '/' looks like:
*/

alert("/".match(/\//)); // /

/**
 * On the other hand, if we're not using /..../, but create a regexp using new RegExp, then we don't need to
 * escape it:
*/
alert("/".match(new RegExp("/"))); // /

/**
 * New RegExp
 * If we are creting a regular expression with new RegExp, then we don't have to escape /, but need to do some
 * other escaping. For instance, consider this:
*/
let reg = new RegExp("\d\.\d");
alert("Chapter 5.1".match(reg)); // null

/** 
 * It worked with /\d\.\d/, but with new RegExp("\d\.\d") it doesn't, why?
 * The reason is that backslashes are "consumed" by a string. Remember, regular strings have their own special
 * characters like \n, and a slash is used for escaping.
 * So the call to new RegExp gets a string without backslashes. That's why it doesn't work.
 * To fix it, we need to double backslashes, because quotes turn \\ into \.
*/

let regStr = "\\d\\.\\d";
alert(regStr); // \d\.\d
let reg = new RegExp(regStr);
alert("Chapter 5.1".match(reg)); // 5.1