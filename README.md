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
const char* ssid = "ssid of your wifi";
const char* password = "wifi password";
const char* mqtt_server = "Raspberry IP";

In the first two lines you should write your Wifi information. The last one is the IP of your broker which in this case is our Raspberry IP.

If your are using Raspberry PI also, then you can use the following line to get it:
7. hostname -I 

Change the line in your Arduino code and upload it into your ESP-32. Now let's activate our subscribers to receive the information.
8. mosquitto_sub -h "Broker IP or Raspberry IP" -t "test/topic"
In this case, we are subscribing to the "test/topic" topic so we will receive all the information coming with that topic, including the ESP-32 message. 

## Firewall config

Running this process for the first time may not work. So here are some troubleshooting steps to make it work!!
*Activate the port for receiving messages
1. sudo ufw allow 1883/tcp

It's possible that your system doesn't have "ufw" command line. Use the next command to activate it: 
2. sudo apt-get install ufw
3. sudo ufw enable
4. sudo ufw status

Now you can use step number 1 in this process.

## MQTT Troubleshooting

Mosquitto also has some files that must be analyzed to see if the configuration is correct.
1. sudo nano /etc/mosquitto/mosquitto.conf
Make sure the following lines are present and uncommented:

listener 1883
allow_anonymous true

If the lines are not there, you must write them and save the file.

2. sudo systemctl restart mosquitto
3. sudo netstat -tuln | grep 1883
4. sudo ufw allow 1883/tcp

So now you can test your Mosquitto server using the following commands: 
5. mosquitto_sub -h "Broker IP or Raspberry IP" -t "test/topic"
6. mosquitto_pub -h "Broker IP or Raspberry IP" -t "test/topic" -m "Test Message"

## Web Server

Finally, the important part of this project is located within our web server. This was created with NodeJS to host an HTML page where all the information can be seen in real time and from the browser. The server is located in server.js and the topics are configured to receive the information. There are some examples of possible modifiable topics for the desired purpose. This activates the page within the "public" folder, so you must create a folder with that name and place inside the "index.html" file in which the entire frontend of our page is located. You can use the following command line to activate it:

1. sudo node server.js

You can maintain this server opened using pm2 from Node. 

## Credits

If you want to get more information, you can visit the following links:
https://github.com/jiteshsaini/mqtt-demo
https://helloworld.co.in/article/mqtt-raspberry-pi-esp32

