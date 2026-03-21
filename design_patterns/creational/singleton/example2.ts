/*
Implement Singleton Counter Class
    Problem: Implement a Counter singleton that tracks a count across the application. 
    Multiple components should be able to increment the counter, and all must see the same value.

Requirements:

    increment() increases the count by 1
    getCount() returns the current count
    Thread-safe: concurrent increments must not lose updates
    Calling the constructor/access method from different places returns the same instance

*/


class Counter{
    private count : number = 0
    private static instance: Counter;

    private constructor(){}

     static getInstance(): Counter {
        if (!Counter.instance) {
            Counter.instance = new Counter();
        }
        return Counter.instance;
    }

    increament():void{
        this.count++;
    }

    getCounter(): void {
        console.log("Count is: ",this.count)
    }
}

// const c1 = new Counter() // ❌ constructor is private

const c1 = Counter.getInstance()
const c2 = Counter.getInstance()
if(c1==c2) console.log("Same instance")

    c2.increament()
c1.increament()
c1.getCounter() // 2
c2.getCounter() // 2
