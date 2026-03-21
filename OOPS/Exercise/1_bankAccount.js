"use strict";
/*
Design Bank Account Class
Problem: Create a BankAccount class that manages a simple bank account with deposit, withdrawal, and balance checking functionality.

Requirements:

Fields: accountNumber, ownerName, balance
Constructor that initializes the account with owner name and account number (balance starts at 0)
deposit(amount): adds money to balance (only positive amounts)
withdraw(amount): removes money if sufficient balance exists, returns success/failure
getBalance(): returns current balance

*/
class BankAccount {
    constructor(accountNumber, ownerName) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = 0;
    }
    addMoney(amount) {
        if (amount > 0) {
            this.balance += amount;
        }
        else {
            console.log("Enter valid amount");
        }
    }
    withdraw(amount) {
        if (amount < this.balance) {
            this.balance -= amount;
            return true;
        }
        else {
            console.log("Insufficient balance");
            return false;
        }
    }
    getBalance() {
        return this.balance;
    }
    getAccounNumber() {
        return this.accountNumber;
    }
    getOwnerName() {
        return this.ownerName;
    }
}
const p = new BankAccount(12345, "Raja");
p.addMoney(1000);
console.log(p.getBalance());
