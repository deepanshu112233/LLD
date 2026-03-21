/*

The Problem — Coffee Shop
    You run a coffee shop. Every coffee has a base price. Customers can add extras — milk, sugar, caramel, whipped cream.
    Each extra adds to the price and description.
    
    ❌ a class for every combination
    class Espresso {}
    class EspressoWithMilk {}
    class EspressoWithMilkAndSugar {}
    class EspressoWithMilkAndSugarAndCaramel {}
    class EspressoWithWhipCream {}
    class EspressoWithMilkAndWhipCream {}
    4 extras = 16 classes
    5 extras = 32 classes 💀
    
*/

//Step 1: Define common interface: Every coffee — base or decorated — must have cost() and description(). 
//Both the base coffee and every add-on will implement this. This is what makes wrapping possible
interface Coffee{
    cost(): number 
    description(): string
}


//Step 2: Base component: The simplest coffee, without any add-ons. This is what we will wrap with decorators.
class Espresso implements Coffee {
    cost(): number { return 5 }
    description(): string { return "Espresso" }
}

//Step 3: Abstract Base Decorator: To avoid code duplication. It implements the same interface and has a field to hold the wrapped component. 
//The concrete decorators will extend this and only override the methods they want to change.
class CoffeeDecorator implements Coffee{
    protected coffee: Coffee

    constructor(coffee: Coffee) {
        this.coffee = coffee
    }

    cost(): number { return this.coffee.cost() }
    description(): string { return this.coffee.description() }
}

//Step 4: Concrete Decorators: Each add-on is a concrete decorator that extends the abstract decorator and adds its own behavior.
class MilkDecorator extends CoffeeDecorator {
    cost(): number { 
        return super.cost() + 5 
    }
    description(): string {
        return super.description() + ", Milk"    
    }
}

class Sugar extends CoffeeDecorator {
    cost(): number {
        return this.coffee.cost() + 5
    }
    description(): string {
        return this.coffee.description() + " + Sugar"
    }
}

class Caramel extends CoffeeDecorator {
    cost(): number {
        return this.coffee.cost() + 30
    }
    description(): string {
        return this.coffee.description() + " + Caramel"
    }
}

class WhipCream extends CoffeeDecorator {
    cost(): number {
        return this.coffee.cost() + 25
    }
    description(): string {
        return this.coffee.description() + " + Whip Cream"
    }
}

const e = new Espresso()
console.log(e.description(), e.cost())  // Espresso 5
console.log(e.cost())
console.log("-----")

const withMilk = new MilkDecorator(e)
console.log(withMilk.description(), withMilk.cost())  // Espresso, Milk 10

const withSugar = new Sugar(withMilk)
console.log(withSugar.description(), withSugar.cost())  // Espresso, Milk + Sugar 15

const withCaramel = new Caramel(withSugar)
console.log(withCaramel.description(), withCaramel.cost())  // Espresso, Milk + Sugar + Caramel 45

const withWhipCream = new WhipCream(withCaramel)
console.log(withWhipCream.description(), withWhipCream.cost())  // Espresso, Milk + Sugar + Caramel + Whip Cream 70