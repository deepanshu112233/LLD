// Abstract class - defines what every admission must follow
/*
An abstract class is a class that cannot be directly instantiated (you can't create an object from it). 
It serves as a blueprint or base class for other classes, providing a structure and potentially some 
implemented methods that derived classes must adhere to or can inherit.
*/

// How Abstraction Is Achieved
// Using Abstract Classes: An abstract class can contain both implemented methods (with code) and abstract methods (without code).
// The abstract methods must be implemented by any non-abstract class that inherits from the abstract class. 
// This allows for a common interface while still enforcing specific behavior in derived classes.
abstract class Admission {
  constructor(protected studentName: string) {}

  // common method with implementation
  apply(): void {
    console.log(`${this.studentName} applied for admission.`);
  }

  // abstract methods to be implemented differently by each student type
  abstract verifyDocuments(): void;
  abstract approve(): void;

  // common template method
  processAdmission(): void {
    this.apply();
    this.verifyDocuments();  // must be defined by child class
    this.approve();          // must be defined by child class
    console.log(`Admission process completed for ${this.studentName}.\n`);
  }
}

class DomesticStudent extends Admission{
    verifyDocuments(): void {
        console.log("Verifying Aadhaar, marksheets...");   
    }

    approve(): void {
        console.log("Approved by Indian admission department.");
    }
}

class ForeignStudent extends Admission{
    verifyDocuments(): void {
        console.log("Verifying Visa, passport...")
    }

    approve(): void {
        console.log("Approved by Foreign Agency")
    }
}


const s1:DomesticStudent=new DomesticStudent("Raja")
s1.processAdmission()

const s2:ForeignStudent=new ForeignStudent("John")
s2.processAdmission()


//2. Interfaces as abstraction
/*
An interface is a contract that defines the structure of an object, specifying what properties and methods it should have. 
It does not contain any implementation details. Classes that implement an interface must provide the implementation for all of its members.
*/

interface Exportable{
    export():string
}

class CSVExporter implements Exportable{

    export(): string {
        return ("CSV returned")
    }
}

class XMLExporter implements Exportable{
    export(): string {
        return ("XML returned")
    }
}

const csv:CSVExporter=new CSVExporter()
console.log(csv.export())

const xml:XMLExporter=new XMLExporter()
console.log(xml.export())



//3. Using public api as abstraction
/*
In this approach, a class provides a public API (a set of public methods) that abstracts away the internal workings of the class. 
Users of the class interact with it through this API without needing to understand the underlying implementation details.
*/

class PaymentService{
    private balance:number
    constructor(balance:number){
        this.balance=balance
    }

    //public api
    pay(amount:number):void{
        if(this.isValid(amount)){
            console.log('Payment Done')
            this.generateReceipt(amount)
            return;
        }
        else{
            console.log('Insufficient Balance')
            return;
        }    
    }


    //private implementation
    private isValid(amount:number):boolean{
        if(amount<=this.balance){
            return true
        }
        return false
    }

    private generateReceipt(amount:number){
        console.log(`Amount: ${amount} deducted.\nAvailable Balance: ${this.balance-amount}`)
    }
}


const money:PaymentService=new PaymentService(100)
money.pay(10)
money.pay(11)
money.pay(111)



