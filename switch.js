     // Switch

let a = 2 + 2;
switch(a) {
    case 3: alert('Too small.');
            break;
    case 4: alert('Exactly!');
            break;
    case 5: alert('Too large.');
            break;
    default: alert("I don't know such value");
}


 // Type matters

 let arg = prompt("Enter a value...");
 switch(arg) {
    case '0': 
    case '1': alert('Zero or one');
              break;
    case '2': alert('Two');
              break;
    case  3:  alert('Never executes.')
              break;
    default: alert('An unknown value');
 }