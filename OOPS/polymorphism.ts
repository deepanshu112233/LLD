// Base class
class Job {

    constructor(public title: string) {
    this.title = title;
  }

  describe(): void {
    console.log(`This is a generic job titled ${this.title}.`);
  }
}

// Subclass: Engineer
class Engineer extends Job {
  constructor(title: string) {
    super(title);
  }

  describe(): void {
    console.log(`${this.title} engineers build and design systems.`);
  }
}

// Subclass: Doctor
class Doctor extends Job {
  constructor(title: string) {
    super(title);
  }

  describe(): void {
    console.log(`${this.title} doctors treat patients.`);
  }
}

// Polymorphism in action
const jobs: Job[] = [
  new Engineer("Software"),
  new Doctor("Pediatrician"),
  new Job("Freelancer"),
];

for (const job of jobs) {
  job.describe(); // Calls the appropriate method based on actual class
}


//OR
// for (let i = 0; i < jobs.length; i++) {
//   jobs[i].describe();
// }

//OR
// jobs.forEach((job) => job.describe());