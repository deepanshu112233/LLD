interface PaymentStrategy {
    pay(amount: number): void
}

class UPIPayment implements PaymentStrategy {
    private upiId: string

    constructor(upiId: string) {
        this.upiId = upiId
    }

    pay(amount: number): void {
        console.log(`💳 UPI: ₹${amount} paid via ${this.upiId}`)
    }
}

class CardPayment implements PaymentStrategy {
    private last4: string

    constructor(last4: string) {
        this.last4 = last4
    }

    pay(amount: number): void {
        console.log(`💳 Card: ₹${amount} charged to card ending ${this.last4}`)
    }
}

class NetBankingPayment implements PaymentStrategy {
    private bank: string

    constructor(bank: string) {
        this.bank = bank
    }

    pay(amount: number): void {
        console.log(`🏦 Net Banking: ₹${amount} debited from ${this.bank}`)
    }
}

class WalletPayment implements PaymentStrategy {
    private wallet: string

    constructor(wallet: string) {
        this.wallet = wallet
    }

    pay(amount: number): void {
        console.log(`👛 Wallet: ₹${amount} paid via ${this.wallet}`)
    }
}

// Context
class Checkout {
    private strategy: PaymentStrategy

    constructor(strategy: PaymentStrategy) {
        this.strategy = strategy
    }

    setPaymentMethod(strategy: PaymentStrategy): void {
        this.strategy = strategy
    }

    placeOrder(amount: number): void {
        console.log(`\nProcessing order of ₹${amount}`)
        this.strategy.pay(amount)
        console.log(`Order confirmed ✅`)
    }
}

// Usage
const checkout = new Checkout(new UPIPayment("deepanshu@okaxis"))
checkout.placeOrder(999)
// Processing order of ₹999
// 💳 UPI: ₹999 paid via deepanshu@okaxis
// Order confirmed ✅

// user switches payment method
checkout.setPaymentMethod(new CardPayment("4242"))
checkout.placeOrder(1499)
// Processing order of ₹1499
// 💳 Card: ₹1499 charged to card ending 4242
// Order confirmed ✅

checkout.setPaymentMethod(new WalletPayment("Paytm"))
checkout.placeOrder(299)
// Processing order of ₹299
// 👛 Wallet: ₹299 paid via Paytm
// Order confirmed ✅