// Iterables

// Iterable objects is a generalizations of arrays. It is separate from the object it iterates over

let range = {
    from: 1,
    to: 5
};
// call to for...of innitially calls this
range[Symbol.iterator] = function() {
    //  it return the iterator object
    return {
        current: this.from,
        last: this.to,
        // next() is called on each iteration by the for..of loop
        next(){
            if(this.current <= this.last){
                return {done: false, value: this.current++};
            }else{
                return {done: true};
            }
        }
    };
};

for(let num of range){
    alert(num); // 1, 2, 3, 4, 5
}

// String is iterable
for(let char of "text"){
    // triggers 4 times: once for each character
    alert(char);
}

// Calling an iterator explicitly
let str = "HELLO";
let iterator = str[Symbol.iterator]();
while(true){
    let result = iterator.next();
    if(result.done) break;
    alert(result.value); // H, E, L, L, O
}

// Array.from
let arr = Array.from(range);
alert(arr); // 1, 2, 3, 4, 5 