/*
Design Menu System
    Problem: Build a restaurant menu system where individual menu items and submenus share a common interface.
    A MenuItem is a leaf with a name and price. A SubMenu is a composite with a name that contains menu items and other submenus.

Requirements:

    Component interface: Menu with display(indent) and getItemCount() returning an int
    Leaf: MenuItem with a name and price. display() prints the item. getItemCount() returns 1.
    Composite: SubMenu with a name. display() prints its name then delegates to children. getItemCount() sums children's counts.

*/


interface Menu {
    display(indent?: string): void
    getItemCount(): number
}


class MenuItem implements Menu{
    private name:string
    private price:number
    constructor(name:string, price: number){
        this.name=name
        this.price=price
    }
    display(indent?:string):void{
        console.log(`${indent}📄 ${this.name}`)
    }
    getItemCount(): number {
        return 1
    }
}

class SubMenu implements Menu{
    private name:string
    private children:Menu[]

    constructor(name:string){
        this.name=name
        this.children=[]
    }

    addItem(item:Menu):void{
        this.children.push(item)    //Because folder can contain both file and folder that's why filesystemitem is there
    }

    removeItem(item: Menu):void{
        const index = this.children.indexOf(item);
        if (index !== -1) { //Only remove if item exists
            this.children.splice(index, 1);
        }
    }

    getItemCount():number{
        let total=0
        for (const item of this.children) {
            total += item.getItemCount();
        }
        return total;
    }

    display(indent?: string): void {
        console.log(indent + "+ " + this.name + "/");
        for (const item of this.children) {
            item.display(indent + "  ");
        }
    }
}

const burger = new MenuItem("Burger", 5)
const fries = new MenuItem("Fries", 2)
const combo = new SubMenu("Combo")
combo.addItem(burger)
combo.addItem(fries)

combo.display("")
console.log("Total items in combo: " + combo.getItemCount())
