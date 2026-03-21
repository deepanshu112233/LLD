/*
Problem: This is the classic LSP example. A Square class extends Rectangle but overrides setWidth and setHeight to 
maintain equal sides. This breaks client code that expects width and height to be independent.

Refactor the design using a Shape interface with a getArea() method, so that Rectangle and Square are both 
valid shapes without one inheriting from the other.

Requirements:

Create a Shape interface with a getArea() method
Implement Rectangle with independent width and height, set via constructor
Implement Square with a single side length, set via constructor
Neither class should extend the other
Client code should work with any Shape without assumptions about mutability

*/
interface Shape {
  getArea(): number;
}

class Rectangle implements Shape {
  private readonly width: number;
  private readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class Square implements Shape {
  private readonly side: number;

  constructor(side: number) {
    this.side = side;
  }

  getArea(): number {
    return this.side * this.side;
  }
}

const rectangle: Shape = new Rectangle(5, 10);
const square: Shape = new Square(5);

console.log(`Rectangle area: ${rectangle.getArea()}`);
console.log(`Square area: ${square.getArea()}`);