/*
Design Smart Home Controller

    Problem: Implement a SmartHomeFacade that controls lights, thermostat, and a security system. 
    Provide leaveHome() 
    and arriveHome() methods 
    that coordinate all three subsystems.


Requirements:
    leaveHome() turns off lights, sets thermostat to eco mode (18C), arms security system
    arriveHome() turns on lights, sets thermostat to comfort mode (22C), disarms security system
    Each subsystem prints its actions to the console
*/



// Subsystem: Controls smart lights in the house
class SmartLightsSystem {
    on(): void {
        // TODO: Print "Lights: Turned on."
        console.log('Lights On')
    }
    
    off(): void {
        // TODO: Print "Lights: Turned off."
        console.log('Lights Off')
    }
}

// Subsystem: Controls the thermostat temperature and mode
class Thermostat {
    private mode: string = "";
    
    setTemperature(degrees: number): void {
        // TODO: Print "Thermostat: Mode set to {mode}. Temperature set to {degrees}C."
        console.log(`Thermostat: Mode set to ${this.mode}. Temperature set to ${degrees}C`)
    }

    setMode(mode: string): void {
        // TODO: Store the mode
        this.mode=mode
    }
}

// Subsystem: Controls the home security system
class SecuritySystem {
    arm(): void {
        // TODO: Print "Security: System armed."
        console.log('Security: System armed')
    }
    
    disarm(): void {
        // TODO: Print "Security: System disarmed."
        console.log('Security: System disarmed')
    }
}

// Facade: Provides simplified methods to control all smart home subsystems
class SmartHomeFacade {
    private lights: SmartLightsSystem;
    private thermostat: Thermostat;
    private security: SecuritySystem;

    constructor(lights: SmartLightsSystem, thermostat: Thermostat, security: SecuritySystem) {
        // TODO: Store references to all subsystems
        this.lights=lights
        this.thermostat=thermostat
        this.security=security
    }

    leaveHome(): void {
        // TODO: Print "--- Leaving Home ---"
        console.log("--- Leaving Home ---")
        this.lights.off()                       // ← actually calling subsystem
        this.thermostat.setMode("Eco")          // ← actually calling subsystem
        this.thermostat.setTemperature(18)      // ← actually calling subsystem
        this.security.arm()                     // ← actually calling subsystem
        console.log("Home Secured")
    }

    arriveHome(): void {
        console.log("--- Arriving Home ---")
        this.security.disarm()                  // ← disarm first before entering
        this.lights.on()
        this.thermostat.setMode("Comfort")
        this.thermostat.setTemperature(22)
        console.log("--- Welcome home! ---")
    }
}

const lights = new SmartLightsSystem();
const thermostat = new Thermostat();
const security = new SecuritySystem();

const home = new SmartHomeFacade(lights, thermostat, security);
home.leaveHome();
console.log();
home.arriveHome();