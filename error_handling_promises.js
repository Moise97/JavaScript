// Error handling with promises

/**
 * Asynchronous actions may sometimes fail: in case of an error the coresponding promise becomes rejected. 
 * For instance, fetch fails if the remote server is not available. We can use .catch to handle errors(rejections).
 * 
 * Promise chaining is great at that aspect. When a promise rejects, the control jumps to the closest rejection
 * handler down the chain. That's very convenient in practice.
*/

// For example, in the code below the URL is wrong(no such server) and .catch handles the error:
fetch('wrong_url') // rejects
    .then(response => response.json())
    .catch(err => alert(err)) // TypeError: failed to fetch ...

// Or, maybe, everything is all right with the sserver, but the response is not a valid JSON
fetch('good_url') // fetch works fine now, the server responds successfully
    .then(response => response.json()) // rejects: the page is HTML, not a valid JSON
    .catch(err => alert(err)) // SyntaxError: Unexpected token < in JSON at position 0

/**
 * The easiest way to catch all errors is to append .catch to the end of chain.
*/

// Implicit try..catch
/**
 * The code of a promise executor and promise handler has an "invisible try..catch" around it. If an error
 * happens, it gets caugh and treated as a rejection. That's so not only in the executor, but in handler as well.
 * If we throw inside a .then handler, that means a rejected promise, so the control jumps to the nearest error 
 * handler. 
*/

new Promise((resolve, reject) => {
    resolve("ok");
}).then((result) => {
    throw new Error("Error message");
}).catch(alerrt); // Error: Error message



// Rethrowing
/**
 * As we already noticeed, .catch behaves like try..catch. We may have as many .then handlers as we want, and then use 
 * a single .catch at the end to handle error in all of them. In a regular try..catch we can analize the error and maybe
 * retrow it if can't handle. The same thing is possible if we have promises. If we throw inside .catch, then the control 
 * goes to the next closest error handler. And if we handle the error and finish normally, then it continues to the closest
 * successful .then handler.
*/

// In the example below the .catch successfully handles the error:
new Promise((resolve, reject) => {
    throw new Error("Error 1");
}).catch(function(error){
    alert("The error is handled, and the execution continues normally.");
}).then(() => alert("Next successful handler runs"));
// here the .catch block finishes normally. So the next successful .then handler is called.



// Unhandled rejections
/**
 * In case of an error, the promise state becomes "rejected", and the execution should jump to the closest rejection handler.
 * If there's not an handler, the error gets "stuck". In practice, just like with a regular unhandled errors, it means that
 * something terribly gone wrong, the script probably died. Most JavaScript engines track such situations and generate a global
 * error in that case. We can see it in the console. 
 * 
 * In the browser we can catch such errors using the event "unhandledrejection". The event is part of the HTML standard.
 * If an error occurs, and there's no .catch, the unhandledrejection handler triggers, and gets the event object with the 
 * information about error, so we can do something. Usually such errors are uncoverable, so our best way is to inform the user
 * about the problem and probably report the incident to the server.
 * 
 * In non-browser environment like Node.JS there are other similar ways to track unhandled errors.  
*/ 