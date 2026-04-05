// Step 1: Define the State Interface
// The first step is to define a MachineState interface that declares all the operations 
// the vending machine supports. Each state will implement this interface, defining 
// how the vending machine should behave when in that state.

interface State {
  insertMoney(amount: number): void;
  selectProduct(): void;
  dispense(): void;
}


//Step 2: Context Class (VendingMachine)
// The VendingMachine class will maintain a reference to the current state and delegate 
// operations to the state object. It will also have methods to change the current state.
class VendingMachine {
  private state: State;

  constructor() {
    this.state = new NoMoneyState(this); // initial state
  }

  setState(state: State) {
    this.state = state;
  }

  // delegate actions to current state
  insertMoney(amount: number) {
    this.state.insertMoney(amount);
  }

  selectProduct() {
    this.state.selectProduct();
  }

  dispense() {
    this.state.dispense();
  }
}

//Step 3: Concrete State Classes
// Now we create concrete state classes for each state of the vending machine. 
// Each class will implement the State interface and define the behavior for that state.

// ── State 1: Idle ────────────────────────────────────────
// machine is waiting — no coins inserted yet
class NoMoneyState implements State {
  constructor(private machine: VendingMachine) {}

  insertMoney(amount: number): void {
    console.log(`Inserted ₹${amount}`);
    this.machine.setState(new HasMoneyState(this.machine)); // move state
  }

  selectProduct(): void {
    console.log("Insert money first");
  }

  dispense(): void {
    console.log("No money → cannot dispense");
  }
}

// ── State 2: HasCoins ────────────────────────────────────
// coins inserted — waiting for item selection
class HasMoneyState implements State {
  constructor(private machine: VendingMachine) {}

  insertMoney(amount: number): void {
    console.log("Money already inserted");
  }

  selectProduct(): void {
    console.log("Product selected");
    this.machine.setState(new DispensingState(this.machine)); // next state
  }

  dispense(): void {
    console.log("Select product first");
  }
}


// ── State 3: Dispensing ──────────────────────────────────
// item is being dispensed — brief transition state
class DispensingState implements State {
  constructor(private machine: VendingMachine) {}

  insertMoney(amount: number): void {
    console.log("Wait, dispensing in progress");
  }

  selectProduct(): void {
    console.log("Already selected");
  }

  dispense(): void {
    console.log("Dispensing product...");
    this.machine.setState(new NoMoneyState(this.machine)); // reset
  }
}


const vm = new VendingMachine();

vm.selectProduct(); // no money
vm.insertMoney(50); // insert
vm.selectProduct(); // select
vm.dispense();      // dispense

console.log("---");

// try invalid flow
vm.dispense(); //  no money again