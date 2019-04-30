// Backreferences in pattern: \n and \k

/**
 * Backreference by number: \n
 * 
 * To make things clear let's consider a task:
 * We need to find a quote string: either a single-quoted '...' or a double-quoted "...". 
 * Both variants need to match.
*/

let str = `He said: "She's the one!".`;

let reg = /['"](.*?)['"]/g;

// The result is not what we expect
alert( str.match(reg) ); // "She'

/**
 * As we can see, the pattern found an opening quote ", then the text is consumed lazily 
 * till the other quote ', that closes the match.
 * 
 * To make sure that the pattern looks for the closing quote exactly the same as the opening one, 
 * we can make a groups of it and use the backreference.
 * Further in the pattern \1 means “find the same text as in the first group”, exactly the same quote in our case.
*/

let str = `He said: "She's the one!".`;

let reg = /(['"])(.*?)\1/g;

alert( str.match(reg) ); // "She's the one!"


/**
 * Backreference by name: \k<name>
 * For named groups, we can backreference by \k<name>
*/

let str = `He said: "She's the one!".`;

let reg = /(?<quote>['"])(.*?)\k<quote>/g;

alert( str.match(reg) ); // "She's the one!"