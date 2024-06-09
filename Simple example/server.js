const express = require('express');
const mqtt = require('mqtt');
const path = require('path');

const app = express();
const port = 3000;

// Configuración del broker MQTT
const brokerUrl = 'mqtt://192.168.0.85';
const topic = 'test/topic';

let mqttMessage = '';

// Conectar al broker MQTT
const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe(topic, (err) => {
        if (!err) {
            console.log(`Subscribed to topic: ${topic}`);
        }
    });
});

client.on('message', (topic, message) => {
    mqttMessage = message.toString();
    console.log(`Received message: ${mqttMessage}`);
});

// Configurar servidor Express para servir archivos estáticos y manejar rutas
app.use(express.static(path.join(__dirname, 'public')));

app.get('/mqtt', (req, res) => {
    res.send(mqttMessage);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
