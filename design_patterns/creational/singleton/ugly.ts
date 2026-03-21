// ❌ just using a global variable
let dbConnection = {
    host: "localhost",
    query(sql: string) { return `result of: ${sql}` }
}

// anyone can reassign it
dbConnection = { host: "hacked", query: () => "" }  // 💀

// Naive way - still wrong

// ❌ nothing stops multiple instances
class Database {
    host: string = "localhost"
    query(sql: string) { return `result of: ${sql}` }
}

const db1 = new Database()
const db2 = new Database()
console.log(db1 === db2)  // false — two separate instances, wrong