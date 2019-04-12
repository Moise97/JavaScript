// Promise

/**
 * A promise is a special JavaScript object that links the 'production code' and the 'consumming code' together. 
 * The constructor syntax for for a promise object is: 
*/
let promise = new Promise(function(resolve, reject){
    // executor (the producing code)
});

/**
 * The function passed to new Promise is called executor. When the promise is created, this executor function runs automatically.
 * It contains the producting code, that should eventually produce a result. The returning promise object has internal properties:
 *      - state = initially "pending", then changes to either "fulfilled" or "rejected",
 *      - result = an arbitrary value of your choosing, initially undefined.
 * 
 * When the executor finishes the job, it should call one of the functions that is gets as arguments:
 *      - resolve(value) = to indicate that job finished successfully;
 *          - sets state to "fulfilled",
 *          - sets result to value
 *      - reject(error) = to indicate that error occurred
 *          - sets state to "rejected"
 *          - sets result to error
 * 
 * There can be only a single return or an error - all further calls of resolve and reject are ignored.
 * 
 * The state and result are internal - we can't directly access them from our "consumming code". We can use the methods 
 *                                     .then/.catch/.finally for that.
 * 
 * The most important, fundamental one is .then. The syntax is:
 *      promise.then(
 *          function(result); {...// handle a successful result},
 *          function(error); {...// handle an error}
 *      );
 * The first argument of .then is a function that:
 *      - runs when the Promise is resolved  and receives the result
 * The second argument of .then is a function that:
 *      - runs when the Promise is rejected and receives the error
*/

//resolve
let promise = new Promise(function(resolve, reject){
    setTimeout(() => resolve("done"), 1000);
});

promise.then(
    result => alert(result), // shows "done" after 1s
    error => alert(error) // does't run
);

//reject
let promise = new Promise(function(promise, reject){
    setTimeout(() => reject(new Error("Whoops")), 1000);
});

promise.then(
    result => alert(result), // doesn't run
    error => alert(error) // shows "Error: Whoops"  after 1s
);


// If we're interested only in successful completion, then we can provide only one function argument to .then:
let promise = new Promise(resolve => {
    setTimeout(() => resolve("done"), 1000);
});

promise.then(alert); // shows "done" after 1s


// Catch
/**
 * If we're interested only in errors, then we can use null as the first argument ".then(null, errorHandlingFunction)".
 * Or we can use .catch(errorHandlingFunction), which is exactly the same:
*/
let promise = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// .catch(f) is the same as promise.then(null, f)
promise.catch(alert); // shows "Error: Whoops!" after 1s


// Finally
/**
 * The call .finally(f) is similar to .then(f, f) in the sense that it always runs when the promise is settled: 
 * be it resolved or rejected. Finally is a good handler for performing cleanup, stopping our loading indicator,
 * as they are needed any more, no matter what the outcome is.
*/

new Promise((resolve, reject) => {
    // do something that need times and then call resolve/reject
    setTimeout(() => resolve("result"), 1000)
})
    .finally(() => alert("promise ready"))
    .then(result => alert(result)); // <-- .then handle the result

new Promise((resolve, reject) => {
    throw new Error("error");
})
    .finally(() => alert("promise ready"))
    .catch(err => alert(err)); // <-- .catch handles the error object


// Example
function loadScript(src){
    return new Promise(function(result, reject) {

        let script = document.createElement('script');
        script.src = src;

        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error("Script load error: " + src));

        document.head.append(script);
    });
}

// usage
let promise = loadScript('pathToScript');
promise.then(
    script => alert(`${script.src} is loaded!`),
    error => alert(`Error: ${error.message}`)
);

promise.then(script => alert("One more handler to do something else!"));