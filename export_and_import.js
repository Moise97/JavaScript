// Export and import

/**
 * Explore before declarations.
 * We can label any declaration as exported by placing export before it, be it a variable, function or a class.
 * For instance, here all exports are valid:
*/

//export an array
export let monts = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// export a constant
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// export a class
export class User {
    constructor(name){
        this.name = name;
    }
}


/**
 * Export apart from declarations
 * Also, we can put export separately. Here we first declare, and then export:
*/

// ~~~ say.js
function sayHi(user){
    alert(`Hello, ${user}!`);
}

function sayBye(user){
    alert(`Bye, ${user}!`);
}

export {sayHi, sayBye}; // a list of exported variables


/**
 * Import*
 * Usually, we put a list of what to import into import {...}.
 * But if the list is long, we can import everything as an object using import * as <obj>.
*/

// ~~~ main.js
import {sayHi, sayBye} from './say.js';
sayHi("John");
sayBye("John");

// ~~~main.js
import * as say from './say.js';
say.sayHi("User");
say.sayBye("User");


/**
 * Import "as"
 * We can also use 'as' to import under different names.
*/

// ~~~ main.js
import {sayHi as hi, sayBye as bye} from './say.js';
hi('John'); // Hello, John!
bye('John'); // Bye, John!


/**
 * Export 'as'
 * The similar syntax exists for export.
*/

// ~~~ say.js
// ...
export {sayHi as hi, sayBye as bye};

// Now hi and bye are officially names for outsiders:

// ~~~ main.js
import * as say from "./say.js";
say.hi("John"); // Hello, John!
say.bye("John"); // Bye, John!


/**
 * Export default
 * So far, we've seen how to import/export multiple things, optionally 'as' other names.
 * In practice, modules contains either:
 *      - a library, pack of functions, like lib.js
 *      - or an entity, like class User is described in user.js, the whole module has only this class.
 * Modules provide special export default syntax to make "one thing per module" way look better.
 * It requires following export and import statements:
 *      - put "export default" before the 'main export' of the module.
 *      - call "import" without curly braces.
*/

// ~~~ user.js
export default class User {
    constructor(name){
        this.name = name;
    }
}

// ~~~ main.js
import User from './user.js'; // Not {User}, just User
new User("John");


// Named export ------------------------------- Default export
// ~~~~~~~~~~~~~~~~~~~~                         ~~~~~~~~~~~~~~~~~~~~~~~~~
// export class User {}                         export default class User
// import {User} from ...                       import User from ...


/**
 * Another thing to note is that named exports must (naturally) have a name, while "export default" may be anonimous.
 * That's fine because 'export default' is only one per file, so import always knows what to import.
 * Contrary to that, omitting a name for named imports would be an error.
*/
export default class { // no class name
    constructor(){ }
}

export default function(user){ // no function name
    alert(`Hello, ${user}`);
}

export default ['1', '2', '3']; // export a single value, without making a variable


/**
 * Default "alias"
 * The "default" word is a kind of 'alias' for the default export, for scenarios when we need to reference it somehow.
 * For example, if we already have a function declared, that's how to 'export default' is: 
*/

function sayHi(user){
    alert(`Hello, ${user}`);
}

export {sayHi as default}; // same as if we added "export default" before the function

/**
 * Or let's say a module user.js exports one main "default" thing and a few named ones.
*/

// ~~~ user.js
// export default class UserClass(name){
//     constructor(name){
//         this.name = name;
//     }
// }

export function sayHi(user){
    alert(`Hello, ${user}`);
}


// ~~~ main.js
import {default as User, sayHi} from './user.js';
new User('John');

/**
 * Or, if we consider importing * as an object, then the default property is exactly the default export:
*/

// ~~~ main.js
import * as user from './user.js'
let User = user.default;
new User("John");

/**
 * Should I use default exports?
 * One should be careful about using default export, because they are more different to mantain.
 * Named export are explicit. They exactly name what they import, so we have that information from them, that's a good thing.
 * Also, named exports enforce us to use exactly the right name to import. 
 * For default export we need to create a name on our own. 
*/


/**
 * Re-export
 * "Re-export" syntax "export ... from ... " allows to import things and immediately export them (possibly under another name)
 * like this:
*/

// ~~~ auth/index.js
import {login, logout} from './helpers.js';
export {login, logout};

import {User} from './user.js';
export {User};

import Github from './providers/github.js';
export {Github};

// 'Re-exporting' is just a shorter notation for that

// ~~~ auth/index.js
export {login, logout} from './helpers.js'

export {default as User} from './user.js';

export {default as Github} from './providers/github.js'


/**
 * Dynamic import.
 * Export and import statement that we covered in previous chapter are called "static".
 * That's because they are indeed static. The syntax is very strict. First, we can't dynamically generate any parameters
 * of import. The module path must be a primitive string, can't be a function call. Second, we can't import conditionally
 * or at run-time. 
*/

import {something} from getModuleName(); // Error, only from "string" is allowed

if(something){
    import {anothetThing} from getModuleName; // Error, not allowed 
}


/**
 * The import() function
 * The import(module) function can be called from anywhere. It returns a promise that resolves into a module object.
 * The usage pattern looks like this:
*/

// let modulePath = prompt("Module path?");
// import(modulePath)
//     .then(obj => <module object>)
//     .catch(err => <loading error, no such module>)

// Or, we could use "let module = await import (modulePath)" if inside an async function.

