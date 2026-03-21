/*
They define what a component should do, not how it should do it.
Here are their most important characteristics:

a) Defines Behavior Without Dictating Implementation
An interface only declares what operations are expected. It doesn’t define how they are carried out.

This gives freedom to implementers to provide their own version of the logic, while still honoring the same contract.

b) Enables Polymorphism
Different classes can implement the same interface in different ways.This allows your code to work with multiple implementations interchangeably.

c) Promotes Decoupling
Code that depends on interfaces is insulated from changes in the concrete classes that implement them.
*/

/*
Design Log Formatter Class
Problem: Build a logging system where the format of log messages is configurable. A Logger class writes log messages, 
but the format (plain text vs. JSON) is determined by an injected Formatter interface.

Requirements:

Formatter interface with a format(message) method that takes a string and returns a formatted string
PlainFormatter: returns the message as-is (e.g., "Server started on port 8080")
JsonFormatter: returns the message wrapped in JSON (e.g., {"log": "Server started on port 8080"})
Logger class takes a Formatter in its constructor and has a log(message) method that formats the message, then prints it

*/

//HOW to proceed?
//s1: Think

//s2: Any formatter must convert a message string into a formatted string [respsonsible for expandability]

interface formatter{
    format(message:string):string
}

//s3: create pain format and json format
/*
PlainFormatter:
    - Has no fields
    - Has no dependencies
    - Needs no setup
So TypeScript automatically provides: constructor() {}
Writing it manually adds zero value.
Constructor is for basically:
    Injecting required dependencies
    Initializing required state
*/
class PlainFormatter implements formatter{
    format(message:string):string{
        return message      
    }
}

class CapitalizeFormatter implements formatter{
    format(message:string):string{
        return message.toUpperCase()
    }
}

class JsonFormatter implements formatter{
    format(message:string):string{
        return JSON.stringify({log:message})
    }
}

//s4: create log class
/*Expandability depends on:
    Abstractions
    Loose coupling
    Separation of responsibilities
very important line making my class expandable (but it does not mean if i have no contructor then its not expandable) 
*/
class Logger{
    constructor(private formatter: formatter) {}
    //"You must give me a Formatter to create Logger."

    log(message:string): void{
        const formatMessage=this.formatter.format(message)
        console.log(formatMessage)
    }
}

const plainLogger = new Logger(new PlainFormatter());
plainLogger.log("Server started on port 8080");
plainLogger.log("A");
plainLogger.log("B");

const jsonLogger = new Logger(new JsonFormatter())
jsonLogger.log("Server started on port 8080")

const capitalLogger = new Logger(new CapitalizeFormatter())
capitalLogger.log("Server started on port 8080")



class Logger2{
    //without constructor
    log2(message:string,formatter:formatter): void{
        const formatMessage=formatter.format(message)
        console.log(formatMessage)
    }
}

//i need to declare every time formater, REDUNDANT
// logger2.log("Hello", new JsonFormatter());
// logger.log("Hi", new PlainFormatter());
const logger2 = new Logger2()
logger2.log2("Hello", new JsonFormatter());
logger2.log2("Hi", new PlainFormatter());
logger2.log2("A", new PlainFormatter());
logger2.log2("B", new PlainFormatter());
