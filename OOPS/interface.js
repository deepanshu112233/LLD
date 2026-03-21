"use strict";
const user1 = { name: "Rohan", city: "Delhi" }; //matches the structure user
console.log(user1);
const p1 = {
    name: "John",
    age: 23,
    gender: "M"
};
const emp = {
    name: "Adam",
    age: 25,
    gender: "M",
    company: "GL",
    salary: 100000
};
console.log(p1);
console.log(emp);
class insta {
    constructor(cameraMode, filter, size) {
        this.cameraMode = cameraMode;
        this.filter = filter;
        this.size = size;
    }
}
class youtube {
    constructor(cameraMode, filter, size, duration) {
        this.cameraMode = cameraMode;
        this.filter = filter;
        this.size = size;
        this.duration = duration;
    }
    createShorts() {
        console.log("Shorts added");
    }
}
const i = new insta("portrait", "B/W", 4.2);
const y = new youtube("Video", "Colored", 6.2, 5);
console.log(i);
console.log(y);
