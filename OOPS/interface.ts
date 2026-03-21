type User={
    name: string,
    city: string
}

const user1:User={name:"Rohan",city:"Delhi"} //matches the structure user
console.log(user1)


interface Person{
    name:string,
    age: number
}

interface Person{
    gender:string
} //merged happens


interface Employee extends Person{
    company:string,
    salary:number
}


const p1:Person={
    name:"John",
    age: 23,
    gender:"M"
}

const emp:Employee={
    name:"Adam",
    age: 25,
    gender:"M",
    company:"GL",
    salary:100000
}

console.log(p1)
console.log(emp)


//Interface and class

interface TakePhoto{
    cameraMode: string
    filter: string
    size: number
}

interface Shorts{
    duration:number
    createShorts():void
}


class insta implements TakePhoto{

    constructor(public cameraMode:string,
        public filter:string,
        public size: number
    ){}

}

class youtube implements TakePhoto, Shorts{
    constructor(
        public cameraMode:string,
        public filter:string,
        public size: number,
        public duration:number
    ){}

    createShorts(): void {
        console.log("Shorts added")
    }
}


const i:insta=new insta("portrait","B/W",4.2)


const y:youtube=new youtube("Video","Colored",6.2,5)

console.log(i)
console.log(y)
