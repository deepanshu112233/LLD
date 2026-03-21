"use strict";
class BankAc {
    // M-1
    // private balance:number
    // private holder:string
    // constructor(private name:string,private initial:number=0){
    //     this.holder=name
    //     this.balance=initial
    // }
    //M-2 preferred
    constructor(holder, balance = 0) {
        this.holder = holder;
        this.balance = balance;
    }
    deposit(amount) {
        if (amount >= 0) {
            this.balance += amount;
        }
        console.log(`Deposited amount: ${amount}, New balance: ${this.balance}`);
    }
    withdraw(amount) {
        if (amount < this.balance) {
            this.balance -= amount;
        }
        console.log(`Withdrawl amount: ${amount}, New balance: ${this.balance}`);
    }
    getbalance() {
        console.log(`Name: ${this.holder}, Current balance: ${this.balance}`);
    }
}
const person = new BankAc("Deep", 1000);
person.getbalance();
person.deposit(400);
person.withdraw(100);
person.getbalance();
/*
Notice what's happening here:

balance is marked private, so no external class can access or modify it directly.
deposit() and withdraw() are public entry points that validate user input before updating the state.
getBalance() allows read-only access without revealing the underlying variable or letting external code change it.

*/
/*
Let’s take a more realistic example. You're building a PaymentProcessor class that handles credit card transactions.
The raw card number must never be stored or visible anywhere in the system.
If a developer accidentally logs the payment object or inspects it in a debugger, they should only see a masked version.
*/
class PaymentProcessor {
    constructor(cardNumber, amount) {
        this.cardNumber = this.maskedCardNumber(cardNumber);
        this.amount = amount;
    }
    maskedCardNumber(cardNumber) {
        return `****-****-****-` + cardNumber.substring(cardNumber.length - 4);
    }
    processPayment() {
        console.log(`Processing payment of $${this.amount} with card ${this.cardNumber}`);
    }
}
const payment = new PaymentProcessor("1234-5678-9012-3456", 100);
payment.processPayment();
