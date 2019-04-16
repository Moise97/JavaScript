// Generators
/**
 * Regular functions return only one, single value (or nothing).
 * Generators can return ("yield") multiple values, possibly an infinite number of values, one after another, on-demand.
 * They work great with iterables, allowing to create data streams with ease.
 * To create a generator, we need a special syntax construct: function*, so-called "generator function" .
*/

function* generateSequence(){
    yield 1;
    yield 2;
    return 3;
}

// When generateSequence() is called, it does not execute the code. Instead, it returns a special object, called "generator".
// "generator function" create "generator object"

let generator = generateSequence();

/**
 * Upon creation, the code execution is paused at the very beginning.The main method of a generator is next(). When called, 
 * it resumes execution till the nearest yield <value> statement. Then the execution pauses, and the value is returned to 
 * the outer code.
*/

let one = generator.next();
alert(JSON.stringify(one)); // {value: 1, done:false}

/**
 * The result of next is always an object:
 *      - value = the yielded value
 *      - done: false if the code is not yielded yet, otherwise true.
*/

let two = generator.next(); // {value: 2, done: false}
let three = generator.next(); // {value: 3, done: true}

/**
 * There's no way to "roll back" a generator. But we can create another one by calling generateSequence();
 * So far, ythe most important thing to understand is that generator functions, unlike regular functions, 
 * do not run the code. They serve as "generator factories". Running function* returns a generator, and then 
 * we ask for its values.
*/


/**
 * Generators are iterable.
 * As you probably already guessed looking at the next() method, generators are iterable. We can get loop 
 * over values by for..of. 
*/
for(let value of generator){
    alert(value); // 1, 2
}

/**
 * The example above shows 1, then 2, and that's all. It doesn't show 3! It's because for-of iteration ignores 
 * the last value, when done is true. So, if we want all results to be shown by for..of, we must return them with yield.
 * 
 * Naturally, as generators are iterable, we can call are related functionality, e.g. the spread operator ...:
*/
let sequence = [0, ...generateSequence()];
alert(sequence); // 0, 1, 2, 3



/**
 * Generator composition
 * Generator composition is a special feature of generators that allows to transparently "embed" generators in each order.
 * 
 * In a regular function, to combine results from multiple other functions, we call them, store the results, and then join 
 * at the end. With generator, we can do better, like this:
*/

function* generateSequence(start, end){
    for(let i=start; i<= end; i++){
        yield i;
    }
}

function* generatePasswordCodes(){

    // 0..9
    //for(let i = 0; i<=9; i++) yield i
    yield* generateSequence(0, 9); 

    // A..Z
    yield* generateSequence(65, 90);

    // a..z
    yield* generateSequence(97, 122);
}

let str = '';

for(let code of generatePasswordCodes()){
    str += String.fromCharCode(code);
}
 
alert(str); // 0..9A..Za..z

/**
 * The special yield* directive in the example is responsible for the composition. It delegates the execution to 
 * another generator. Or, to say it simple, it runs generators and transparently forwards their yield outside,
 * as if they were done by the calling generator itself. A generator composition is a natural way to insert a 
 * flow of one generator into another. It works enen if the flow of values from the nested generator is infinite.
 * It's simple and doesn't use extra memory to store intermediate results.
*/

/**
 * Yield is a two-way road.
 * Till this moment, generators were like "iterators on steroids". And that's how they are used. But in fact they 
 * are much more powerfull and flexible. That's because yield is a two-way road: it not only returns the result 
 * outside, but also can pass the value inside the generator. To do so, we should call generator.next(arg), with an 
 * argument. That argument becomes the result of yield. Example:
*/

function* gen(){
    // Pass a question to the outer code and wait for an answer
    let result = yield "2 + 2?"; // *
    alert(result);
}

let generator = gen();

let question = generator.next().value; // <-- yield returns the value

generator.next(4); // <-- pass the result into the generator

/**
 * The first call generator.next() is always without an argument. It starts the execution and returns
 * the result of the first yield ("2+2?"). At this point the generator pauses the execution(still on that line).
 * Then, the result of yield gets into the question variable in the calling code.
 * On generator.next(4), the generator resumes, and 4 gets in as a result: let result = 4.
*/

/**
 * Generator.throw
 * As we observed in the example above, the outer code may pass a value into the generator, as the result of 
 * yield. But it can also initiate (throw) an error there. That's natural, as an error is a kind of result.
 * To pass an error into a yield, we should call generator.throw(err). In that case, the err is thrown in the
 * line with that yield.
*/

function* gen(){
    try{
        let result = yield "2+2?";
        alert("The execution does not reach here, because the exception is thrown above");
    }catch(e){
        alert(e); //shows the error
    }
}

let generator = gen();
let question = generator.next().value;
generator.throw(new Error("The answer is not found in database"));