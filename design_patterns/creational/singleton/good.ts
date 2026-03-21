/*
The Singleton pattern ensures only one instance of a class exists throughout the application, 
with a global access point to it.
*/

/*
static — lives on the class itself, not on any instance. 
        There's only ever one copy of it in memory, shared across everything.
        called on the class, not an instance:
This has to be static because if it weren't, you'd need an instance to call it — but you can't create an instance without it.

private constructor — prevents outside code from creating new instances, ensuring the class controls its own instantiation.

*/
class Database {
    private static instance: Database | null = null // on the class
    private readonly host: string 

    private constructor(host: string) {
        this.host = host
        console.log(`Connecting to ${this.host}...`)  // runs only ONCE
    }

    static getInstance(): Database {    // on the class
        if (!Database.instance) {
            Database.instance = new Database("localhost")
        }
        return Database.instance
    }

    query(sql: string): string {
        return `result of: ${sql}`
    }
}

// const db = new Database()  // ❌ constructor is private
const db1 = Database.getInstance()
const db2 = Database.getInstance()

console.log(db1 === db2)       // true — same instance
console.log(db1.query("SELECT * FROM users"))
// All two variables point to the exact same object in memory
