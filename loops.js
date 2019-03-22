// While

let i = 0;
while(i < 3){
    alert(i);
    i++;
}


// Do while

let i = 0;
do{
    alert(i);
    i++;
}while(i < 3);


// For loop

for(let i=0; i < 3; i++){
    alert(i);
}


// Breaking the loop

let sum = 0;
while(true){
    let value = +prompt("Enter a number",'');
    if(!value) 
        break;
    sum += value;
}


// Continue to the next iteration

for (let i = 0; i <= 5; i++){
    if(i%2 == 0)
        continue;
    alert(i);
}
