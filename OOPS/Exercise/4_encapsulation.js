"use strict";
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
class TemperatureSensor {
    constructor() {
        this.readings = [];
    }
    addReading(reading) {
        if (this.isValidReading(reading)) {
            this.readings.push(reading);
        }
        else {
            console.log(`Invalid reading: ${reading}. Must be between -50 and 150.`);
        }
    }
    isValidReading(reading) {
        if (reading >= -50 && reading <= 150) {
            return true;
        }
        return false;
    }
    getAverage() {
        let sum = 0;
        let sz = this.readings.length;
        for (let index = 0; index < sz; index++) {
            sum += this.readings[index];
        }
        if (sz == 0)
            return 0;
        return sum / sz;
    }
    getReadingCount() {
        return this.readings.length;
    }
    getReadings() {
        const arr = this.readings;
        return arr;
    }
}
const t = new TemperatureSensor();
t.addReading(19);
t.addReading(11);
t.addReading(-300);
console.log(t.getAverage());
console.log(t.getReadings());
console.log(t.getReadingCount());
