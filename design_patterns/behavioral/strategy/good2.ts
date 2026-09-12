// Strategy pattern + Factory: same shipping example as good.ts, but the client
// no longer does `new SomeStrategy()` directly. Instead it picks a strategy by
// key, so it only ever depends on ShippingMethod (data) and ShippingStrategy
// (the interface) — never on the concrete strategy classes.

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
    calculate(zone: number): number {
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
    constructor(private strategy: ShippingStrategy) {}

    setStrategy(strategy: ShippingStrategy) {
        this.strategy = strategy
    }

    calculate(weight: number, zone: number, isExpress?: boolean) {
        return this.strategy.calculate(weight, zone, isExpress)
    }
}

// Key that identifies a strategy — this is what the client deals with instead of a class
enum ShippingMethod {
    FLAT = "FLAT",
    WEIGHT = "WEIGHT",
    DISTANCE = "DISTANCE",
    EXPRESS = "EXPRESS",
    FEDEX = "FEDEX",
    UPS = "UPS",
}

// Factory: owns the key -> strategy mapping in one place.
// Adding a new carrier means registering it here once, not touching every call site.
class ShippingStrategyFactory {
    private static strategies = new Map<ShippingMethod, ShippingStrategy>([
        [ShippingMethod.FLAT, new FlatRateStrategy()],
        [ShippingMethod.WEIGHT, new WeightBasedStrategy()],
        [ShippingMethod.DISTANCE, new DistanceBasedStrategy()],
        [ShippingMethod.EXPRESS, new ExpressStrategy()],
        [ShippingMethod.FEDEX, new FedExStrategy()],
        [ShippingMethod.UPS, new UPSStrategy()],
    ])

    static get(method: ShippingMethod): ShippingStrategy {
        const strategy = this.strategies.get(method)
        if (!strategy) throw new Error(`Unknown shipping method: ${method}`)
        return strategy
    }
}

// Example usages
// No `new` here — the client only passes a key (could come from a request/config)
const calc = new ShippingCalculator(ShippingStrategyFactory.get(ShippingMethod.FLAT))
console.log('Flat rate:', calc.calculate(2, 1))

calc.setStrategy(ShippingStrategyFactory.get(ShippingMethod.WEIGHT))
console.log('Weight based (3kg):', calc.calculate(3, 1))

calc.setStrategy(ShippingStrategyFactory.get(ShippingMethod.DISTANCE))
console.log('Distance zone 2:', calc.calculate(2, 2))

calc.setStrategy(ShippingStrategyFactory.get(ShippingMethod.EXPRESS))
console.log('Express (isExpress=true):', calc.calculate(4, 1, true))

calc.setStrategy(ShippingStrategyFactory.get(ShippingMethod.FEDEX))
console.log('FedEx:', calc.calculate(2, 3))

calc.setStrategy(ShippingStrategyFactory.get(ShippingMethod.UPS))
console.log('UPS:', calc.calculate(5, 2))