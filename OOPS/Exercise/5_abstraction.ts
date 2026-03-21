/*
Problem: Build a shape calculation system using an abstract class. 
The abstract Shape class has abstract methods for calculating area and perimeter, plus a concrete describe() method that all shapes inherit.

Requirements:

Abstract Shape class with: abstract area() and perimeter() methods, plus a concrete describe() method that prints "Shape: [name], Area: [area], Perimeter: [perimeter]"
Circle: takes a radius. Area = pi r^2, Perimeter = 2 pi * r
Rectangle: takes width and height. Area = w h, Perimeter = 2 (w + h)
describe() should work for any shape without modification

*/

abstract class Shape{
    protected name:string
    constructor(shapeName:string){
        this.name=shapeName
    }
    abstract area():number
    abstract perimeter():number
    describe():void{
        console.log('Name: ', this.name, 'Area: ',this.area().toFixed(2), 'Perimeter: ', this.perimeter().toFixed(2))
    }

}

class Square extends Shape{
    private length:number
    private width:number

    constructor(length:number, width:number){
        super('Square')
        this.length=length
        this.width=width
    }

    area():number{
        return this.length*this.width
    }
    perimeter(): number {
        return (this.length+this.width)*2
    }
}

class Circle extends Shape{
    private radius:number
    private pi=3.14

    constructor(r:number){
        super('Circle')
        this.radius=r
    }

    area(): number {
        return (this.pi*this.radius*this.radius)
    }

    perimeter(): number {
        return (2*this.pi*this.radius)
    }
}


const c:Circle=new Circle(4)
console.log(c.area())
console.log(c.perimeter())
c.describe()