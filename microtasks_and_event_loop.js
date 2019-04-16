// Microtasks and event loop

/**
 * Promise handler .then/.catch/.finally are always asynchronous. Even when a Promise is immediatelly resolved, the code 
 * on the lines below your .then/.catch/.finally will still execute first.
*/

//Example
let promise = Promise.resolve();
promise.then(() => alert("promise done")); // 2 
alert("code finished"); // 1
/**
 * If you run it, you see "code finished" first, and then "promisse done".
 * That's strange, because the promise is definetly done from the beginning.
*/


// Microtasks
/**
 * Asynchronous task need proper management. For that, the standard specifies an internal queue PromiseJobs, more often 
 * refered to as "microtask queue"(v8 term).
 * As said in the specification:
 *      - the queue is first-in-first-out: tasks enqueued first are run first.
 *      - execution of a task is initiated only when nothing else running.
 * Or, to say that simply, when a promise is ready, its .then/catch/finally handlers are put into the queue. They are not
 * executed yet. JavaScript engine takes a task from the queue and execute it, when it becomes free from the current code.
 * If there's a chain with multiple .then/catch/finally, then every one of them is executed asynchronously. That is,
 * it first gets queueed, and executed when the current code is complete and previously queued handlers are finished.
*/
Promise.resolve()
    .then(() => alert('promise done')) // 1
    .then(() => alert('code finished')); // 2


// Event loop
/**
 * In browser Javascript, as well as Node.js, is based on an event loop. "Event loop" is a process when the engine sleeps 
 * and waits for events, then reacts on those and sleeps again.
 * Examples of events:
 *      - mousemove = a user moves their mouse
 *      - setTimeout = handler is to be called
 *      - an external <script src = "..."> is loaded, ready to be executed
 *      - a network operation, e.g. fetch is complete.
 *      - etc...
 * 
 * As you can see, there's also a queue here. A so-called "macro queue"(v8 term). When an event happens, while the engine is busy, 
 * its handling is enqueued. Events from the macrotask queue are processed on "first come - first served". 
 * 
 * Microtask queue has a higher priority than the macrotask queue. In other words, the engine first executes all microtasks, and 
 * then takes a macrotask. Promise handling always has the priority.
*/

// example
setTimeout(() => alert('timeout')); // 3 --- shows last, because it's a macrotask
Promise.resolve().then(() => alert('promise')); // 2 --- promise shows second, because .then passes through the microtask queue,
                                                // and runs after the current code
alert('code'); // 1 --- code shows first, because it's a  regular synchronous call

