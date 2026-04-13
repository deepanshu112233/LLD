/*
Design Pizza Topping System

Problem: Build a pizza ordering system where customers can add toppings to a base pizza. Each topping adds to the cost and description.

Requirements:

    Component interface: Pizza with getCost() returning a double and getDescription() returning a String
    ConcreteComponent: PlainPizza with a base cost of $5.00 and description "Plain pizza"
    Decorators: CheeseDecorator (+$1.50), PepperoniDecorator (+$2.00), MushroomDecorator (+$1.00)
    Each decorator appends its topping name to the description

*/

//S1: common interface
interface Pizza {
    getCost(): number
    getDescription(): string
}


//S2: common Base class
class PlainPizza implements Pizza{
    getCost():number { return 5.00 }
    getDescription(): string { return 'Plain Pizza'}
}

//S3: abstract class to hold wrapped component and override method if needed
abstract class PizzaDecorator implements Pizza{
    protected pizza: Pizza

    constructor(pizza:Pizza){
        this.pizza=pizza
    }
    
    getCost(): number {
        return this.pizza.getCost()
    }
    getDescription(): string {
        return this.pizza.getDescription()
    }
}

//S4: Extends the abstract decorator and adds its own behavior.

class CheeseDecorator extends PizzaDecorator{
    getCost(): number {
        return this.pizza.getCost()+1.50
    }
    getDescription(): string {
        return this.pizza.getDescription()+" + Cheese"
    }
}

class PepperoniDecorator extends PizzaDecorator{
    getCost(): number {
        return this.pizza.getCost()+2.00
    }
    getDescription(): string {
        return this.pizza.getDescription()+" + Pepperoni"
    }
}

class MushroomDecorator extends PizzaDecorator{
    getCost(): number {
        return this.pizza.getCost()+1.00
    }
    getDescription(): string {
        return this.pizza.getDescription()+" + Mushroom"
    }
}

const pz:PlainPizza=new PlainPizza()
console.log(pz.getDescription(),pz.getCost())
console.log("----")

const withCheese:CheeseDecorator=new CheeseDecorator(pz)
console.log(withCheese.getDescription(),withCheese.getCost())

console.log("----")
const withPepperoni:PepperoniDecorator=new PepperoniDecorator(withCheese)
console.log(withPepperoni.getDescription(),withPepperoni.getCost())

console.log("----")
const withMushroom:MushroomDecorator=new MushroomDecorator(withPepperoni)
console.log(withMushroom.getDescription(),withMushroom.getCost())
