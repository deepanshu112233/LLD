"use strict";
function printpoint(p) {
    console.log(`x coordinates: ${p.x}, y coordinates: ${p.y}`);
}
const mypt = { x: 2, y: 11 };
const arrowpt = (p) => {
    console.log(`yo point ${p.x}, ${p.y} `);
};
printpoint(mypt);
arrowpt(mypt);
const user = {
    name: "Deepanshu",
    show: function () {
        console.log(this.name);
        // setTimeout( function ()  { //gives error so use arrow
        setTimeout(() => {
            console.log(this.name); // `this` is now the window/global object!
        }, 1000);
    }
};
user.show();
