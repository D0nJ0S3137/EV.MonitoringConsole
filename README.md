# MQTT SERVER FOR THE MAIN COMPUTER OF AN ELECTRIC CAR

The following project is a web server for visualizing information from an electric car. This project uses an MQTT server that allows the reception of information from different sources simultaneously. In this case, it has been created to receive sensor data connected to Arduino ESP-32 modules. The project has various functionalities that can be enhanced through more exhaustive development, but the files found here are fundamental to the study and development of this project and future ones related to an electric car.

## Instalation

As we are using a Raspberry Pi as our MQTT broker, all the installation codes are written for Linux. The main server will be hosted in Mosquitto. The following codes are related to our MQTT server:

1. sudo apt-get install mosquitto mosquitto-clients
2. mosquitto_sub --help
   mosquitto_pub --help
Number 2 allows you to see if the Mosquitto clients have been installed correctly.
3. sudo systemctl start mosquitto
   sudo systemctl enable mosquitto
Number 3 allows to activate the Mosquitto server in Raspberry broker.
4. sudo systemctl status mosquitto

If you want to test that everything is working great, activate 2 command line consoles. 
5. mosquitto_sub -h localhost -t "test/topic" (1 command line)
6. mosquitto_pub -h localhost -t "test/topic" -m "Hello, MQTT!" (2 command line)

Now it's time to test a ESP-32 connected to our server. First, you have to change the next parameters in the arduino code:




## Uso

Explicación sobre cómo utilizar el proyecto una vez instalado. Incluye ejemplos si es necesario.

## Contribución

Indicaciones sobre cómo contribuir al proyecto. Puedes incluir pautas de estilo, información sobre ramas y cómo enviar solicitudes de extracción.

## Créditos

Agradecimientos a quienes han contribuido al proyecto.

## Licencia

Especifica la licencia bajo la cual se distribuye el proyecto.

