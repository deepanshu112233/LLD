/*
Refactor ShippingCostCalculator Class
Problem: A ShippingCostCalculator uses if-else to determine the shipping cost based on the shipping type (Standard, Express, Overnight, International). Every time a new shipping type is added, someone has to modify the calculator. Refactor this so that new shipping types can be added without modifying the calculator.

Requirements:

Define a ShippingStrategy interface with a calculateCost(weight) method
Create concrete implementations: StandardShipping, ExpressShipping, OvernightShipping
Refactor ShippingCostCalculator to accept a ShippingStrategy instead of a string
The calculator should delegate cost computation to the strategy
*/


// Step 1: Define the ShippingStrategy Interface
interface ShippingStrategy {
    calculateCost(weight: number): number;
}

// Step 2: Implement Concrete Shipping Strategies
class StandardShipping implements ShippingStrategy {
    calculateCost(weight: number): number {
        return weight * 5; // Example cost calculation
    }
}

class ExpressShipping implements ShippingStrategy {
    calculateCost(weight: number): number {
        return weight * 10; // Example cost calculation
    }
}

class OvernightShipping implements ShippingStrategy {
    calculateCost(weight: number): number {
        return weight * 20; // Example cost calculation
    }
}

class ShippingCostCalculator {
    private strategy: ShippingStrategy

    constructor(strategy: ShippingStrategy){
        this.strategy = strategy;
    }

    calculate(weight: number): number {
        return this.strategy.calculateCost(weight);
    }
    
}

const weight = 2.0;

const standard = new ShippingCostCalculator(new StandardShipping());
const express = new ShippingCostCalculator(new ExpressShipping());
const overnight = new ShippingCostCalculator(new OvernightShipping());

console.log(`Standard: $${standard.calculate(weight).toFixed(1)}`);
console.log(`Express: $${express.calculate(weight).toFixed(1)}`);
console.log(`Overnight: $${overnight.calculate(weight).toFixed(1)}`);