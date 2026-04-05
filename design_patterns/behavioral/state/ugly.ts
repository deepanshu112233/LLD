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
        } else if (this.state === "outOfStock") {
            console.log("Machine empty, returning coin")
        }
    }

    selectItem(): void {
        if (this.state === "idle") {
            console.log("Please insert coins first")
        } else if (this.state === "hasCoins") {
            if (this.balance >= 20) {
                this.state = "dispensing"
                console.log("Dispensing item...")
                this.stock--
                this.balance = 0
                this.state = this.stock === 0 ? "outOfStock" : "idle"
            } else {
                console.log("Insufficient balance")
            }
        } else if (this.state === "dispensing") {
            console.log("Already dispensing")
        } else if (this.state === "outOfStock") {
            console.log("Out of stock")
        }
    }

    refund(): void {
        if (this.state === "idle") {
            console.log("No coins inserted")
        } else if (this.state === "hasCoins") {
            console.log(`Returning ₹${this.balance}`)
            this.balance = 0
            this.state = "idle"
        } else if (this.state === "dispensing") {
            console.log("Cannot refund while dispensing")
        } else if (this.state === "outOfStock") {
            console.log("No coins to return")
        }
    }
    // adding new state = modify EVERY method above
    // 4 states × 3 methods = 12 blocks to maintain
    // 5 states × 5 methods = 25 blocks 
}
