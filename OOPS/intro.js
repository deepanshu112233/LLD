"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let greetings = "hi, Deep";
greetings = greetings.toUpperCase();
console.log(greetings);
let userId = 34645;
// let userId = 34645; // typescript is smart enough to detect number 
let isLoggedin = false;
//any 
let hero;
function getHero() {
    return "thor";
}
hero = getHero();
const nums = [2, 4, 3, 5];
//map returns new array, Foreach is loops through eac element(can't skip like in normal loop)
//reduce return single value
nums.forEach(vals => {
    console.log(`value : ${vals}`);
});
const doubled = nums.map((e) => e * 2);
console.log("doubled values:", doubled);
const sum = nums.reduce((acc, init) => acc + init, 0);
console.log("Nums array sum:", sum);
const mul = nums.reduce((acc, init) => acc * init, 1);
console.log("Nums array product:", mul);
