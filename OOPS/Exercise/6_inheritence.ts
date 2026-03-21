/*
Problem: The system must support multiple types of notifications such as:
    SMS notifications
    Email notifications

All notifications share some common behavior, but each type has its own specific implementation details.

Requirements
1️⃣ Base Class: Notification

Create a base class called Notification that:
Has a protected property:
    recipient: string
Has a constructor to initialize the recipient
Has a public method:
    send(message: string): void (to be overridden by child classes)
Has a public method:
    logNotification(message: string): void
    This prints:
    "Notification sent to <recipient>"

2️⃣ SMS Notification
Create a class SMSNotification that extends Notification.
Specific requirements:
Must store:
    phoneNumber
    Override send(message: string)
    Simulate sending SMS by printing:
    Sending SMS to <phoneNumber>: <message>

3️⃣ Email Notification

Create a class EmailNotification that extends Notification.
Specific requirements:
Must store:
    emailAddress
    subject

Override send(message: string)

Simulate sending Email by printing:

Sending Email to <emailAddress>
Subject: <subject>
Body: <message>

*/

class Notifications{
    protected recipient:string
    constructor(name:string){
        this.recipient=name
    } 

    send(message:string){
        console.log(`Message:${message}`)
    }

    logNotification():void{
        console.log("Notification sent to: ",this.recipient)
    }

}

class Emailnotification extends Notifications{
    private emailAddress:string
    private subject:string

    constructor(emailAddress:string,subject:string,recipient:string){
        super(recipient)
        this.emailAddress=emailAddress
        this.subject=subject
    }

    send(message:string){
        console.log("Email message: ",message)
    }

    logNotification(): void {
        console.log(`Sending Email to ${this.emailAddress}.\nSubject: ${this.subject}.`)
    }
}


class Smsnotification extends Notifications{
    private phone:string
    

    constructor(phone:string,recipient:string){
        super(recipient)
        this.phone=phone
        
    }

    send(message:string):void{
        console.log("SMS message: ",message)
    }

    logNotification(): void {
        console.log(`Message send to ${this.phone}. Name: ${this.recipient}`)
    }
}


const sms:Smsnotification=new Smsnotification('2312',"John")
sms.send('Kyabe')
sms.logNotification()

console.log('-----------------------------')
const email:Emailnotification=new Emailnotification("john@gmail.com","Subject Line","John")
email.send("Hello John!")
email.logNotification()


const notifications: Notifications[] = [
    new Smsnotification('2312', "John"),
    new Emailnotification("john@gmail.com", "Subject", "John")
];

for (const n of notifications) {
    n.send("Hello");
    n.logNotification()
}