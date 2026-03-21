interface PaymentService {
    charge(userId: string, amount: number): boolean
}

class RealPaymentService implements PaymentService {
    charge(userId: string, amount: number): boolean {
        console.log(`Charging ${userId} → ₹${amount}`)
        return true
    }
}

// Logging Proxy — logs every call transparently
class LoggingPaymentProxy implements PaymentService {
    private service: RealPaymentService

    constructor(service: RealPaymentService) {
        this.service = service
    }

    charge(userId: string, amount: number): boolean {
        console.log(`[LOG] charge() called | user=${userId} amount=${amount}`)
        const start  = Date.now()
        const result = this.service.charge(userId, amount)
        const time   = Date.now() - start
        console.log(`[LOG] charge() result=${result} | took ${time}ms`)
        return result
    }
}

const payment = new LoggingPaymentProxy(new RealPaymentService())
payment.charge("user123", 500)
// [LOG] charge() called | user=user123 amount=500
// Charging user123 → ₹500
// [LOG] charge() result=true | took 1ms