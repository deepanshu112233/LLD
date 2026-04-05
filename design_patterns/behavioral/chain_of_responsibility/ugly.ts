//The Problem: Handling HTTP Requests
/*

Before the request reaches the actual business logic, it must pass through several processing steps:

    Authentication: Is the user properly authenticated via a token or session?
    Authorization: Is the authenticated user allowed to perform this action?
    Rate Limiting: Has the user exceeded their allowed number of requests?
    Data Validation: Is the request payload well-formed and valid?

*/

// The Naive Approach
// A typical first attempt might look like this: 
// implement all logic inside a single class using a long chain of if-else statements.

class Request {
   public user: string;
   public userRole: string;
   public requestCount: number;
   public payload: string;

   constructor(user: string, role: string, requestCount: number, payload: string) {
       this.user = user;
       this.userRole = role;
       this.requestCount = requestCount;
       this.payload = payload;
   }
}


class RequestHandler {
   handle(request: Request): void {
       if (!this.authenticate(request)) {
           console.log("Request Rejected: Authentication failed.");
           return;
       }

       if (!this.authorize(request)) {
           console.log("Request Rejected: Authorization failed.");
           return;
       }

       if (!this.rateLimit(request)) {
           console.log("Request Rejected: Rate limit exceeded.");
           return;
       }

       if (!this.validate(request)) {
           console.log("Request Rejected: Invalid payload.");
           return;
       }

       console.log("Request passed all checks. Executing business logic...");
       // Proceed to business logic
   }

   private authenticate(req: Request): boolean {
       return req.user !== null;
   }

   private authorize(req: Request): boolean {
       return req.userRole === "ADMIN";
   }

   private rateLimit(req: Request): boolean {
       return req.requestCount < 100;
   }

   private validate(req: Request): boolean {
       return req.payload !== null && req.payload.trim() !== "";
   }
}


/**
Problems with this approach:
    1. Single Responsibility Violation: The RequestHandler class is doing too much. 
        This makes the class hard to understand and maintain.
    2. Tight Coupling: All the processing logic is tightly coupled within the RequestHandler. 
        If we want to change the authentication mechanism, we have to modify the RequestHandler class, 
        which can lead to bugs in other parts of the code.
    
        3. Poor Extensibility: Adding new processing steps (e.g., logging, caching) would require modifying the existing code, 

    4. Difficult Testing: Testing individual processing steps is difficult 
        because they are all intertwined within the same class. 
        You would need to set up complex scenarios to test each step in isolation.
*/