//Correct implementation of composite pattern for file system


// Step 1: Common Interface
interface FileSystemItem {
    getName(): string
    getSize(): number
    delete(): void
    display(indent?: string): void
}

//Step 2: Create leaf class - A file is a leaf node. Implements Component interface directly, Leaf (individual object, no children)

class File implements FileSystemItem{
    private name:string
    private size:number
    
    constructor(name:string, size: number){
        this.name=name
        this.size=size
    }

    getName(): string {
        return this.name
    }
    getSize(): number {
        return this.size
    }
    display(indent?: string): void {
        console.log(`${indent}📄 ${this.name} (${this.size}KB)`)
    }
    delete(): void {
        console.log("Deleting file: " + this.name);
    }
}

//Step 3: Create Composite (group that holds children, Folder is composite), It also provides addItem() and removeItem() methods for managing children.

class Folder implements FileSystemItem{
    private name:string
    private children:FileSystemItem[]=[]

    constructor(name:string){
        this.name=name
    }

    addItem(item:FileSystemItem):void{
        this.children.push(item)    //Because folder can contain both file and folder that's why filesystemitem is there
    }

    removeItem(item: FileSystemItem):void{
        const index = this.children.indexOf(item);
        if (index !== -1) { //Only remove if item exists
            this.children.splice(index, 1);
        }
    }

    getName(): string {
        return this.name
    }

    getSize():number{
        let total=0
        for (const item of this.children) {
            total += item.getSize();
        }
        return total;
    }

    display(indent?: string): void {
        console.log(indent + "+ " + this.name + "/");
        for (const item of this.children) {
            item.display(indent + "  ");
        }
    }

    delete(): void {
        console.log("Deleting folder: " + this.name);
        for (const item of this.children) {
            item.delete();   //Recursively delete all children
        }
    }
}

const file1: FileSystemItem = new File("readme.txt", 5);
const file2: FileSystemItem = new File("photo.jpg", 1500);
const file3: FileSystemItem = new File("data.csv", 300);

const documents = new Folder("Documents");
documents.addItem(file1);
documents.addItem(file3);

const pictures = new Folder("Pictures");
pictures.addItem(file2);

const home = new Folder("Home");
home.addItem(documents);
home.addItem(pictures);

console.log("---- File Structure ----");
home.display("");

console.log("\nTotal Size: " + home.getSize() + " KB");

console.log("\n---- Deleting All ----");
home.delete();