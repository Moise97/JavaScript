// Modules, introduction

/**
 * As our application grows bigger, we want to split into multiple files, so called "modules".
 * A module usually contains a class or a library of useful functions. For a long time, 
 * JavaScript existed without a language-level module syntax. That wasn't a problem, because
 * initially scripts were small and simple. So there was no need. But eventually scripts became
 * more and more complex, so the community invented a variety of ways to organise code into 
 * modules. For instance:
 *  - AMD = one of the most ancient module system, initially implemented by the library require.js
 *  - CommonJS = the module system created for Node.JS server
 *  - UMD = one more module system, suggested as the universal one, compatible with AMD and CommonJS
 * 
 * Now all these slowly become a part of history, but we still can find them in old scripts.
 * The language-level module system appeared in the standard in 2015, gradually evolved since them, 
 * and is now supported by all major browsers and in Node.Js  
*/

/**
 * What is a module?
 * A module is just a file, a single script, as simple as that.
 * Directives 'export' and 'import' allow to interchange functionality between modules:
 *  - "export" keyword labels variables and functions that should be accesible from outside the file
 *  - "import" allows to import functionality from other modules. 
*/

// For instance, if we have a file sayHi.js exporting a function:
// ~~~ sayHi.js
export function sayHi(user){
    alert(`Hello, ${user}!`);
}

// The another file may import and use it: 
// ~~~ main.js
import {sayHi} from './sayHi.js';
alert(sayHi); // function ...
sayHi('John'); // Hello, John!

/**
 * Let's see how modules work in the browser. 
 * To use modules, we must see the attribute <script type="module"> 
 * The browser automatically fetches and evaluates imports, then runs the script.
 * 
*/

// ~~~ index.html
<script type="module">
    import {sayHi} from './say.js';
    document.body.innerHTML = sayHi('John');
</script>

// ~~~ say.js
export function sayHi(user) {
    return `Hello, ${user}!`;
}

// Result:  Hello, John


// Core module features
/**
 * There are core feature, valid both for browser and server-side JavaScript.
 *      - Always "use strict"
 *      - Module-level scope
 *      - A module code is evaluated only the first time when imported
 *      - import.meta 
 *      - Top-level "this" is undefined
*/

/**
 * 1. Always "use strict"
 * Modules always "use strict". E.g. assigning to an undeclared variable will
 * give an error. 
*/

/**
 * 2. Module-level scope
 * Each module has its own top-level scope. In other words, top-level variables 
 * and functions from a module are not seen in other scripts. 
*/

// ~~~ index.html
{/* <script type="module" src="user.js"></script>
<script type="module" src="hello.js"></script> */}

// ~~~ user.js
let user = "John"; 

// ~~~ hello.js
alert(user); // no such variable (each module has independent variables)

/**
 * Modules are expected to export what they want to be accesible from outside
 * and import what they need. So we should import user.js directly into hello.js
 * instead of index.html. That's the correct variant:
*/

// ~~~ index.html
<script type="module" src="hello.js"></script>

// ~~~ hello.js
import {user} from './user.js';
document.body.innerHTML = user; // John

// ~~~ user.js
export let user = "John";

/**
 * In the browser, independant top-level scope also exist for each <script type = "module">.
 * If we really need to make a "global" in-browser variable, we can explicitly assign it to
 * window and access as windows.user. But that's an exception requiring a good reason.
*/

/**
 * 3. A module code is evaluated only the first time when imported.
 * If a same module is imported into multiple other places, it's code is executed only the
 * first time, then exports are given to all importers. That has an important consequences.
 */

 // ~~~ admin.js
 export let admin = {
     name: John
 };

 // ~~~ 1.js
 import {admin} from './admin.js';
 alert(admin.name); // John
 admin.name = 'Pete';

 // ~~~ 2.js
alert(admin.name); // Pete


/**
 * 4. import.meta
 * The object import.meta contains the information about the curent module.
 * Its content depends on the environment. In the browser, it contains the url 
 * of the script, or a current webpage url if inside HTML:
*/

<script type = "module">
    alert(import.meta.url); // script URL
</script>


/**
 * 5. Top-level "this" is undefined
 * In a module, top-level 'this' ios undefined, as opposed to a global object
 * in non-module scripts:
*/

{/* <script>
    alert(this); // window
</script> */}

<script type="module">
    alert(this); // undefined
</script>



// Browser-specific features
/**
 * There are also several browser-specific differences of scripts with 
 * type = "module" compared to regular ones.
 *      - Module scripts are deffered
 *      - Async works on inline scripts
 *      - External scripts
 *      - No bare module allowed
 *      - Compatibility, 'nomodule'
*/

/**
 * 1. Module scripts are deffered
 * Module scripts are always deffered, same effect as defer attribute.
 * In other words:
 *      - external module scripts don't block HTML processing
 *      - module scripts wait until the HTML document is fully read
 *      - relative order is maintained: scripts that go first in the document
 *        execute first
 * 
 * As a side-effect, module scripts always see HTML elements below them.
*/

{/* <script type="module">
  alert(typeof button); // object: the script can 'see' the button below
  // as modules are deferred, the script runs after the whole page is loaded
</script> */}

{/* <script>
  alert(typeof button); // Error: button is undefined, the script can't see elements below
  // regular scripts run immediately, before the rest of the page is processed
</script> */}

{/* <button id="button">Button</button> */}


/**
 * 2. Async works on inline scripts
 * Async attribute <script async type="module"> is allowed on both inline and external 
 * scripts. Async scripts run immediately when imported modules are processed, 
 * independantly of other scripts or the HTML document.
 * 
 * For example the script below has async, so it does't wait for anyone.
 * It performs the import and runs when ready, even the HTML document is not finished
 * yet, or if other scripts are still pending. That's good for functionality that
 * doesn't depend on anything, like counters, ads, document-level event listeners.  
*/

// <!-- all dependencies are fetched (analytics.js), and the script runs -->
// <!-- doesn't wait for the document or other <script> tags -->
// <script async type="module">
//   import {counter} from './analytics.js';
//   counter.count();
// </script>


/**
 * 3. External scripts
 * There are two notable differences of external module scripts:
 *      - External scripts with the same src run only once
 *      - External scripts that are fetched from another domain require CORS headers.
 *        In other words, if a module script is fetched from another domain, the remote
 *        server must supply a header Access-Control-Allow-Origin* to indicate that the 
 *        fetch is allowed      
 */

// <!-- another-site.com must supply Access-Control-Allow-Origin -->
// <!-- otherwise, the script won't execute -->
// <script type="module" src="http://another-site.com/their.js"></script>


/**
 * 4. No bare modules allowed
 * In the browser, in scripts (not HTML) import must get either a relative or absolute 
 * URL. So-called "bare" modules, without a path, are not allowed.
*/

import {sayHi} from 'sayHi'; // Error, "bare" module
// must be './sayHi.js' or wherever the module is


/**
 * 5. Compatibility, "nomodule"
 * Old browsers do not understand type = "module". Scripts of the unknown type are just
 * ignored. For them, it's possible to provide a fallback using nomodule attribute.
*/

{/* <script type="module">
  alert("Runs in modern browsers");
</script> */}

{/* <script nomodule>
  alert("Modern browsers know both type=module and nomodule, so skip this")
  alert("Old browsers ignore script with unknown type=module, but execute this.");
</script> */}