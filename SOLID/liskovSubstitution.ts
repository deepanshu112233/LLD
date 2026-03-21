/*
In simpler terms: if a class S extends or implements class T, 
then you should be able to use S anywhere T is expected, without breaking the program's behavior or logic.

LSP is what makes polymorphism truly powerful. You can write generic algorithms that operate on a base type, 
confident that they will work correctly with any current or future subtype.

*/

// Implementing LSP
//S1: Define a Base Class (Instead of having one base class with assumptions about mutability, let’s break responsibilities apart:)

interface IDocument{
    open():void
    getData():string
}

interface Editable extends IDocument{
    save(newData:string):void
}

/*
The Document interface represents read-only access: the ability to open and view data. Editable extends Document, 
adding the ability to save. Anything Editable is automatically a Document too, but not every Document is Editable. 
This clearly defines what each object can do, and prevents clients from assuming editability unless explicitly promised.
*/

//Step 2: Implement EditableDocument and ReadOnlyDocument

class EditableDocument implements Editable {
    private data: string;
    constructor(data:string){
        this.data=data
    }

    open(): void {
        console.log(`Editable Document opened. Data: ${this.preview()}`);
    }

    getData():string{
        return this.data
    }

    save(newData:string):void{
        this.data=newData
    }

    private preview(): string {
        return this.data.substring(0, Math.min(this.data.length, 20)) + "...";
    }
}


class ReadOnlyDocument implements IDocument{
    private data: string;
    constructor(data:string){
        this.data=data
    }
    open(): void {
        console.log(`Read-only Document opened. Data: ${this.data}`);
    }
    getData(): string {
        return this.data;
    }
}

const r:ReadOnlyDocument = new ReadOnlyDocument("This is a read-only document.");
const e:EditableDocument = new EditableDocument("This is an editable document.");

r.open();
e.open();
e.save("Updated editable document.");
console.log(e.getData())