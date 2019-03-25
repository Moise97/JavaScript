// Constructor, operator "new"

function createUser(name) {
    // this = {};  (implicitly)

    // add properties to this
    this.name = name;
    this.isAdmin = false;

    // return this;  (implicitly)
  }
  
  let user = new createUser("Jack");
  
  alert(user.name); // Jack
  alert(user.isAdmin); // false


  // Inside a function, we can check whether it was called with new or without it, 
  // using a special new.target property.


  function User(name) {
    if (!new.target) { // if you run me without new
      return new User(name); // ...I will add new for you
    }
    this.name = name;
  }
  
  let john = User("John"); // redirects call to new User
  alert(john.name); // John


  // If return is called with object, then it is returned instead of this.
  // If return is called with a primitive, it’s ignored.
  function BigUser() {
    this.name = "John";
    return { name: "Godzilla" };  // <-- returns an object
  }
  alert( new BigUser().name );  // Godzilla, got that object




  function SmallUser() {
    this.name = "John";
    return; // finishes the execution, returns this
  }
  alert( new SmallUser().name );  // John



  function User(userName) {
    this.userName = userName;
  
    this.sayHi = function() {
      alert( "My name is: " + this.userName );
    };
  }
  let john = new User("John");
  john.sayHi(); // My name is: John