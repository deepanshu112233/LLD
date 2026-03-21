


// Segregated interfaces - each with a single capability
interface Printable {
    print(document: string): void;
}

interface Scannable {
    scan(document: string): void;
}

interface Faxable {
    fax(document: string, number: string): void;
}

interface Stapleable {
    staple(document: string): void;
}

// BasicPrinter only implements Printable
class BasicPrinter implements Printable {
    print(document: string): void {
        console.log(`BasicPrinter -> Printing: ${document}`);
    }
}

// OfficePrinter implements three interfaces
class OfficePrinter implements Printable, Scannable, Faxable {
    print(document: string): void {
        console.log(`OfficePrinter -> Printing: ${document}`);
    }

    scan(document: string): void {
        console.log(`OfficePrinter -> Scanning: ${document}`);
    }

    fax(document: string, number: string): void {
        console.log(`OfficePrinter -> Faxing: ${document} to ${number}`);
    }
}

// FullDevice implements all four interfaces
class FullDevice implements Printable, Scannable, Faxable, Stapleable {
    print(document: string): void {
        console.log(`FullDevice -> Printing: ${document}`);
    }

    scan(document: string): void {
        console.log(`FullDevice -> Scanning: ${document}`);
    }

    fax(document: string, number: string): void {
        console.log(`FullDevice -> Faxing: ${document} to ${number}`);
    }

    staple(document: string): void {
        console.log(`FullDevice -> Stapling: ${document}`);
    }
}

// Usage
const basic = new BasicPrinter();
basic.print("report.pdf");

const office = new OfficePrinter();
office.print("memo.pdf");
office.scan("memo.pdf");
office.fax("memo.pdf", "555-1234");

const full = new FullDevice();
full.print("contract.pdf");
full.scan("contract.pdf");
full.fax("contract.pdf", "555-5678");
full.staple("contract.pdf");