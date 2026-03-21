/*
Enums (short for enumeration): 
    - special data type that defines a fixed set of named constants.
    - If a value can only be one of a predefined set of options, consider using an enum.

Example Enums
    Enums are perfect for defining categories or states that rarely change.
    - Order States (e.g., PENDING, IN_PROGRESS, COMPLETED)
    - User Roles (e.g., ADMIN, CUSTOMER, DRIVER)
    - Vehicle Types (e.g., CAR, BIKE, TRUCK)

Design Traffic Light Class
    Problem: Create a TrafficLight enum where each light has a color (RED, YELLOW, GREEN), a duration in seconds, 
    and a next() method that returns the next light in the cycle (RED -> GREEN -> YELLOW -> RED).

Requirements:
    Each light has a duration property: RED = 30s, YELLOW = 5s, GREEN = 25s
    next() method returns the next TrafficLight in the cycle
    display() method prints the color and duration
*/


enum TrafficLightColor{
    RED = "RED",
    YELLOW = "YELLOW",
    GREEN = "GREEN"
}

class TrafficLight{
    private colour:TrafficLightColor

    
    constructor(colour:TrafficLightColor){
        this.colour=colour
    }

    getDuration():number{
        switch(this.colour.toUpperCase()){
            case TrafficLightColor.RED:
                return 20
            case TrafficLightColor.YELLOW:
                return 10
            case TrafficLightColor.GREEN:
                return 30
            default:
                return 0
        }
    }

    next():TrafficLight {
        switch(this.colour){
            case TrafficLightColor.RED:
                return new TrafficLight(TrafficLightColor.YELLOW)
            case TrafficLightColor.YELLOW:
                return new TrafficLight(TrafficLightColor.GREEN)
            case TrafficLightColor.GREEN:
                return new TrafficLight(TrafficLightColor.RED)
        }
    }

    displayLight():void{
        console.log(`Light: ${this.colour}, Duration: ${this.getDuration()}`)
    }
}

let light:TrafficLight = new TrafficLight(TrafficLightColor.RED) 
light.displayLight();   // RED - 30

light = light.next();
light.displayLight();   // YELLOW - 20
light = light.next();
light.displayLight();   // GREEN - 30
light = light.next();



/*
Here are several key advantages Enums provide over plain constants or strings:
    If you use string:

    Someone writes "succes" (missing s)

    Production bug.
    Money stuck.
    Fintech disaster.

    If you use enum:

    Compiler stops you.

- Avoid “magic values”: No more scattered strings or integers like "PENDING" or 3 in your code. AVOID typo as well. (like redd)
- Improve readability: Enums make your intent clear — OrderStatus.SHIPPED is far more descriptive than 3.
- Enable compiler checks: The compiler validates enum usage, catching typos and invalid assignments early.
- Reduce bugs: You can’t accidentally assign a random string or number that doesn’t belong to enum.

*/