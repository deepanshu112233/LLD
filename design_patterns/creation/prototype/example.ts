interface EnemyPrototype {
    clone(): EnemyPrototype;
}

class Enemy implements EnemyPrototype {
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