/*
Problem: Build a TemperatureSensor class that collects temperature readings and provides statistical access. 
The sensor should validate that readings fall within a reasonable range and never expose its internal list of readings directly.

Requirements:

Private list of readings
addReading(value): adds a temperature reading, but only if it's between -50 and 150 degrees (inclusive). Reject out-of-range values.
getAverage(): returns the average of all readings, or 0 if no readings exist
getReadingCount(): returns how many readings have been recorded
getReadings(): returns a copy of the readings list (not the original)

*/

class TemperatureSensor{

    private readings:number[]=[]

    addReading(reading:number){
        if(this.isValidReading(reading)){
            this.readings.push(reading)
        }
        else{
            console.log(`Invalid reading: ${reading}. Must be between -50 and 150.`)
        }
    }

    isValidReading(reading:number):boolean{
        if(reading>=-50 && reading<=150){
            return true
        }
        return false;
    }

    getAverage():number{
        let sum:number=0;
        let sz:number=this.readings.length
        for (let index = 0; index < sz; index++) {
            sum  += this.readings[index];
        }
        if(sz==0) return 0
        return sum/sz
    }

    getReadingCount():number{
        return this.readings.length
    }

    getReadings():number[]{
        //below is wrong
        // const arr:number[]=this.readings
        // return arr
        return [...this.readings]
    }
}


const t = new TemperatureSensor()
t.addReading(19)
t.addReading(11)
t.addReading(-300)
console.log(t.getAverage())
console.log(t.getReadings())
console.log(t.getReadingCount())
