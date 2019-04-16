// Promisification
/**
 * Promisification is a long world for a simple transform. It's conversion of a function that accepts a callback into a function returning a promise.
 * In other words, we create a wrapper function that does the same, internally calling the original one, but returns a promise.
*/


function loadScript(src, callback){
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));

    document.head.append(script);
}

// Let's promisify it. The new loadScriptPromise(src) function will do the same, but accept only src (no callback) and return a promise.
let loadScriptPromise = function(src){
    return new Promise((resolve, reject) => {
        loadScript(src, (err, script) => {
            if(err){
                reject(err);
            }else{
                resolve(script);
            }
        });
    })
}

//usage
// loadScriptPromse('pathToScript).then(....)

/**
 * Now loadScriptPromise fits well in our promise-based code. As we can see, it delegates all the work to the original loadScript, providing its 
 * own callback that translates to promise resolve/reject. As we may need to promisy many functions, it make sense to use a helper.
*/