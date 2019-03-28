// Date and time

let now = new Date();
alert(now); // show current date/ time

let Date = new Date("2017-01-06");
alert(Date);

let date = new Date(2011, 0, 1, 2, 3, 4, 567);
alert( date ); // 1.01.2011, 02:03:04.567

// Autocorrection
let date = new Date(2013, 0, 32); // 32 Jan 2013 ?!?
alert(date); // ...is 1st Feb 2013!

// Data parse from a string
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');
alert(ms); // 1327611110417  (timestamp)

let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );
alert(date); // Thu Jan 26 2012 22:51:50 GMT+0200 (Eastern European Standard Time)
