// Recursion and Stack

// Iterative thinking

function iterative_pow(x, n){
    let result = 1;
    for (let i=0;i<n;i++){
        result *=x;
    }
    return result;
}
alert(iterative_pow(2, 3)); // 8

// Recursive thinking

function recursive_pow(x, n){
    if(n==1){
        return x; 
    }
    else{
        return x*pow(x, n-1);
    }
}

alert(recursive_pow(2, 3)); // 8


// Linked List

let linked_list = {
    value: 1, // current list element
    next: { // property referencing the next linked list element or null if that's the end
        value:2,
        next: {
            value:3,
            next: {
                value:4,
                next: null
            }
        }
    }
};

