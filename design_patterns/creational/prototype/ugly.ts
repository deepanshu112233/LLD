// Imagine creating this complex object from scratch every time
class Server {
    host: string
    port: number
    timeout: number
    maxConnections: number
    ssl: boolean
    headers: Record<string, string>
    retryPolicy: { attempts: number; delay: number }

    constructor() {
        // expensive setup — reads config files, validates, connects
        this.host = "localhost"
        this.port = 8080
        this.timeout = 3000
        this.maxConnections = 100
        this.ssl = true
        this.headers = { "Content-Type": "application/json", "Accept": "application/json" }
        this.retryPolicy = { attempts: 3, delay: 1000 }
    }
}

// Need a slightly different server config?
const server1 = new Server()  // expensive setup runs
const serverz = new Server()  // expensive setup runs AGAIN
serverz.port = 9090           // only changed one thing — wasteful



// ❌ manually copying every field — brittle
function copyServer(server: Server): Server {
    const copy = new Server()
    copy.host = server.host
    copy.port = server.port
    copy.timeout = server.timeout
    copy.ssl = server.ssl
    copy.headers = server.headers        // ❌ shallow copy — shared reference
    copy.retryPolicy = server.retryPolicy // ❌ same problem
    return copy
}

const server2 = copyServer(server1)
server2.headers["X-Custom"] = "yes"      // ❌ also mutates server1.headers!
console.log(server1.headers["X-Custom"]) // "yes" — bug, shared object
