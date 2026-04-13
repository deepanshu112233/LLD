/*
Design Temperature Converter Adapter
Problem: You have a Thermometer interface that returns temperature in Celsius. 
A third-party weather sensor library provides readings in Fahrenheit through a different interface. 
Write an adapter so your application can use the Fahrenheit sensor as if it were a Celsius thermometer.

Requirements:

Target interface: Thermometer with getTemperature() returning Celsius (double)
Adaptee: FahrenheitSensor with readFahrenheit() returning Fahrenheit (double)
Adapter: converts Fahrenheit to Celsius using (F - 32) * 5/9

*/



interface Thermometer {
    getTemperature(): number;  // Returns Celsius
}

class CelsiusSensor implements Thermometer {
    getTemperature(): number { return 25.0; }
}

class FahrenheitSensor {
    readFahrenheit(): number { return 98.6; }
}

class FahrenheitSensorAdapter implements Thermometer {
    // TODO: Declare a private FahrenheitSensor field
    private sensor: FahrenheitSensor;

    constructor(sensor: FahrenheitSensor) {
        // TODO: Store the sensor reference
        this.sensor = sensor;
    }

    getTemperature(): number {
        // TODO: Read the Fahrenheit value from the sensor
        const fahrenheit = this.sensor.readFahrenheit();
        // TODO: Convert Fahrenheit to Celsius using (F - 32) * 5.0 / 9.0
        return (fahrenheit - 32) * 5.0 / 9.0;
    }
}

const celsius: Thermometer = new CelsiusSensor();
console.log(`Celsius sensor: ${celsius.getTemperature().toFixed(1)} C`);

const sensor = new FahrenheitSensor();
const adapted: Thermometer = new FahrenheitSensorAdapter(sensor);
console.log(`Fahrenheit sensor (adapted): ${adapted.getTemperature().toFixed(1)} C`);