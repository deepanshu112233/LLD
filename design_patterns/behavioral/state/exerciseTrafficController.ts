/*
Design Traffic Light Controller
    Build a traffic light system where the light cycles through three states: Red, Green, and Yellow. 
    Each state has a different duration and transitions to the next state in the cycle. 
    The TrafficLight context should support a change() method that advances to the next state 
    and prints the current light color.
Requirements:
    State interface: 
    TrafficLightState with a method change(context) that prints the current color and transitions to the next state

    Concrete states:
        RedState -- prints "RED light - Stop" and transitions to Green
        GreenState -- prints "GREEN light - Go" and transitions to Yellow
        YellowState -- prints "YELLOW light - Slow down" and transitions to Red
        Context: TrafficLight with setState() and change()
*/
// Step 1: State Interface
interface TrafficLightState{
    change(context: TrafficLight): void
}

class RedState implements TrafficLightState{
    change(context: TrafficLight): void {
        console.log("RED light - Stop")
        context.setState(new GreenState())
    }
}
class GreenState implements TrafficLightState{
    change(context: TrafficLight): void {
        console.log("Green light - GO")
        context.setState(new YellowState())
    }
}
class YellowState implements TrafficLightState{
    change(context: TrafficLight): void {
        console.log("Yellow light - Slow down")
        context.setState(new RedState())
    }
}

class TrafficLight {
    private state: TrafficLightState
    constructor(){
        this.state = new RedState() // initial state
    }
    setState(state: TrafficLightState){
        this.state=state
    }
    change(){
        this.state.change(this) 
        //TrafficLight says: “Hey current state, YOU decide what to do next”
    }

}

const trafficLight = new TrafficLight()
trafficLight.change() // Red → Green
//RedState.change(trafficLight);

trafficLight.change() // Green → Yellow
trafficLight.change() // Yellow → Red

