/*
The Dependency Inversion Principle

High-level modules should not depend on low-level modules. Both should depend on abstractions (e.g., interfaces).
Abstractions should not depend on details. Details (concrete implementations) should depend on abstractions.
In plain English:

Business logic should not rely directly on implementation details.
Instead, both should depend on a common interface or abstraction.

*/

// Applying DIP

// We need an interface that defines what any email sending mechanism should be able to do. 
// This interface becomes the contract that both high-level and low-level modules depend on.
// Step 1: Define the Abstraction (The Contract)

interface EmailClient {
    sendEmail(to: string, subject: string, body: string): void;
}


// Now, our specific email clients (the "details") implement the above interface. 
// Each one knows how to talk to its own email provider, but they all share the same contract.
// Step 2: Concrete Implementations
class GmailClientImpl implements EmailClient {
    sendEmail(to: string, subject: string, body: string): void {
        console.log("Connecting to Gmail SMTP server...");
        console.log(`Sending email via Gmail to: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body: ${body}`);
        // ... actual Gmail API interaction logic ...
        console.log("Gmail email sent successfully!");
    }
}

class OutlookClientImpl implements EmailClient {
    sendEmail(to: string, subject: string, body: string): void {
        console.log("Connecting to Outlook Exchange server...");
        console.log(`Sending email via Outlook to: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body: ${body}`);
        // ... actual Outlook API interaction logic ...
        console.log("Outlook email sent successfully!");
    }
}


// Now comes the key change. Our EmailService will no longer know about GmailClientImpl or OutlookClientImpl. 
// It will only know about the EmailClient interface. The actual implementation gets "injected" into it from the outside.
// This technique is called Dependency Injection (DI), and it is one of the most common ways to achieve DIP in practice.
// Step 3: Update the High-Level Module

class IEmailService {
    private readonly emailClient: EmailClient; // Depends on the INTERFACE!

    // Dependency is "injected" via the constructor
    constructor(emailClient: EmailClient) {
        this.emailClient = emailClient;
    }

    sendWelcomeEmail(userEmail: string, userName: string): void {
        const subject = `Welcome, ${userName}!`;
        const body = "Thanks for signing up to our awesome platform. We're glad to have you!";
        this.emailClient.sendEmail(userEmail, subject, body); // Calls the interface method
    }

    sendPasswordResetEmail(userEmail: string): void {
        const subject = "Your Password Reset Request";
        const body = "Please click the link below to reset your password...";
        this.emailClient.sendEmail(userEmail, subject, body);
    }
}


//Our EmailService is now completely decoupled from the concrete email sending mechanisms. 
// It is flexible, extensible, and easy to test.

console.log("--- Using Gmail ---");
const gmailService = new IEmailService(new GmailClientImpl());
gmailService.sendWelcomeEmail("test@example.com", "Welcome to SOLID principles!");

console.log("--- Using Outlook ---");
const outlookService = new IEmailService(new OutlookClientImpl());
outlookService.sendWelcomeEmail("test@example.com", "Welcome to SOLID principles!");


//Notice the beauty of this design. Switching from Gmail to Outlook requires zero changes to EmailService. 
//You just pass a different implementation at the composition root.
