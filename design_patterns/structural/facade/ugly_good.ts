class Engine {
  start() {
    console.log("Engine started");
  }
}

class FuelPump {
  pump() {
    console.log("Fuel pumping");
  }
}

class Ignition {
  ignite() {
    console.log("Ignition started");
  }
}

const engine = new Engine();
const fuel = new FuelPump();
const ignition = new Ignition();

fuel.pump();
engine.start();
ignition.ignite();

/*
The client directly interacts with many subsystems.

Problems

    Client must know all subsystem classes
    Order of operations matters
    Code becomes tightly coupled

*/

class CarFacade {
  private engine = new Engine();
  private fuelPump = new FuelPump();
  private ignition = new Ignition();

  startCar():void {
    this.fuelPump.pump();
    this.engine.start();
    this.ignition.ignite();
    console.log("Car is ready to drive");
  }
}

const car = new CarFacade();
car.startCar();
