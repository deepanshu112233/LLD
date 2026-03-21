"use strict";
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
class PlainFormatter {
    format(message) {
        return message;
    }
}
class CapitalizeFormatter {
    format(message) {
        return message.toUpperCase();
    }
}
class JsonFormatter {
    format(message) {
        return JSON.stringify({ log: message });
    }
}
//s4: create log class
/*Expandability depends on:
    Abstractions
    Loose coupling
    Separation of responsibilities
very important line making my class expandable (but it does not mean if i have no contructor then its not expandable)
*/
class Logger {
    constructor(formatter) {
        this.formatter = formatter;
    }
    //"You must give me a Formatter to create Logger."
    log(message) {
        const formatMessage = this.formatter.format(message);
        console.log(formatMessage);
    }
}
const plainLogger = new Logger(new PlainFormatter());
plainLogger.log("Server started on port 8080");
plainLogger.log("A");
plainLogger.log("B");
const jsonLogger = new Logger(new JsonFormatter());
jsonLogger.log("Server started on port 8080");
const capitalLogger = new Logger(new CapitalizeFormatter());
capitalLogger.log("Server started on port 8080");
class Logger2 {
    //without constructor
    log2(message, formatter) {
        const formatMessage = formatter.format(message);
        console.log(formatMessage);
    }
}
//i need to declare every time formater, REDUNDANT
// logger2.log("Hello", new JsonFormatter());
// logger.log("Hi", new PlainFormatter());
const logger2 = new Logger2();
logger2.log2("Hello", new JsonFormatter());
logger2.log2("Hi", new PlainFormatter());
logger2.log2("A", new PlainFormatter());
logger2.log2("B", new PlainFormatter());
