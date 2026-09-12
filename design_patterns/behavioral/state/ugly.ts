// VENDING MACHINE EXAMPLE


// ❌ Without State — one giant switch everywhere
class VendingMachine {
    private state: string = "idle"
    private balance: number = 0
    private stock: number = 5

    insertCoin(amount: number): void {
        // same action, completely different behaviour per state
        if (this.state === "idle") {
            this.balance += amount
            this.state = "hasCoins"
            console.log(`Inserted ₹${amount}`)
        } else if (this.state === "hasCoins") {
            this.balance += amount
            console.log(`Added ₹${amount}, total ₹${this.balance}`)
        } else if (this.state === "dispensing") {
            console.log("Please wait, dispensing...")
        }
    }

    selectItem(): void {
        if (this.state === "idle") {
            console.log("Please insert coins first")
        } else if (this.state === "hasCoins") {
            if (this.balance >= 20) {
                console.log("Item selected")
                this.state = "dispensing"
            } else {
                console.log("Insufficient balance")
            }
        } else if (this.state === "dispensing") {
            console.log("Already dispensing")
        }
    }

    // dispensing is now its own step (like the good version's dispense()),
    // so "dispensing" is an actual state you can be in between two calls,
    // not just set and overwritten inside selectItem()
    dispense(): void {
        if (this.state === "idle") {
            console.log("Select an item first")
        } else if (this.state === "hasCoins") {
            console.log("Select an item first")
        } else if (this.state === "dispensing") {
            console.log("Dispensing item...")
            this.stock--
            this.balance = 0
            this.state = "idle"
        }
    }
    // adding new state = modify EVERY method above
    // 3 states × 3 methods = 9 blocks to maintain
    // 5 states × 5 methods = 25 blocks
}

// Usage
const vm = new VendingMachine()

vm.selectItem() // idle → "Please insert coins first"
vm.insertCoin(10) // idle → hasCoins, "Inserted ₹10"
vm.selectItem() // hasCoins, balance 10 < 20 → "Insufficient balance"
vm.insertCoin(10) // hasCoins → "Added ₹10, total ₹20"
vm.selectItem() // hasCoins, balance 20 → "Item selected", state = dispensing
vm.insertCoin(10) // dispensing → "Please wait, dispensing..."
vm.selectItem() // dispensing → "Already dispensing"
vm.dispense() // dispensing → "Dispensing item...", state = idle

console.log("---")

// try invalid flow
vm.dispense() // idle again → "Select an item first"
