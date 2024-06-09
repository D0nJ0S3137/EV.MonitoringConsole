const express = require('express');
const mqtt = require('mqtt');
const path = require('path');

const app = express();
const port = 3000;

// Configuración del broker MQTT
const brokerUrl = 'mqtt://192.168.0.85';
const topics = {
    battery: 'car/sensors/battery',
    speed: 'car/sensors/speed',
    radiation: 'car/sensors/radiation',
    message: 'test/topic'
};

let sensorData = {
    battery: 0,
    speed: 0,
    radiation: 0,
    message: ""
};

// Conectar al broker MQTT
const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    Object.values(topics).forEach(topic => {
        client.subscribe(topic, (err) => {
            if (!err) {
                console.log(`Subscribed to topic: ${topic}`);
            } else {
                console.error(`Failed to subscribe to topic: ${topic}`, err);
            }
        });
    });
});

client.on('message', (topic, message) => {
    const data = message.toString();
    console.log(`Received message from ${topic}: ${data}`);
    if (topic === topics.battery) {
        sensorData.battery = parseFloat(data);
    } else if (topic === topics.speed) {
        sensorData.speed = parseFloat(data);
    } else if (topic === topics.radiation) {
        sensorData.radiation = parseFloat(data);
    } else if (topic === topics.message) {
        sensorData.message = data;
    }
    console.log('Updated sensorData:', sensorData);
});

// Configurar servidor Express para servir archivos estáticos y manejar rutas
app.use(express.static(path.join(__dirname, 'public')));

app.get('/sensors', (req, res) => {
    console.log('Sending sensor data to client:', sensorData);
    res.json(sensorData);
});

app.listen(port, () => {
    console.log(`Server running at http://192.168.0.85:${port}`);
});
