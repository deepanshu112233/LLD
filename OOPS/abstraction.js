"use strict";
// Abstract class - defines what every admission must follow
/*
An abstract class is a class that cannot be directly instantiated (you can't create an object from it).
It serves as a blueprint or base class for other classes, providing a structure and potentially some
implemented methods that derived classes must adhere to or can inherit.
*/
class Admission {
    constructor(studentName) {
        this.studentName = studentName;
    }
    // common method with implementation
    apply() {
        console.log(`${this.studentName} applied for admission.`);
    }
    // common template method
    processAdmission() {
        this.apply();
        this.verifyDocuments(); // must be defined by child class
        this.approve(); // must be defined by child class
        console.log(`Admission process completed for ${this.studentName}.\n`);
    }
}
class DomesticStudent extends Admission {
    verifyDocuments() {
        console.log("Verifying Aadhaar, marksheets...");
    }
    approve() {
        console.log("Approved by Indian admission department.");
    }
}
class ForeignStudent extends Admission {
    verifyDocuments() {
        console.log("Verifying Visa, passport...");
    }
    approve() {
        console.log("Approved by Foreign Agency");
    }
}
const s1 = new DomesticStudent("Raja");
s1.processAdmission();
const s2 = new ForeignStudent("John");
s2.processAdmission();
