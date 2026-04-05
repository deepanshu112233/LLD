// 1. The Problem: Shipping Cost Calculation
// Imagine you are building an e-commerce platform. One of the features you need is a shipping cost calculator. Sounds simple enough, but shipping costs can be calculated in many different ways depending on business rules:
// * Flat Rate: A fixed fee regardless of weight or distance
// * Weight-Based: Cost increases with package weight
// * Distance-Based: Different rates for different delivery zones
// * Express Delivery: Premium pricing for faster service
// * Third-Party API: Dynamic rates from carriers like FedEx or UPS


// ❌ everything crammed into one function
class ShippingCalculator {
    calculate(
        method: string,
        weight: number,
        zone: number,
        isExpress: boolean
    ): number {
        if (method === "flat") {
            return 99

        } else if (method === "weight") {
            if (weight <= 1)       return 50
            else if (weight <= 5)  return 50 + (weight - 1) * 20
            else                   return 50 + 4 * 20 + (weight - 5) * 15

        } else if (method === "distance") {
            if (zone === 1)        return 40
            else if (zone === 2)   return 80
            else if (zone === 3)   return 150
            else                   return 250

        } else if (method === "express") {
            const base = 50 + (weight * 30)
            return isExpress ? base * 1.5 : base

        } else if (method === "fedex") {
            // pretend API call
            console.log("Calling FedEx API...")
            return weight * 45 + zone * 20

        } else if (method === "ups") {
            // pretend API call
            console.log("Calling UPS API...")
            return weight * 40 + zone * 25
        }

        return 0
        // new carrier tomorrow? add another else if
        // touch this function, retest everything 💀
    }
}