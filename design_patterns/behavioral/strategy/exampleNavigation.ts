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

// ===========================================
// Strategy Pattern Example - Google Maps
// ===========================================

// Step 1: Strategy Interface
interface RouteStrategy {
    buildRoute(from: string, to: string): void;
}

// ===========================================
// Step 2: Concrete Strategies
// ===========================================

class DrivingStrategy implements RouteStrategy {
    buildRoute(from: string, to: string): void {
        console.log(`🚗 Driving Route`);
        console.log(`${from} → Highway → ${to}`);
        console.log(`Estimated Time: 20 mins`);
    }
}

class WalkingStrategy implements RouteStrategy {
    buildRoute(from: string, to: string): void {
        console.log(`🚶 Walking Route`);
        console.log(`${from} → Footpath → ${to}`);
        console.log(`Estimated Time: 55 mins`);
    }
}

class CyclingStrategy implements RouteStrategy {
    buildRoute(from: string, to: string): void {
        console.log(`🚴 Cycling Route`);
        console.log(`${from} → Bike Lane → ${to}`);
        console.log(`Estimated Time: 30 mins`);
    }
}

class TransitStrategy implements RouteStrategy {
    buildRoute(from: string, to: string): void {
        console.log(`🚇 Transit Route`);
        console.log(`${from} → Metro → ${to}`);
        console.log(`Next Train: 5 mins`);
    }
}

class FerryStrategy implements RouteStrategy {
    buildRoute(from: string, to: string): void {
        console.log(`⛴️ Ferry Route`);
        console.log(`${from} → Sea Route → ${to}`);
        console.log(`Next Departure: 30 mins`);
    }
}

// ===========================================
// Step 3: Context
// ===========================================

class RouteNavigator {
    private strategy: RouteStrategy;

    constructor(strategy: RouteStrategy) {
        this.strategy = strategy;
    }

    public setStrategy(strategy: RouteStrategy): void {
        this.strategy = strategy;
    }

    public getRoute(from: string, to: string): void {
        console.log("\n========================");
        console.log(`Route: ${from} -> ${to}`);
        this.strategy.buildRoute(from, to);
        console.log("========================");
    }
}

// ===========================================
// Step 4: Client Code
// ===========================================

const navigatorApp = new RouteNavigator(
    new DrivingStrategy()
);

navigatorApp.getRoute("Andheri", "Bandra");

// User changes mode to Metro
navigatorApp.setStrategy(
    new TransitStrategy()
);

navigatorApp.getRoute("Andheri", "Bandra");

// User changes mode to Walking
navigatorApp.setStrategy(
    new WalkingStrategy()
);

navigatorApp.getRoute("Andheri", "Bandra");

// User changes mode to Cycling
navigatorApp.setStrategy(
    new CyclingStrategy()
);

navigatorApp.getRoute("Andheri", "Bandra");

// Product team launches Ferry mode
// No changes required in existing code
navigatorApp.setStrategy(
    new FerryStrategy()
);

navigatorApp.getRoute(
    "Gateway of India",
    "Elephanta Island"
);