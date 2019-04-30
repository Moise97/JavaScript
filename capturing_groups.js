// Capturing groups

/** 
 * A part of a pattern can be enclosed in parentheses (...). This is called a "capturing group".
 * That has two effects:
 *      * it allows to place a part of the match into a separate array.
 *      * if we put a quantifier after the parentheses, it applies to the parentheses as a whole, not the last character.
*/

alert("Gogogo".match(/(go)+/)); "Gogogo";

/** 
 * Content of parentheses
 * Pharentheses are numbered from left to right. The search engine remembers the content of each and allows to 
 * reference it in the pattern or in the replacement string.
*/

let str = '<h1>Hello, world!</h1>';
let reg = /<(.*?)>/;
alert( str.match(reg) ); // Array: ["<h1>", "h1"]


/** 
 * Nested groups
 * Parentheses can be nested. In this case the numbering also goes from left to right.
 * For instance, when searching a tag in <span class="my"> we may be interested in:
 *      * The tag content as a whole: span class="my"
 *      * The tag name: span
 *      * The tag attribute: class="my"
*/

let str = '<span class="my">';

let reg = /<(([a-z]+)\s*([^>]*))>/;

let result = str.match(reg);
alert(result); // <span class="my">, span class="my", span, class="my"


/**
 * Named groups
 * Remembering groups by their number is hard. For simple patterns it's doable, but for more complex one we can 
 * give names to parentheses. That's done by putting ?<name> immediately after the opening paren, like this:
*/

let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
let str = "2019-04-30";

let groups = str.match(dateRegexp).groups;

alert(groups.year); // 2019
alert(groups.month); // 04
alert(groups.day); // 30


/**
 * Non-capturing groups with ?:
 * Somethimes we need parentheses to correctly apply quantifiers, but we don't want the contents in result.
 * A group may be excluded by adding ?: in the beginning.
 * For instance, if we want to find (go)+, but don't want to remember the content (go) in a separate array
 * item, we can write: (?:go)+
*/

let str = "Gogo John!";
// exclude Gogo from capturing
let reg = /(?:go)+ (\w+)/i;

let result = str.match(reg);

alert( result.length ); // 2
alert( result[1] ); // John