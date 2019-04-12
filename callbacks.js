// Introduction: callbacks

/**
 * Many actions in JavaScript are asynchronous. The function is called asynchronously, because the action finished not now, but later.
 * The call initiates the script loading, then the execution continues. While the script is loading, the code below may finish 
 * executing, and if the loading takes time, other script may run meanwhile too.
*/

function loadScript(src){
    let script = document.createElement('script');
    script.src = src;
    document.head.append(script);
}

// loads and executes the script
loadScript('pathToScript');

// the code below loadSript does'n wait for the script loading to finish.

/**
 * Now, let's say that we want to use new script when it loads. It probably declares new functions, so we'd like to run them.
 * But if we want to do that immediately after the loadScript(...) call, that would'd work. As of now, the loadSript function
 * does't provide a way to track the load competition. The script loads and eventually runs, that's all. But we'd loke to know 
 * when it happens, to use new functions and variables from that script.
 * 
 * Let's add a callback function as a second argument to loadscript that should execute when the script loads:
*/

function loadScript(src, callback){
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(script);

    document.head.append(script);
}

// now if we want to call new functions from the script, we shoud write that in the callback
loadScript("pathToScript", function(){
    // the callback runs after the script is loaded
    new Function(); // so now it works
    //...
});

/**
 * That's the idea: the second argument is a function(usually anonymous) that runs when the action is completed.
 * That's called a 'callback-based' style of asynchronous programming. A function that does something asynchronously 
 * should provide a callback argument where we put the function to run after it;s complete. 
*/


//Handling errors
/**
 * In the above example we didn't consider eroors. What if the script loading fails? Our callback should be able to react on that.
 * Here;s an improved version of loadScript that tracks loading errors:
*/

function loadScript(src, callback){
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));

    document.head.append(script);
}
// It calls callback(null, script) for successful load and callback(error) otherwise.

// usage:
loadScript('pathToSript', function(error, script){
    if(error){
        // handle error
    }else{
        // script load successfully
    }
});

/**
 * Once again, the recipes that we used for loadScript is actually quite common. It's called the 
 * "error-first callback" style. The convention is:
 *      - The first argument of the callback is reversed for an error if it occurs. Then callback(err) is called.
 *      - The second argument are for the successful result. The callback(null, result1, result2, ...) is called.
 * 
 * So the single callback function is used both for reporting errors and passing back result.
*/


// Pyramid of Doom
/**
 * From the first look, it'a viable way of asynchronous coding. and indeed it is. For one or maybe two nested calls 
 * it looks fine. But for multiple asynchronous actions that follow one after another we'll have code like this:
*/

loadScript('pathToScript1', function(error, script){
    if(error){
        // handleError();
    }else{
        loadScript('pathToScript2', function(error, script){
            if(error){
                // handleError()
            }else{
                //....
                loadScript('pathToScript3', function(error, script){
                    if(error){
                        // handleError()
                    }else{
                        // continue after all scripts are loaded *
                    }
                });
            }
        });
    }
});

/**
 * As calls become more nested, the code becomes deeper and increasingly more difficult to manage, especially if we
 * have a real code instead of ... , that may include more loops, conditional statements and so on.
 * That's sometimes called 'callback hell' or 'pyramid of doom'. The pyramid of nested calls grows to the right with
 * every asynchronous action. Soon it spirals out of control. So this way of coding isn't very good.
 * We can try to alleviate the problem by making every action a standalone function, like this:
*/

loadScript('pathToScript1', step1);

function step1(error, script){
    if(error){
        // handleError()
    }else{
        // ...
        loadScript('pathToScript2', step2);
    }
}

function step2(error, script){
    //........
}