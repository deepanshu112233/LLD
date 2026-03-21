/*
Problem Scenario

Imagine we are building a Vehicle object with many fields.

Some are required, some optional.

Example properties:

    type
    engine
    wheels
    color
    gps
    sunroof
    airbags
    musicSystem

    Not every vehicle needs all of them.

*/

class Vehicle {
  constructor(
    public type: string,
    public engine: string,
    public wheels: number,
    public color?: string,
    public gps?: boolean,
    public sunroof?: boolean,
    public airbags?: number,
    public musicSystem?: boolean
  ) {}
}


const car = new Vehicle(
  "car",
  "petrol",
  4,
  "black",
  true,
  true,
  6,
  true
);

const bike = new Vehicle(
  "bike",
  "petrol",
  2,
  "red",
  false,
  false,
  undefined,
  false
)


new Vehicle("car","petrol",4,"black",true,true,6,true)

/*
PROBLEMS:
1. Hard to read and understand what each parameter means
2. Parameter order bugs
3. Hard to maintain and extend (if we add more properties, we need to modify the constructor and all places where it's used)
4. No validation (e.g., we can create a vehicle with 3 wheels, which is invalid for a car)
5. No separation of concerns (the logic for creating a vehicle is mixed with the logic for representing a vehicle)

and many more

*/