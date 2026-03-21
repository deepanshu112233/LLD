/*
Open closed priciple (OCP)
    - software entities (classes, modules, functions, etc.) should be open for extension but closed for modification. 
    - This means that you should be able to add new functionality to a class without changing its existing code.

*/


//Implementing OCP

// Step 1: Define an Interface
// We create a PaymentMethod interface that defines a contract for all payment types. Every payment method must implement a processPayment method.
interface PaymentMethod {
    processPayment(amount: number): void;
}

// Step 2: Implement Concrete Classes
// We implement the PaymentMethod interface for different payment types: CreditCardPayment, PayPalPayment, and BankTransferPayment. 
// //Each class provides its own implementation of the processPayment method.

class CreditCardPayment implements PaymentMethod {
    processPayment(amount: number): void {
        console.log(`Processing credit card payment of $${amount}`);
        // Complex logic for credit card processing
    }
}

class PayPalPayment implements PaymentMethod {
    processPayment(amount: number): void {
        console.log(`Processing PayPal payment of $${amount}`);
        // Logic for PayPal processing
    }
}

// Let's add a new one without touching existing code!
class UPIPayment implements PaymentMethod {
    processPayment(amount: number): void {
        console.log(`Processing UPI payment of ₹${amount * 80}`); // Assuming a conversion rate for example
        // Logic for UPI processing
    }
}


//step 3: Modify the PaymentProcessor to Use the Interface
// The PaymentProcessor class now depends
// on the PaymentMethod interface rather than concrete implementations. 
// This allows us to add new payment methods without modifying the PaymentProcessor class, adhering to the Open/Closed Principle.

class PaymentProcessor {
    process(paymentMethod: PaymentMethod, amount: number): void {
        // No more if-else! The processor doesn't care about the specific type.
        // It just knows it can call processPayment.
        paymentMethod.processPayment(amount);
    }
}


//step 4(Final): Final service checkout
// The CheckoutService simply passes the payment method to the processor. 
// It does not need to know which payment type it is handling, it just delegates.

class CheckoutService {
    processPayment(method: PaymentMethod, amount: number): void {
        const processor = new PaymentProcessor();
        processor.process(method, amount);
    }
}

const checkout = new CheckoutService();
checkout.processPayment(new CreditCardPayment(), 100.00);
checkout.processPayment(new PayPalPayment(), 100.00);
checkout.processPayment(new UPIPayment(), 100.00);