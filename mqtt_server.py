import paho.mqtt.client as mqtt

# Configuración del broker MQTT
broker = "localhost"  # Cambia esto a la dirección IP del broker si no está en la misma máquina
port = 1883

# Diccionario para almacenar la información recibida
sensor_data = {
    "car/sensors/battery": 0,
    "car/sensors/speed": 0,
    "car/sensors/radiation": 0,
    "test/message": ""
}

# Callback cuando se conecta al broker MQTT
def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")
    # Suscribirse a los topics
    client.subscribe("car/sensors/#")
    client.subscribe("test/message")

# Callback cuando se recibe un mensaje
def on_message(client, userdata, msg):
    global sensor_data
    topic = msg.topic
    payload = msg.payload.decode()
    print(f"Received message from {topic}: {payload}")

    # Actualizar el diccionario con la nueva información
    if topic in sensor_data:
        sensor_data[topic] = payload

# Crear un cliente MQTT
client = mqtt.Client()

# Asignar callbacks
client.on_connect = on_connect
client.on_message = on_message

# Conectar al broker MQTT
client.connect(broker, port, 60)

# Iniciar el loop del cliente
client.loop_start()

# Mantener el servidor en funcionamiento
try:
    while True:
        pass
except KeyboardInterrupt:
    print("Exiting...")
    client.loop_stop()
    client.disconnect()
