class Request {
   public user: string | null;
   public userRole: string;
   public requestCount: number;
   public payload: string;

   constructor(user: string | null, role: string, requestCount: number, payload: string) {
       this.user = user;
       this.userRole = role;
       this.requestCount = requestCount;
       this.payload = payload;
   }
}



// Step 1: Define the Handler interface
interface RequestHandler {
    setNext(handler: RequestHandler ): void 
    handle(request: Request): void
}

// Step 2: Create the Abstract Base Handler
//To avoid duplicating the setNext() and forwarding logic in every handler, 
// we define an abstract base class with reusable functionality. 
// This way, concrete handlers only need to implement their specific check.

abstract class BaseHandler implements RequestHandler {
    private next: RequestHandler | null = null
    
    setNext(next: RequestHandler): void {
        this.next = next;
    }

    protected forward(request: Request): void {
        if (this.next !== null) {
            this.next.handle(request);
        }
    }

    abstract handle(request: Request): void;
}


// Step 3: Create Concrete Handlers
//Each handler implements one responsibility. They extend BaseHandler, implement handle(Request), 
//and determine whether to continue the chain or short-circuit it.


class AuthHandler extends BaseHandler {
    handle(request: Request): void {
        if (request.user === null) {
            console.log("AuthHandler: User not authenticated.");
            return;
        }
        console.log("AuthHandler: Authenticated.");
        this.forward(request);
    }
}

class AuthorizationHandler extends BaseHandler {
    handle(request: Request): void {
        if (request.userRole !== "ADMIN") {
            console.log("AuthorizationHandler: Access denied.");
            return;
        }
        console.log("AuthorizationHandler: Authorized.");
        this.forward(request);
    }
}

class RateLimitHandler extends BaseHandler {
    handle(request: Request): void {
        if (request.requestCount >= 100) {
            console.log("RateLimitHandler: Rate limit exceeded.");
            return;
        }
        console.log("RateLimitHandler: Within rate limit.");
        this.forward(request);
    }
}

class ValidationHandler extends BaseHandler {
    handle(request: Request): void {
        if (request.payload === null || request.payload.trim() === "") {
            console.log("ValidationHandler: Invalid payload.");
            return;
        }
        console.log("ValidationHandler: Payload valid.");
        this.forward(request);
    }
}

class BusinessLogicHandler extends BaseHandler {
    handle(request: Request): void {
        console.log(`BusinessLogicHandler: Processing request for ${request.user}...`);
    }
}


// Create handlers
const auth: RequestHandler = new AuthHandler();
const authorization: RequestHandler = new AuthorizationHandler();
const rateLimit: RequestHandler = new RateLimitHandler();
const validation: RequestHandler = new ValidationHandler();
const businessLogic: RequestHandler = new BusinessLogicHandler();

// Build the chain
auth.setNext(authorization);
authorization.setNext(rateLimit);
rateLimit.setNext(validation);
validation.setNext(businessLogic);

// Send a request through the chain
const request = new Request("john", "ADMIN", 10, "{ \"data\": \"valid\" }");
auth.handle(request);

console.log("\n--- Trying an invalid request ---");
const badRequest = new Request(null, "USER", 150, "");
auth.handle(badRequest);