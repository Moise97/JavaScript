// Patterns and flags

/**
 * Regular expresions is a powerfull way of searching and replacing inside a string. In JavaScript regular expressions are implemented 
 * using objects of a build-in RegExp class and integrated with string.
 * Please note that regular expresiions vary between programming languages. In this tutorial we concentrate on JavaScript.
 * Of course there's a lot in common, but they are somewhat different in Perl, Ruby, PHP etc.
*/

/**
 * Regular Expressions
 * A regular expression (also "regexp", or just "reg") consist of a pattern and optional flags. There are two syntaxes to create 
 * expressions object. 
 * The long syntax: regexp = new RegExp("pattern", "flags");
 * The short syntax: regexp = /pattern/; (no flags)
 *                   regexp = /pattern/gmi; (with flags g, m and i)
 * 
 * Slashes "/" tell the JavaScript that we are creating a regular expression. They play the same role as quotes for strings.
*/

// Usage - to search inside a string, we can use method search.
let str = "I love Javascript"; // we will search here
let regexp = /love/;
alert(str.search(regexp)); // 2

/**
 * The str.search method looks for the pattern /love/ and returns the position inside the string. As we might guess, /love/
 * is the simplest possible patters. What it does is a simple substring search.
 * The code above is the same as:
*/

let str = "I love JavaScript"; // will search here
let substr = 'love';
alert(str.search(substr)); // 2

// So search for /love/ is the same as searching for "love";

/**
 * When to use new RegExp?
 * Normally we use the short syntax /.../. But it does not allow any variable insertions, so we must know the exact regexp
 * at the time of writing the code. On the other hand, new RegExp allows to construct a pattern dynamically from a string.
 * So we can figure out what we need to search and create new RegExp from it:
*/
let search = prompt("What you want to search?", "love");
let regexp = new RegExp(search);
// find whatever the user wants
alert("I love JavaScript".search(regexp)); 


/**
 * Flags
 * Regular expressions may have flags that affect the search.
 * There is only 5 of them in JavaScript.
 *      - i = with this flag search in case-insensitive: no fifference between A and a
 *      - g = with this flag the search looks for all matchers, without it - only for first one
 *      - m = multiline mode
 *      - s = "dotall" mode, allows . to match newlines
 *      - u = enables full unicode support. The flag enables correct processing of surrogate pair.
 *      - y = sticky mode
*/

// Example - with flag "i"
let str = "I love JavaScript";
alert(str.search(/LOVE/i)); // 2 (found lowercased)
alert(str.search(/LOVE/)); // -1 (nothing found without 'i' flag)