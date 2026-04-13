/*
    Without Strategy — giant if/else that grows forever

class Navigator {
    getRoute(from: string, to: string, mode: string): void {
        if (mode === "driving") {
            console.log(`Driving route: ${from} → highways → ${to}`)
        } else if (mode === "walking") {
            console.log(`Walking route: ${from} → footpaths → ${to}`)
        } else if (mode === "transit") {
            console.log(`Transit route: ${from} → metro → ${to}`)
        } else if (mode === "cycling") {
            console.log(`Cycling route: ${from} → bike lanes → ${to}`)
        }
        // product wants "ferry" mode tomorrow?
        // add another else if — touching existing tested code 💀
    }
}
*/

// Correct Strategy Pattern
// Step 1 — Strategy interface
interface RouteStrategy {
    buildRoute(from: string, to: string): void
}

//Step 2 — Concrete strategies
class DrivingStrategy implements RouteStrategy {
    buildRoute(from: string, to: string): void {
        console.log(`🚗 Driving: ${from} → fastest highway → ${to}`)
        console.log(`   Avoid: tolls=false, highways=false`)
    }
}

class WalkingStrategy implements RouteStrategy {
    buildRoute(from: string, to: string): void {
        console.log(`🚶 Walking: ${from} → scenic footpath → ${to}`)
        console.log(`   Estimated: 25 mins`)
    }
}

class TransitStrategy implements RouteStrategy {
    buildRoute(from: string, to: string): void {
        console.log(`🚇 Transit: ${from} → Line 3 Metro → ${to}`)
        console.log(`   Next train: 4 mins`)
    }
}

class CyclingStrategy implements RouteStrategy {
    buildRoute(from: string, to: string): void {
        console.log(`🚴 Cycling: ${from} → bike lane → ${to}`)
        console.log(`   Elevation gain: 50m`)
    }
}

//step 3: context
class Navigator {
    private strategy: RouteStrategy

    constructor(strategy: RouteStrategy) {
        this.strategy = strategy
    }

    // swap strategy at runtime
    setStrategy(strategy: RouteStrategy): void {
        this.strategy = strategy
    }

    getRoute(from: string, to: string): void {
        console.log(`\nBuilding route from ${from} to ${to}:`)
        this.strategy.buildRoute(from, to)   // delegates — doesn't care which
    }
}

//step 4: usage
const navigator = new Navigator(new DrivingStrategy())
navigator.getRoute("Andheri", "Bandra")
// Building route from Andheri to Bandra:
// 🚗 Driving: Andheri → fastest highway → Bandra
//    Avoid: tolls=false, highways=false

// swap strategy at runtime — navigator untouched
navigator.setStrategy(new TransitStrategy())
navigator.getRoute("Andheri", "Bandra")
// Building route from Andheri to Bandra:
// 🚇 Transit: Andheri → Line 3 Metro → Bandra
//    Next train: 4 mins

navigator.setStrategy(new WalkingStrategy())
navigator.getRoute("Andheri", "Bandra")
// Building route from Andheri to Bandra:
// 🚶 Walking: Andheri → scenic footpath → Bandra
//    Estimated: 25 mins



// product wants Ferry mode
class FerryStrategy implements RouteStrategy {
    buildRoute(from: string, to: string): void {
        console.log(`⛴️  Ferry: ${from} → coastal route → ${to}`)
        console.log(`   Next departure: 30 mins`)
    }
}

// just plug it in
navigator.setStrategy(new FerryStrategy())
navigator.getRoute("Gateway of India", "Elephanta Island")
// ⛴️  Ferry: Gateway of India → coastal route → Elephanta Island
//    Next departure: 30 mins