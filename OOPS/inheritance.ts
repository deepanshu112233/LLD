/*
super keyword is used to:
    Call the parent class constructor.
    Access parent class methods.
*/

class Human {
   name: string;
   protected _age:number=18

  constructor(name: string) {
    this.name = name;
    console.log(`${name} is a person`);
  }

  sayHello(): void {
    console.log(`(Parent class) Hello, my name is ${this.name}`);
  }
}



class Student extends Human {

  constructor(name: string, public college: string) {
    super(name); // Calls the constructor of Human class
    this._age=20 //protected variable access in subclass

    this.college = college;
  }

  // Overriding the sayHello method, but still using parent method
  greetStudent(): void {
    super.sayHello(); // Calls greet() from Person
    console.log(`I study at ${this.college}`);
  }
}


const stu:Student=new Student("Emily","IIT")
stu.sayHello()
stu.greetStudent()