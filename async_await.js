// Async/await
/**
 * There;s a special syntax to work with promises in a more confortable fashion, called "async/await". It's surprisingly
 * easy to understand and use.
*/

// Async functions
async function f(){
    return 1;
}

/**
 * The world "async" before a function means one simple thing: a function always returns a promise. Even if a function actually
 * returns a non-promise value, prepending the function definition with the "async" keyword directs JavaScript to automatically 
 * wrap that value in a resolved promise.
*/

// For instance, the code above returns a resolved promise with the result of 1
async function f(){
    return 1;
}
f().then(alert); // 1

// We could explicitly return a promise, that would be the same:
async function f(){
    return Promise.resolve(1);
}

f().then(alert); // 1

/**
 * So, async ensures that the function returns a promise, and wraps non-promises in it. 
*/


/**
 * Await
 * The syntax is: let value = await promise;
 * Await works only inside async functions. The keyword await makes JavaScript wait until that promise settles and returns its result.
*/
async function f(){

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('done'), 1000)
    });

    let result = await promise; // wait till the promise resolves *

    alert(result); // "done"
}

f();

/**
 * The function execution "pauses" at the line * and resumes when the promise settles, with result becoming its result. 
 * So the code above shows "done" in 1s. Let's emphasize: await literally makes JavaScript wait until the promise settles,
 * and then go on with the result. That does't cost any CPU resources, because the engine can do other jobs meanwhile: 
 * execute other scripts, handle events, etc...
 * 
 * If we try to use await in a non-async function, that would be a syntax error.  
*/

/**
 * Let's take the showAvatar() example from the chapter Promise chaining and rewrite it using async/await:
 *      - we'll need to replace .then calls with await
 *      - also we should make the function async for them, to work
*/

async function showAvatar(){

    // read our JSON
    let response = await fetch('pathToJSON');
    let user = await response.json();

    // read github user
    let githubResponse = await fetch('pathToGithubUser');
    let githubUser = await githubResponse.json();

    // shows the avatar
    let image = document.createElement('img');
    image.src = githubUser.awatar_url;
    image.className = "promise-avatart-example";
    document.body.append(img);

    // wait 3s
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));

    img.remove();

    return githubUser;
}

showAvatar();