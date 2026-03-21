"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addTwo(num) {
    return num + 2;
}
function signUpUser(name, email, isPaid) { }
signUpUser("john", "john@gmail.com", false);
console.log(addTwo(5));
let loginUser = (name, email, isPaid = false) => { };
loginUser("h", "h@gmail.com");
const heros = ['thor', 'ironman', 'spiderman'];
console.log(heros.map((hero) => {
    return `hero is ${hero}`;
}));
function createUser({ namee, isPay }) {
    console.log(namee, isPay);
}
createUser({ namee: "raja", isPay: false });
// 2. Normal function
function greet(name) {
    return `Hello, ${name}`;
}
// 3. Same as arrow function
const greetArrow = (nm) => {
    return `Hello, ${nm}`;
};
console.log(greet("Deepanshu")); // Hello, Deepanshu
console.log(greetArrow("Deepanshu"));
