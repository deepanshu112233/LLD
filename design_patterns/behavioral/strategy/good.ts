// Strategy pattern: separate shipping algorithms into interchangeable strategies

export interface ShippingStrategy {
    calculate(weight: number, zone: number, isExpress?: boolean): number
}

class FlatRateStrategy implements ShippingStrategy {
    calculate(): number {
        return 99
    }
}
class WeightBasedStrategy implements ShippingStrategy {
    calculate(weight: number): number {
        if (weight <= 1) return 50
        if (weight <= 5) return 50 + (weight - 1) * 20
        return 50 + 4 * 20 + (weight - 5) * 15
    }
}
class DistanceBasedStrategy implements ShippingStrategy {
    calculate(_: number, zone: number): number {
        if (zone === 1) return 40
        if (zone === 2) return 80
        if (zone === 3) return 150
        return 250
    }
}

// Express can be modelled as a standalone strategy or a decorator wrapping another strategy.
// Here it's a simple standalone strategy that applies express pricing when requested
class ExpressStrategy implements ShippingStrategy {
    calculate(weight: number, _zone: number, isExpress = false): number {
        const base = 50 + weight * 30
        return isExpress ? base * 1.5 : base
    }
}

// Simulated third-party carrier 
class FedExStrategy implements ShippingStrategy {
    calculate(weight: number, zone: number): number {
        console.log("Calling FedEx API...")
        return weight * 45 + zone * 20
    }
}
class UPSStrategy implements ShippingStrategy {
    calculate(weight: number, zone: number): number {
        console.log("Calling UPS API...")
        return weight * 40 + zone * 25
    }
}

// Context that uses a strategy
class ShippingCalculator {
    private strategy: ShippingStrategy

    constructor(strategy: ShippingStrategy) {
        this.strategy = strategy
    }

    setStrategy(strategy: ShippingStrategy) {
        this.strategy = strategy
    }

    calculate(weight: number, zone: number, isExpress?: boolean) {
        return this.strategy.calculate(weight, zone, isExpress)
    }
}

// Example usages
    const calc = new ShippingCalculator(new FlatRateStrategy())
    console.log('Flat rate:', calc.calculate(2, 1))

    calc.setStrategy(new WeightBasedStrategy())
    console.log('Weight based (3kg):', calc.calculate(3, 1))

    calc.setStrategy(new DistanceBasedStrategy())
    console.log('Distance zone 2:', calc.calculate(2, 2))

    calc.setStrategy(new ExpressStrategy())
    console.log('Express (isExpress=true):', calc.calculate(4, 1, true))

    calc.setStrategy(new FedExStrategy())
    console.log('FedEx:', calc.calculate(2, 3))

    calc.setStrategy(new UPSStrategy())
    console.log('UPS:', calc.calculate(5, 2))
