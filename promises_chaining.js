// Promises chaining

/**
 * A classic newbie error: technically we can also add many .than to a single promise. 
 * This is not chaining. Example:
*/

let promise = new Promise(function(resolve, reject){
    setTimeout(() => resolve(1), 1000);
});

promise.then(function(result){
    alert(result); // 1
    return result * 2;
});

promise.then(function(result){
    alert(result); // 1
    return result * 2;
});

promise.then(function(result){
    alert(result); // 1
    return result * 2;
});

/**
 * What we did here is just several handlers to one promise. They don't pass the result to each other, instead they process it 
 * independently. All .then on the same promise get the same result - the result of that promise. So in the code above all alert
 * show the same 1. In practice we rarely need multiple handlers for one promise. Chaining is used much more often.
*/


// Returning promises
/**
 * Normally, the result returned by a .then handler is immediatelly passed to the next handler. But there's an exception.
 * If the returned value is a promise, then tyhe further execution is suspended until it settles. After that, the result of that 
 * promise is given to the next .then handler. Example:
*/

new Promise(function(resolve, reject){
    setTimeout(() => resolve(1), 1000);
}).then(function(result){
    alert(result); // 1

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result * 2), 1000);
    });
}).then(function(result){
    alert(result); // 2

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result * 2), 1000);
    });
}).then(function(result){
    alert(result); // 4
});


// Example: loadScript
loadScript("pathScr1")
.then(function(script){
    return loadScript("pathScr2");
}).then(function(script){
    return loadScript("pathScr3");
}).then(function(script){
    // use functions declared in scripts
    // to show that they indeeed loaded
    function1();
    function23();
    function3();
});


// Bigger example: fetch
/**
 * In frontend programming promises are often used for network requests.
 * We'll use the "fetch" ,ethod for load the information about the user from the remote server.
 * The method is quite complex, it has many optional parameters, but the basic usage is quite simple:
*/

let promise = fetch(url);
/**
 * This makes a request to the url and returns a promise. The promise resolva with a response object, 
 * when the remote server responds with headers, but before the full response is downloaded.
 * To read the the full response, we should call a method response.text(): it returns a promise that resolves 
 * when the full text downloaded from the remote server, with that text as a result.
 *  The code below makes a request to user.json and loads its text from the server. 
*/

fetch('url')
    //.then below runs when the remote server responds
    .then(function(response){
        // response.text() return a new promise that resolves with the full response text
        // when we finish downloading it
        return response.text();
    }).then(function(text){
        // and here's the content of the remote file
        alert(text);
    });


/**
 * There is also a method response.json() that reads the remote data and parse it as JSON. In our case that's 
 * even more convient, so let's switch to it:
*/

fetch('url')
.then(response => response.json())
.then(user => alerrt(user.name));