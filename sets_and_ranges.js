// Sets and ranges

/**
 * Sets
 * For instance, [eao] means any of the 3 charcaters: 'a', 'e', 'o'.
 * That's called a set. Sets can be used in a regexp along with regular characters:
*/

alert("Mop top".match(/[tm]op/gi)); // "Mop", "top"

alert("Voila".match(/V[oi]la/)); // null, no matches

/** 
 * Ranges
 * Square brackets may also contain character ranges. For instance, [a-z] is a character in range
 * from a to z, and [0-5] is a digit from 0 to 5.
*/
alert("Exception 0xAF".match(/x[0-9A-F][0-9A-F]/g)); // xAF

/**
 * Character clases are shorthand for certain character sets. For instance:
 *  ~d - is the same as [0-9]
 *  ~w - is the same as [a-zA-Z0-9_],
 *  ~s - is the same as [\t\n\v\f\r] plus few other unicode space characters.
*/

/**
 * Excluding ranges
 * Besides normal ranges, there are "excluding" ranges that look like [^...].
 * They are denoted by a caret character ^ at the start and match any character except the given ones.
 * For instance: 
 *      ~[^aeyo] - any character except 'a', 'e', 'y', 'o'.
 *      ~[^0-9] - any character except a digit, the same as \D
 *      ~[^\s] - any non-space character, same as \S
*/
alert("alice15@gmail.com".match(/[^\d\sA-Z]/gi)); // @ .


/**
 * No escaping in [...]
 * In square brackets the vast majority of special characters can be used without escaping.
 *      ~ a dot '.'
 *      ~ a plus '+'
 *      ~ a caret '^' if not in the beginning(where it means exclusion).
 *      ~ ...
 * 
 * In other words, all special characters are allowed except where they mean something for square brackets.
 * A dot '.' inside square brackets means just a dot. The pattern [.,] would look for one of characters: 
 * either a dot or a comma.  
*/

alert("1 + 2 -3".match(/[-().^+]/g)); // + -
alert("1 + 2 - 3".match(/\-\(\)\.\^\+/g)); // + -