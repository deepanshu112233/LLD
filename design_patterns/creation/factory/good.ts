
/*
Idea:

Move object creation logic into a Factory class.

Client only asks:

Factory → give me a vehicle

Client does not care which class is created.

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

enum VechileType{
    CAR,
    TRUCK,
    BIKE    
}

//Factory class
class FactoryVehicle{
    createVechile(type:VechileType):Vehicle{
        switch(type){
            case VechileType.CAR:
                return new Car()
            case VechileType.TRUCK:
                return new Truck()
            case VechileType.BIKE:
                return new Bike()
            default:
                throw new Error('Invalid vehicle type')
        }
    }
}

//client code

const vechile = new FactoryVehicle().createVechile(VechileType.CAR)
vechile.start() // Output: Car started
vechile.stop()  // Output: Car stopped

const vechile2 = new FactoryVehicle().createVechile(VechileType.TRUCK)
vechile2.start() // Output: Car started
vechile2.stop()  // Output: Car stopped

