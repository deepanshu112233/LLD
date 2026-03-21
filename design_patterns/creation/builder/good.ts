/*
Builder Pattern Solution
Idea: Construct objects step by step using a builder.

The static keyword:
    -   It is a modifier that makes a member (variable, method, or nested class) belong to the class itself, 
        rather than to any specific instance (object) of that class. This means that the 
        member is shared by all instances of the class and can be accessed without creating an object.
    
    -   You can access static members using the class name directly (e.g., ClassName.methodName()) without using the new keyword to create an object.

With static keyword
    new Vehicle.Builder("SUV")  // ✅ access directly on the class
Without static
    const v = new Vehicle(...)   // ❌ can't even do this, constructor is private!

new v.Builder("SUV")         // you'd need an instance first — impossible
Since Vehicle's constructor is private, you can never create an instance without going through the Builder. 
So if Builder is not static, you're stuck in a chicken-and-egg problem:

"I need a Vehicle instance to access Builder, but I need Builder to create a Vehicle instance."

static breaks this deadlock — it makes Builder live on the class itself, not on instances.

The mental model
                        Accessed on                 Needs instance?
static              BuilderVehicle.Builder              ❌ No
non-static          Buildernew Vehicle().           Builder✅ Yes (impossible here)

Why it "works" without static in your testing
You probably tested it without a private constructor. If the constructor is public, 
you can create an instance and access .Builder on it — so it doesn't break. 
But the moment you add private constructor (which is the correct Builder pattern), removing static makes it completely unusable.
So: static isn't just a style choice here — it's required for the pattern to work correctly with a private constructor.

*/

// Step 1 — Vehicle class, make constructor private
class Vehicle {
    private readonly type: string
    private readonly engine: string
    private readonly wheels: number
    private readonly color: string | undefined
    private readonly gps: boolean | undefined
    private readonly sunroof: boolean | undefined
    private readonly airbags: number | undefined

    private constructor(builder: InstanceType<typeof Vehicle.Builder>) {
        this.type    = builder.type
        this.engine  = builder.engine
        this.wheels  = builder.wheels
        this.color   = builder.color
        this.gps     = builder.gps
        this.sunroof = builder.sunroof
        this.airbags = builder.airbags
    }

    describe(): string {
    return [
            `type=${this.type}`,
            `engine=${this.engine}`,
            `wheels=${this.wheels}`,
            `color=${this.color ?? "none"}`,
            `gps=${this.gps ?? false}`,
            `sunroof=${this.sunroof ?? false}`,
            `airbags=${this.airbags ?? 0}`,
        ].join(", ")
    }

    static Builder = class {
        type: string
        engine: string = "petrol"
        wheels: number = 4
        color: string | undefined
        gps: boolean | undefined
        sunroof: boolean | undefined
        airbags: number | undefined

        //type is necessary, so we can set it in the constructor and make it required
        constructor(type: string) {
            this.type = type
        }

        //Only necessary when to access private properties of Vehicle
        // getType(): string                 { return this.type }
        // getEngine(): string               { return this.engine }
        // getWheels(): number               { return this.wheels }
        // getColor(): string | undefined    { return this.color }
        // getGPS(): boolean | undefined     { return this.gps }
        // getSunroof(): boolean | undefined { return this.sunroof }
        // getAirbags(): number | undefined  { return this.airbags }

        setEngine(engine: string): this   { this.engine  = engine; return this }
        setWheels(wheels: number): this   { this.wheels  = wheels;  return this }
        setColor(color: string): this     { this.color   = color;   return this }
        setGPS(gps: boolean): this        { this.gps     = gps;     return this }
        setSunroof(sunroof: boolean): this { this.sunroof = sunroof; return this }
        setAirbags(airbags: number): this  { this.airbags = airbags; return this }

        build(): Vehicle {
            if (!this.type)   throw new Error("type is required")
            if (!this.engine) throw new Error("engine is required")
            return new Vehicle(this)
        }
    }
}

// Usage
const car = new Vehicle.Builder("SUV")
    .setEngine("v8")
    .setColor("black")
    .setGPS(true)
    .setSunroof(true)
    .setAirbags(6)
    .build()

console.log(car)

const bike = new Vehicle.Builder("bike")
    .setWheels(2)
    .setColor("red")
    .build()

console.log(bike.describe())