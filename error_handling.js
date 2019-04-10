// Error handling, "try_catch"


try {
    alert('Start of try runs');

    lalala; // error, variable is not defined

    alert('End of try.');
} catch (err) {
    alert(`Error has occured!`);
}
alert("...Then the execution continues");

// Result: 
// Start of try runs
// Error has occured
// ...Then the execution continues


/**
 * Try..catch only works for runtime errors
 * 
 * For try..catch to work, the code must be runnable. In other words, it should be valid JavaScript.
 * It won't work if the code is syntactically wrong, for instance it has unmatched curly braces.
 * The JS engine first reads the code, and then runs it. the errors that occur on the reading phrase
 * are calleed 'parse-time' errors and are uncoverable(from inside taht code). That's because the engine
 * can't understand the code. So, try..catch can only handle eroors that occur in the valid code. Such
 * errors are called 'runtime errors' or somethimes 'exceptions'.
*/

/**
 * Try..catch works synchronously
 * 
 * If an exception happens in 'scheduled' code, like in setTimeout, then try..catch won't catch it:
*/

try {
    setTimeout(function () {
        noSuchVariable; //script will die here
    }, 1000);
} catch (e) {
    alert("Won;t work");
}

/**
 * That's because try..catch actually wraps the setTimeout call that schedules the function. But the function
 * itself is executed later, when the engine has already left the try..catch construct.
 * To ctch an exception inside a scheduled function, try..catch must be inside that function:
*/

setTimeout(function () {
    try {
        noSuchVariable; // try..catch handles the error
    } catch (e) {
        alert("Error is caugh here!");
    }
}, 1000);


//Error object
/**
 * When an error occurs, Javascript generates an object containing the details about it. The object is passed as an argument to catch.
 * For all build-in errors, the error object inside catch blocks has two main properties;
 *      - name = Error name. For an undefined variable that's "ReferenceError"
 *      - message = Textual message about error details.
 *      - stack = Current call stack: a string with information about the sequence of nested calls that let to the error. Used for debugging purpose.
*/


// Throw operator
/**
 * The throw operator generates an error. Technically, we can use anything as an error object. That may be even primitive, like a number or a string,
 * but it's better to use objects, preferably with name ans message properties. 
*/
let json = '{"age": 30}'; // incomplete data
try {
    let user = JSON.parse(json); // no errors

    if (!user.name) {
        throw new SyntaxError("Incomplete data: no name!"); // *
    }

    alert(user.name);

} catch (e) {
    alert("JSON Error: " + e.message); // JSON Error: Incomplete data: no name
}


// Retrowing
/**
 * In the example above, try..catch is meant to catch 'incorect data' errors. but by its nature, catch gets all errors from try.
 * Catch should only process errors that it knowns and "retrow" all others.
 * The "retrowing" technique can be explained in mode details as:
 *      - catch gets all errors
 *      - in catch(err) {...} block we analyze the error object err
 *      - if we don't know how to handle it, then we do throw err  
*/

let json = '{"age": 30}'; // incomplete data
try {
    let user = JSON.parse(json); // no errors

    if (!user.name) {
        throw new SyntaxError("Incomplete data: no name!"); // *
    }

    alert(user.name);

} catch (e) {

    if (e.name == "SyntaxError") {
        alert("JSON Error: " + e.message); // JSON Error: Incomplete data: no name
    } else {
        throw e; // retrow
    }
}


// Try...catch...finally
/**
 * The try..catch construct may have one more code clause: finally
 * If it exist, it runs in all cases:
 *      - after try, if there were no errors
 *      - after catch, if there were errors
*/


// Finally and return
/**
 * The finally clause works for any exit from try..catch. That includes an explicit return.
 * In the example below, there's a return in try. In this case, finally is executed just before the 
 * control returns to the outher code.
*/

function func() {
    try {
        return 1; // *
    } catch (e) {
        // ...
    } finally {
        alert('finally');
    }
}

alert(func()); // first work alert from finally, and then this one *


// Try..finally
/**
 * The try..finally construct, without catch is also useful. We apply it when we don't want to 
 * handle errors right here, but want to be sure that processes that we startted are finalized. 
*/


// Global catch
/**
 * Let's imagine we've got a fatal error outside of try..catch, and the script died. 
 * Is there a way to react on such occurrences? There is none in the specifications, but environments 
 * usually provide it, because it's really useful. For instance, NodeJS has 'process.on('uncaughtException')' for that.
 * And in the browser we can assign a function to "window.onerror" property. It will run in case of an uncaugh error.
 * The syntax is: window.onerror = function(message, url, line, col, error){...}
*/

<script>
    window.onerror = function(message, url, line, col, error){
        alert(`${message}\n At ${line}:${col} of ${url}`)
    };

    function readData(){
        badFunc() // Whoops, something went wrong!
    }

    readData();
</script>

//Result: Uncaught ReferenceEroor: badFunc is not defined
//        At 9:5 of https://lookatcode.com/showhtml