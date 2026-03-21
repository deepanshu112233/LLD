/*
- A class should do one thing and do it well.

Why Does SRP Matter?
    - It makes your code easier to understand and maintain.
    - It reduces the chances of bugs because each class has a single responsibility.
    - It makes it easier to test your code because you can test each class in isolation.
    - Scales better without breaking workflows.
    
*/

class User {
    private username: string;
    private email: string;
    private password: string;

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    getUsername(): string { return this.username; }
    getEmail(): string { return this.email; }
    getPassword(): string { return this.password; }
}

//This class now does one thing: represent a user. It does not hash passwords, store itself, or send emails. That is the job of others.

// Responsibility 1: Password Hashing 
class PasswordHashing{
    validateHashind(password:string):string{
        if(password.length<8) throw new Error("Password must be at least 8 characters");
        return "bcrypt_hashed_"+password
    }
}
// If the hashing algorithm changes (say, from bcrypt to argon2), we only update this class.


//Responsibility 2: Persistence to Database (resp to talk with DB)
class UserDB{
    save(user:User){
        console.log(`Saving user ${user.getUsername()} to database...`)
    }
}

//Responsibility 3: Auth Token Generation
class AuthTokenService {
    generateToken(user: User): string {
        // Create JWT payload with user claims
        const payload = `{"username":"${user.getUsername()}","email":"${user.getEmail()}"}`;
        // Sign with secret key (simplified)
        return `abcdef.${payload}.signature`;
    }
}
//The auth logic is completely isolated from password hashing, database operations, and email delivery.


class EmailService{
    sendWelcomeEmail(arg0: string, arg1: string) {
        throw new Error("Method not implemented.");
    }
    sendEmail(user:User){
        console.log(`Sending welcome email to: ${user.getEmail()}`);
        console.log(`Welcome to our platform, ${user.getUsername()}!`);
    }
}
