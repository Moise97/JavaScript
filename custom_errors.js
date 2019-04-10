// Custom errors, extending Error

/**
 * When we develop something, we often need our own error classes to reflect specific things that may go wrong in our task.
 * JavaScript allows to use throw with any argument, so technically our custom error classes don't need to inherit from Error.
 * But if we inherit, then it becomes possible to use obj instanceof Error to identify error object. So it's better to inherit from it.
*/

// Extending Error
class ValidationError extends Error {
    constructor(message) {
        super(message); // 1
        this.name = "ValidationError"; //2
    }
}

function test() {
    throw new ValidationError("Whoops!");
}

try {
    test();
} catch (err) {
    alert(err.message); // Whoops!
    alert(err.name); // Validation Error
    alert(err.stack); // a list of nested calls with line numbers for each
}

/**
 * Please take a look at the constructor:
 *      - In the line (1) we call the parent constructor. JavaScript requires us to call super in the child constructor, so that's obligatory. The 
 *        parent constructor sets the message property.
 *      - the parent constructor also sets the name property to 'Error', so in the line (2) we reset it to the right value
*/



// Further inheritance
class ValidationError extends Error {
    constructor(message) {
        super(message); // 1
        this.name = "ValidationError"; //2
    }
}

class PropertyRequiredError extends ValidationError {
    constructor(property) {
        super("No property: " + property);
        this.name = 'PropertyRequiredError';
        this.property = property;
    }
}

// usage:
function readUser(json) {
    let user = JSON.parse(json);

    if (!user.age) {
        throw new PropertyRequiredError("age");
    }

    if (!user.name) {
        throw new PropertyRequiredError("name");
    }

    return user;
}

try {
    let user = readUser('{"age": 30}');
} catch (err) {
    if (err instanceof ValidationError) {
        alert("Invalid data: " + err.message); // Invalid data: No property: name
        alert(err.name); // propertyRequiredError
        alert(err.property); // name
    } else if (err instanceof SyntaxError) {
        alert("JSON Syntax Error: " + message);
    } else {
        throw err; // unknown error, retrow it
    }
}


// Wrapping exceptions
class ReadError extends Error {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = 'ReadError';
    }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
    if (!user.age) {
        throw new PropertyRequiredError("age");
    }

    if (!user.name) {
        throw new PropertyRequiredError("name");
    }
}

function readUser(json) {
    let user;

    try {
        user = JSON.parse(json);
    } catch (err) {
        if (err instanceof SyntaxError) {
            throw new ReadError("Syntax Error", err);
        } else {
            throw err;
        }
    }

    try {
        validateUser(user);
    } catch (err) {
        if (err instanceof ValidationError) {
            throw new ReadError("Validation Error", err);
        } else {
            throw err;
        }
    }

}

try {
    readUser('{bad json}');
} catch (e) {
    if (e instanceof ReadError) {
        alert(e);
        // Original error: SyntaxError: Unexpected token b in JSON at position 1
        alert("Original error: " + e.cause);
    } else {
        throw e;
    }
}

/**
 * In the code above, readUser works exactly as described - catches syntax and validation errors and throws ReadError errors instead.
 * So the outher code checks instanceof ReadError and that's it. No need to list possible all error types.
 * Th eapproach is called "wrapping exceptions", because we take "low level exceptions" and "wrap" them into ReadError that is more
 * abstract and more convenient to use for the calling code. It is widely used in object-oriented programming.
*/