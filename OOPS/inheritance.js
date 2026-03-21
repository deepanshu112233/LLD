"use strict";
/*
super keyword is used to:
    Call the parent class constructor.
    Access parent class methods.
*/
class Human {
    constructor(name) {
        this._age = 18;
        this.name = name;
        console.log(`${name} is a person`);
    }
    sayHello() {
        console.log(`(Parent class) Hello, my name is ${this.name}`);
    }
}
class Student extends Human {
    constructor(name, college) {
        super(name); // Calls the constructor of Human class
        this.college = college;
        this._age = 20; //protected variable access in subclass
        this.college = college;
    }
    // Overriding the sayHello method, but still using parent method
    greetStudent() {
        super.sayHello(); // 🔥 Calls greet() from Person
        console.log(`I study at ${this.college}`);
    }
}
const stu = new Student("Emily", "IIT");
stu.sayHello();
stu.greetStudent();
