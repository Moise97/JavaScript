// Static properties and methods
/**
 * We can also assign a method to the class function, not to its 'prototype'. Such methods are call static.
*/

class User {
    static staticMethods(){
        alert(this === User);
    }
}

User.staticMethods(); // true

// For instance, we have Article objects and we need a function to compare them. the natural choice would be Article.compare, like this:
class Article {
    constructor(title, date){
        this.title = title;
        this.date = date;
    }

    static compare(articleA, articleB){
        return articleA.date - articleB.date;
    }
}

// usage
let articles = [
    new Article("Mind", new Date(2019, 1, 1)),
    new Article("Body", new Date(2019, 0, 1)),
    new Article("JavaScript", new Date(2019, 11, 1))
];

articles.sort(Article.compare);
alert(articles[0].title); // Body


// Static properties
// This is a recent addition to the language. Examples work in the recent Chrome

class Article {
    static publisher = "Ilya Kantor";
}
alert(Article.publisher); // Ilka Kantor

// this is the same as a direct assignment to article:
Article.publisher = "Ilka Kantor";


// Statics and Inheritance
class Animal {

    constructor(name, speed){
        this.name = name;
        this.speed = speed;
    }

    run(speed = 0){
        this.speed +=speed;
        alert(`${this.name} runs at speed: ${this.spped}`);
    }

    static compare(animalA, animalB){
        return animalA.speed - animalB.speed;
    }
}

// Inherit from Animal
class Rabbit extends Animal {
    hide(){
        alert(`${this.name} hides`);
    }
}

let rabbits = [
    new Rabbit("WhiteRabbit", 50),
    new Rabbit("Black Rabbit", 30)
];

rabbits.sort(Rabbit.compare);
rabbits[0].run(); // Black Rabbit runs at speed: 30

/**
 * Now we can call Rabbit.compare assuming that the inherited Animal.compare will be called.
 * How does it work? Again, using prototypes. Extends gives Rabbit the [[ Prototype ]] reference to Animal.
*/