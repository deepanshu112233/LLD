interface Cloneable<T> {
    clone(): T
}

class Server implements Cloneable<Server> {
    host: string
    port: number
    timeout: number
    ssl: boolean
    headers: Record<string, string>
    retryPolicy: { attempts: number; delay: number }

    constructor(
        host: string = "localhost",
        port: number = 8080,
        timeout: number = 3000,
        ssl: boolean = true,
        headers: Record<string, string> = { "Content-Type": "application/json" },
        retryPolicy = { attempts: 3, delay: 1000 }
    ) 
    {
        this.host = host
        this.port = port
        this.timeout = timeout
        this.ssl = ssl
        this.headers = headers
        this.retryPolicy = retryPolicy
    }

    clone(): Server {
        return new Server(
            this.host,
            this.port,
            this.timeout,
            this.ssl,
            { ...this.headers },                // ✅ deep copy — new object
            { ...this.retryPolicy }             // ✅ deep copy — new object
        )
    }

    describe(): string {
        return `Server(host=${this.host}, port=${this.port}, ssl=${this.ssl})`
    }
}

// Usage
const baseServer = new Server()           // expensive setup once

const apiServer = baseServer.clone()      // cheap — just copies
apiServer.port = 9090

const authServer = baseServer.clone()     // cheap — just copies
authServer.host = "auth.internal"
authServer.ssl = false

console.log(baseServer.describe())   // Server(host=localhost, port=8080, ssl=true)
console.log(apiServer.describe())    // Server(host=localhost, port=9090, ssl=true)
console.log(authServer.describe())   // Server(host=auth.internal, port=8080, ssl=false)
console.log("--------")


class Enemy implements Cloneable<Enemy> {
    private type: string;
    private health: number;
    private speed: number;
    private armored: boolean;
    private weapon: string;

    constructor(type: string, health: number, speed: number, armored: boolean, weapon: string) {
        this.type = type;
        this.health = health;
        this.speed = speed;
        this.armored = armored;
        this.weapon = weapon;
    }

    clone(): Enemy {
        return new Enemy(this.type, this.health, this.speed, this.armored, this.weapon);
    }

    setHealth(health: number): void {
        this.health = health;
    }

    printStats(): void {
        console.log(`${this.type} [Health: ${this.health}, Speed: ${this.speed}, Armored: ${this.armored}, Weapon: ${this.weapon}]`);
    }
}

const enemy1 = new Enemy("Orc", 100, 10, true, "Axe");
const enemy2 = enemy1.clone();
enemy2.setHealth(50);

const enemy3 = enemy1.clone();
enemy3.setHealth(75);
enemy1.printStats();
enemy2.printStats();
enemy3.printStats();