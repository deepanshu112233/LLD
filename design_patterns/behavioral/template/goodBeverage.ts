
abstract class Beverage{
    // template method (fixed steps)
    make():void{
        this.boilWater()
        this.addMainIngredient()
        this.pourIntoCup()
    }

    // common step
    private boilWater(): void {
        console.log("Boil water")
    }
    private pourIntoCup(): void {
        console.log("Pour into cup")
    }
    
    // steps to be implemented by subclasses, no default makes sense
    protected abstract addMainIngredient(): void
    protected abstract getDrinkName(): string
}


class Tea extends Beverage {
    protected addMainIngredient(): void {
        console.log("Add tea leaves")
    }

    protected getDrinkName(): string {
        return "Tea"
    }
}

class Coffee extends Beverage{
    protected addMainIngredient(): void {
        console.log("Add coffee")
    }

    protected getDrinkName(): string {
        return "Coffee"
    }
}


const baseTea = new Tea()
baseTea.make()
console.log("---------");
const baseCoffee = new Coffee()
baseCoffee.make()