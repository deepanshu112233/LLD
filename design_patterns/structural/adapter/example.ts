// Your app's standard payment interface
interface PaymentProcessor {
    charge(amount: number, currency: string): boolean
    refund(transactionId: string): boolean
}

// Stripe SDK — you can't change this
class StripeSDK {
    createCharge(amountInCents: number, curr: string, apiKey: string): { success: boolean } {
        return { success: true }
    }
    reverseCharge(chargeId: string, apiKey: string): { reversed: boolean } {
        return { reversed: true }
    }
}

// Razorpay SDK — you can't change this either
class RazorpaySDK {
    makePayment(amt: number, cur: string): string {  // returns transactionId
        return "rzp_txn_123"
    }
    cancelPayment(txnId: string): void {}
}

// Stripe Adapter
class StripeAdapter implements PaymentProcessor {
    private stripe: StripeSDK
    private apiKey: string = "sk_live_xxx"

    constructor(stripe: StripeSDK) {
        this.stripe = stripe
    }

    charge(amount: number, currency: string): boolean {
        const result = this.stripe.createCharge(amount * 100, currency, this.apiKey)
        return result.success
    }

    refund(transactionId: string): boolean {
        const result = this.stripe.reverseCharge(transactionId, this.apiKey)
        return result.reversed
    }
}

// Razorpay Adapter
class RazorpayAdapter implements PaymentProcessor {
    private razorpay: RazorpaySDK

    constructor(razorpay: RazorpaySDK) {
        this.razorpay = razorpay
    }

    charge(amount: number, currency: string): boolean {
        const txnId = this.razorpay.makePayment(amount, currency)
        return !!txnId
    }

    refund(transactionId: string): boolean {
        this.razorpay.cancelPayment(transactionId)
        return true
    }
}

// Your app — doesn't care if it's Stripe or Razorpay, charge and refund through the PaymentProcessor interface translated by the adapters. 
// No if/else, no duplicated logic, just clean code. Swap providers by changing one line of code.
function checkout(amount: number, processor: PaymentProcessor) {
    const success = processor.charge(amount, "INR")
    if (!success) processor.refund("txn_123")
}

// Swap payment providers without touching checkout logic
checkout(500, new StripeAdapter(new StripeSDK()))
checkout(500, new RazorpayAdapter(new RazorpaySDK()))