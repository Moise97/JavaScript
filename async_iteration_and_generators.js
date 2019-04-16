// Async iteration and generators
/**
 * Asynchronous iterators allow to iterate over data and comes asynchronously, on-demand.
 * For instance, when we download something chunk-by-chunk, or just expect events to come
 * asynchronously and would like to iterate over them - async iterators and generators amy come 
 * in handy. Let's see a simple example first, to grasp the syntax, and then review a real-life 
 * use case. Asynchronous iterators are totaly similar to regular iterators, with a few syntactic
 * differences.
 * 
 * To make the object iterable asynchronous:
 *      - we need to use Symbol.asyncIteartor instead of Symbol.iteartor
 *      - next() should return a promise
 *      - to iterate over such an object, we should use for await(let item of iterable) loop.
*/

let range = {
    from: 1,
    to: 5,
    [Symbol.asyncIterator](){
        return {
            current: this.from,
            last: this.to,

            //next() is called on each iteration by the for..of loop
            async next(){
                await new Promise(resolve => setTimeout(resolve, 1000));
                if(this.current <= this.last){
                    return {done: false, value: this.current++ };
                }else{
                    return {done: true};
                }
            }
        };
    }
};

(async () => {
    for await (let value of range){
        alert(value); // 1, 2, 3, 4, 5
    }
})()


// Async generators
/**
 * JavaScript also provides generators, that are also iterable.
 * Let's recall a sequence generator from the chapter Generators. It generates a sequence of
 * values from start to end:
*/

function* generateSequence(start, end){
    for(let i=start; i<=end;i++){
        yield i;
    }
}

for(let value of generateSequence(1, 5)){
    alert(value); // 1, 2, 3, 4, 5
}

// Normally, we can't use await in generators. All values must come synchronously: there's no place for 
// delay in for..of. But if we need to use await in the general body? To perform network requests, for 
// instance. No problem, just pending with async, like this: 

async function* generateNumbers(start, end){
    for(let i = start; i <= end; i++){
        await new Promise(resolve => setTimeout(resolve, 1000));

        yield i;
    }
}

(async () => {
    let generator = generateNumbers(1, 5);
    for await (let value of generator){
        alert(value); // 1, then 2, then 3, then 4, then 5
    }
})()