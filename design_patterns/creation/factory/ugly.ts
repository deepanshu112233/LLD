/*
🚀 Problem Statement: Creating Objects Dynamically
🏗️ Scenario:

Imagine you’re building a software system to manage vehicles for a transportation company. The system needs to create different types of vehicles such as:
✅ Car 🚗
✅ Truck 🚚
✅ Bike 🏍️

Each of these vehicles has different characteristics, but they all share a few common behaviors:
🔹 start() ▶️
🔹 stop() ⏹️‍

⚠️ The Problem
Each time you need to create a vehicle, you have to decide manually which class to instantiate:

➡️ Car 🚗
➡️ Truck 🚛
➡️ Bike 🏍️

If your application has many places where vehicles are created, maintaining all these object creation codes in different classes becomes messy 😵‍💫💥!
*/


interface Vehicle{
    start():void
    stop():void
}

class Car implements Vehicle{
    start():void{
        console.log('Car started')
    }
    stop():void{
        console.log('Car stopped')
    }
}

class Truck implements Vehicle{
    start():void{
        console.log('Truck started')
    }
    stop():void{
        console.log('Truck stopped')
    }
}

class Bike implements Vehicle{
    start():void{
        console.log('Bike started')
    }
    stop():void{
        console.log('Bike stopped')
    }   
}


//Client code
function createVehicle(type:string):Vehicle{
    if(type === 'car'){
        return new Car()
    }else if(type === 'truck'){
        return new Truck()
    }else if(type === 'bike'){
        return new Bike()
    }else{
        throw new Error('Invalid vehicle type')
    }
}

//Usage
const myCar = createVehicle('car')
myCar.start() // Output: Car started
myCar.stop()  // Output: Car stopped


/*
Hard to extend

If you add:

    Bus
    Scooter
    Van

You must modify all creation logic.
This violates Open/Closed Principle.

Real problem (what happens in big systems)

Vehicle creation may exist in many places:

    OrderService
    DeliveryService
    TransportManager
    FleetManager
    Testing code

Example:

    if(type === "car") new Car()

    You must modify every file.

*/