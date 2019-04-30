// Greedy and lazy quantifiers

/**
 * Greedy search
 * To find a match, the regular expression engine uses the following algorithm:
 *      * For every position in the string:
 *          * Match the patern at the position
 *          * If there's no match, go to the next position.
 * 
 * In the greedy mode ( by default ) the qualifier is repeated as many times as possible.
*/

let reg = /".+"/g;
let str = 'a "witch" and her "broom" is one';
alert(str.match(reg)); // "witch" and her "broom"

// instead to finding two matches "witch" and "broom", it finds one: "witch" and her "broom";


/** 
 * Lazy mode
 * The lazy mode of quantifiers is an opposite to the greedy mode. It means "repeat minimal number of times".
 * We can enable it by putting a question mark ? after the quantifier, to that it becomes *? or +? or even ?? for ?
 * 
 * Laziness is only enabled for the quantifier with ?. 
*/

let reg = /".+?"/g;
let str = 'a "witch" and her "broom" is one';
alert(str.match(reg)); // "witch", "broom"
/** 
 * In this example we saw how the lazy mode works for +?. Quantifiers +? and ?? works the similar way - the regexp 
 * engine increade the number of repetitions only if the rest of the pattern can't match on the given position.
*/


// Alternative aproach
let reg = /"[^"]+"/g;
let str = 'a "witch" and her "broom" is one';
alert(str.match(reg)); // "witch", "broom"


// More example (both greedy and lazy mode fails)
let str1 = '...<a href="link1" class="wrong">... <p style="" class="doc">...';
let str2 = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
let reg = /<a href="[^"]*" class="doc">/g;

// Works!
alert( str1.match(reg) ); // null, no matches, that's correct
alert( str2.match(reg) ); // <a href="link1" class="doc">, <a href="link2" class="doc">