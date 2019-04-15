// Promise API
/**
 * There are 4 static methods in the Promise class.
 * Promise.resolve()
 * Promise.reject()
 * Promise.all()
 * Promise.race()
*/

/**
 * Promise.resolve() - returns a resolved promise with the given value.
 * The syntax is: let promise = Promise.resolve(value).
 * Same as: let promise = new Promise(resolve => resolve(value));
 * The method is used when we already have a value, but would like to have it "wrapped" into a promise.
*/

/**
 * Promise.reject() - create a rejected promise with the error.
 * The syntax is: let promise = promise.reject(error);
 * Same as: let promise = new Promise((resolve, reject) => reject(error));
*/

/**
 * Promise.all() - let's say we want to run many promises to execute in parallel, and wait till all of them are ready.
 * For instance, download several URLs in paralel and process the content when all are done. That's what Promise.all is for.
 * The sintax is: let Promise  = Promise.all([...promises...]);
 * It takes an array of promises and return a new promise. The new promise resolves when all listed promises are settled 
 * and has an array of their result.
*/

Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1),3000)), // 1
    new Promise(resolve => setTimeout(() => resolve(2),2000)), // 2
    new Promise(resolve => setTimeout(() => resolve(3),1000)), // 3
]).then(alert); // 1, 2, 3 - when promises are ready : each promise contributes an array member
// Please note that the relative order is the same. Even through the first promise takes the longest
// time to resolve, it is still first in the array of result.

// A common trick is to map an array of job data into an array of promises, and then wrap that into Promise.all
let urls = [
    'url1',
    'url2',
    'url3',
    'url4'
];
let request = urls.map(url => fetch(url)); // map every url to the promise fetch

Promise.all(request) // waits until all jobs are resolved
    .then(responses => responses.forEach(
        response => alert(`${response.url}: ${response.status}`)
    ));

// If any of the promises is rejected, Promise.all immediately rejects with that error


/**
 * Promise.race() - similar to Promise.all, it takes an iterable of promises, but instead of wayting for all of  
 * them to finish, it waits for the first result(or error), and goes on with it.
 * The syntax is: let promise = Promise.race(iterable)
*/
Promise.race([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 2000))
]).then(alert); // 1

/**
 * So, the first result/error becomes the result of the whole Promise.race. After the first settled promise 
 * "wins the race", all further results/errors are ignored.
 */