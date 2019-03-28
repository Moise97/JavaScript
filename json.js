// JSON methods, toJSON

// JSON stringify() - to convert objects to JSON
// JSON parse - to convert back into an object

let student = {
    name: 'John',
    age: 30,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    wife: null
};
  
let json = JSON.stringify(student);
  
alert(typeof json); // we've got a string!
  
alert(json);
/* JSON-encoded object:
{
    "name": "John",
    "age": 30,
    "isAdmin": false,
    "courses": ["html", "css", "js"],
    "wife": null
}
*/



// stringified array
let numbers = "[0, 1, 2, 3]";
numbers = JSON.parse(numbers);
alert( numbers[1] ); // 1