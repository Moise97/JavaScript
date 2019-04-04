// Scheduling: setTimeout and setInterval

//We may decide to execute a function not right now, but a certain time later. That's called 'scheduling a call'.
//      :setTimeout - allows to run a function once after the interval of time
//      :setInterval - allows to run a function regularly with the interval between the runs.


// setTimeout
function sayHi(){
    alert("Hello");
}
setTimeout(sayHi, 1000); // method sayHi will be executed after 1 sec


// Cancel with clearTimeout
// A call to setTimeout returns a 'time identifier' timerId that we can use to cancel the execution.

let timerId = setTimeout(() => alert("never happens"), 1000);
alert(timerId); // timer identifier
clearTimeout(timerId);
alert(timerId); // same identifier (doesn't become null after canceling)


// setInterval

let timerId = setInterval(() => alert('tick'), 2000); // repeat with the interval of 2 seconds
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000); // after 5 seconds stop

// Garbage collector
/*  When a function is passed in setInterval or setTimeout, an internal reference is created to it and saved in the scheduler.
    It prevents the function from being garbage collected, even if there is no other references to it.
    For setInterval the function stays in memory until clearInterval is called.
*/


// Splitting CPU-hungry tasks
/*  Example - we have a function to count from 1 to 1000000000; If we run this function, the CPU will hang. For server-side JS 
    thet's clearly noticeable, and if you are running it in-browser, then try to click other buttons on the page - you'll see that 
    the whole JS actually is paused, no other actions will run until it finishes.
*/

let i = 0;
let start = Date.now();
function count(){

    // do a heavy job
    for(let j = 0; j <= 1e9; j++){
        i++;
    }
    alert("Done in: " + Date.now() + " ms");  // <2000 ms
}
count(); // call the function



// Now, let's split the job using nested setTimeout:
// Pauses between count executions provide just enough 'breath' for the JS engine to do something else, to react to other user actions.
/*
    First run: 1...1000000;
    Second run: 1000001....2000000;
    ..............................
*/

let i = 0;
let start = Date.now();
function count(){

    // do a piece of the heavy job (*)
    do{
        i++;
    }while(i % 1e6 != 0);

    if(i == 1e9){
        alert("Done in " + Date.now()-start + " ms");
    }else{
        setTimeout(count); // schedule the new call (**)
    }
}

count();
