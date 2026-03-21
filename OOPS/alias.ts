type point={
    x:number,
    y:number
}

function printpoint(p:point):void{
    console.log(`x coordinates: ${p.x}, y coordinates: ${p.y}`)
}

const mypt:point={x:2,y:11}

const arrowpt =(p:point):void=>{
    console.log(`yo point ${p.x}, ${p.y} `)
}

printpoint(mypt);
arrowpt(mypt)

const user = {
  name: "Deepanshu",
  show: function () {
    console.log(this.name);
    // setTimeout( function ()  { //gives error so use arrow
    setTimeout( () => {
      console.log(this.name); // `this` is now the window/global object!
    }, 1000);
  }
};

user.show();
