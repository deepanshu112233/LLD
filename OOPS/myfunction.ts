function addTwo(num:number){
    return num+2
}

function signUpUser(name:string,email:string,isPaid:boolean){}

signUpUser("john","john@gmail.com",false)

console.log(addTwo(5))

let loginUser=(name:string,email:string,isPaid:boolean=false)=>{}
loginUser("h","h@gmail.com")


const heros=['thor','ironman','spiderman']


console.log(heros.map((hero):string=>{
    return `hero is ${hero}`
}))

function createUser({namee,isPay}:{namee:string, isPay:boolean}){
    console.log(namee,isPay)
}

createUser({namee:"raja",isPay:false})




// 2. Normal function
function greet(name: string): string {
  return `Hello, ${name}`;
}

// 3. Same as arrow function
const greetArrow= (nm:string):string => {
  return `Hello, ${nm}`;
}

console.log(greet("Deepanshu"));     // Hello, Deepanshu
console.log(greetArrow("Deepanshu"));


export{}