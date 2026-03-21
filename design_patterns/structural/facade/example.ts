// Subsystem classes — complex, low level
interface BookingRecord {
    userId: string
    seatId: string
    amount: number
}

class AuthService {
    validateUser(userId: string): boolean {
        console.log(`Validating user ${userId}`)
        return true
    }
}

class SeatService {
    getAvailable(screen: string, showtime: string): string[] {
        console.log(`Fetching seats for ${screen} at ${showtime}`)
        return ["A1", "A2", "A3"]
    }
    lock(seatId: string): void {
        console.log(`Locking seat ${seatId}`)
    }
    release(seatId: string): void {
        console.log(`Releasing seat ${seatId}`)
    }
}

class PaymentService {
    charge(amount: number, currency: string): boolean {
        console.log(`Charging ${amount} ${currency}`)
        return true
    }
    refund(amount: number): void {
        console.log(`Refunding ${amount}`)
    }
}

class TicketService {
    generate(userId: string, seatId: string): string {
        const ticketId = `TKT-${Date.now()}`
        console.log(`Generated ticket ${ticketId}`)
        return ticketId
    }
}

class NotificationService {
    sendEmail(userId: string, ticketId: string): void {
        console.log(`Email sent to ${userId} for ticket ${ticketId}`)
    }
    sendSMS(userId: string, ticketId: string): void {
        console.log(`SMS sent to ${userId} for ticket ${ticketId}`)
    }
}

// ✅ Facade — one clean interface over all subsystems
class BookingFacade {
    private auth: AuthService
    private seat: SeatService
    private payment: PaymentService
    private ticket: TicketService
    private notification: NotificationService

    constructor() {
        this.auth         = new AuthService()
        this.seat         = new SeatService()
        this.payment      = new PaymentService()
        this.ticket       = new TicketService()
        this.notification = new NotificationService()
    }

    bookTicket(userId: string, screen: string, showtime: string, amount: number): string | null {
        // step 1 — validate
        if (!this.auth.validateUser(userId)) {
            console.log("Invalid user")
            return null
        }

        // step 2 — get and lock seat
        const seats = this.seat.getAvailable(screen, showtime)
        if (seats.length === 0) {
            console.log("No seats available")
            return null
        }
        const seatId = seats[0]
        if (!seatId) return null
        this.seat.lock(seatId)

        // step 3 — payment
        const paid = this.payment.charge(amount, "INR")
        if (!paid) {
            this.seat.release(seatId)   // rollback seat lock
            return null
        }

        // step 4 — generate ticket
        const ticketId = this.ticket.generate(userId, seatId)

        // step 5 — notify
        this.notification.sendEmail(userId, ticketId)
        this.notification.sendSMS(userId, ticketId)

        return ticketId
    }

    cancelTicket(userId: string, seatId: string, amount: number): void {
        this.seat.release(seatId)
        this.payment.refund(amount)
        this.notification.sendEmail(userId, "CANCELLED")
    }
}

// Usage — caller knows nothing about subsystems
const booking = new BookingFacade()
const ticketId = booking.bookTicket("user123", "IMAX", "7PM", 500)
console.log(`Booked: ${ticketId}`)

booking.cancelTicket("user123", "A1", 500)

/*
The structure


```
Caller (your app / API route / UI)
↓ calls one method
BookingFacade          ← simple interface
↙    ↓    ↓   ↘
Auth  Seat  Pay  Ticket  Notification   ← complex subsystem

*/
