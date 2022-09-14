#!/usr/bin/env python3
import random
import threading
import time
from wsgiref.simple_server import make_server
import falcon
import requests
import serial

import RPi.GPIO as GPIO
from time import sleep
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(16, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(18, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(22, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(24, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(32, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(36, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(38, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(40, GPIO.OUT, initial=GPIO.LOW)


IP_ADDR_FE="192.168.0.234"

ser = serial.Serial(
    port='/dev/ttyS0',
    baudrate=115200,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
    bytesize=serial.EIGHTBITS,
    timeout=1
    )

def randomSensorData(min, max):
    n = random.randint(min, max)
    return n



class helpPage:

    def on_get(self, req, resp):
        print(threading.current_thread().name)
        resp.content_type = falcon.MEDIA_TEXT
        resp.text = ('Hello! Following endpoints are avalialbe:\n\n' +
                     req.url + '<path>\n\n'
                               'Available paths:\n'
                               '    /uart, /second\n'
                               'Available POST req Body keys:\n'
                               '   "message"'
                     )


class SendUart:

    def on_post(self, req, resp):
        message = req.media.get("button")
        #print(message)

        joystickInfo = req.media.get("data")
        #print(joystickInfo)

        if(message=="ls"):
            GPIO.output(16, GPIO.HIGH)
            GPIO.output(18, GPIO.LOW)
            GPIO.output(22, GPIO.LOW)
            GPIO.output(24, GPIO.LOW)
            GPIO.output(32, GPIO.LOW)
            GPIO.output(36, GPIO.LOW)
            GPIO.output(38, GPIO.LOW)
            GPIO.output(40, GPIO.LOW)
            message = message +","+str(round(joystickInfo[0],2))+","+str(round(joystickInfo[1],2))
        elif(message=="rs"):
            GPIO.output(16, GPIO.LOW)
            GPIO.output(18, GPIO.HIGH)
            GPIO.output(22, GPIO.LOW)
            GPIO.output(24, GPIO.LOW)
            GPIO.output(32, GPIO.LOW)
            GPIO.output(36, GPIO.LOW)
            GPIO.output(38, GPIO.LOW)
            GPIO.output(40, GPIO.LOW)
            message = message +","+str(round(joystickInfo[2],2))+","+str(round(joystickInfo[3],2))
        elif(message=="l2"):
            GPIO.output(16, GPIO.LOW)
            GPIO.output(18, GPIO.LOW)
            GPIO.output(22, GPIO.HIGH)
            GPIO.output(24, GPIO.LOW)
            GPIO.output(32, GPIO.LOW)
            GPIO.output(36, GPIO.LOW)
            GPIO.output(38, GPIO.LOW)
            GPIO.output(40, GPIO.LOW)
        elif(message=="r2"):
            GPIO.output(16, GPIO.LOW)
            GPIO.output(18, GPIO.LOW)
            GPIO.output(22, GPIO.LOW)
            GPIO.output(24, GPIO.HIGH)
            GPIO.output(32, GPIO.LOW)
            GPIO.output(36, GPIO.LOW)
            GPIO.output(38, GPIO.LOW)
            GPIO.output(40, GPIO.LOW)
        elif(message=="Dreieck"):
            GPIO.output(16, GPIO.LOW)
            GPIO.output(18, GPIO.LOW)
            GPIO.output(22, GPIO.LOW)
            GPIO.output(24, GPIO.LOW)
            GPIO.output(32, GPIO.HIGH)
            GPIO.output(36, GPIO.LOW)
            GPIO.output(38, GPIO.LOW)
            GPIO.output(40, GPIO.LOW)
        elif(message=="Kreis"):
            GPIO.output(16, GPIO.LOW)
            GPIO.output(18, GPIO.LOW)
            GPIO.output(22, GPIO.LOW)
            GPIO.output(24, GPIO.LOW)
            GPIO.output(32, GPIO.LOW)
            GPIO.output(36, GPIO.HIGH)
            GPIO.output(38, GPIO.LOW)
            GPIO.output(40, GPIO.LOW)
        elif(message=="X"):
            GPIO.output(16, GPIO.LOW)
            GPIO.output(18, GPIO.LOW)
            GPIO.output(22, GPIO.LOW)
            GPIO.output(24, GPIO.LOW)
            GPIO.output(32, GPIO.LOW)
            GPIO.output(36, GPIO.LOW)
            GPIO.output(38, GPIO.HIGH)
            GPIO.output(40, GPIO.LOW)
        elif(message=="Viereck"):
            GPIO.output(16, GPIO.LOW)
            GPIO.output(18, GPIO.LOW)
            GPIO.output(22, GPIO.LOW)
            GPIO.output(24, GPIO.LOW)
            GPIO.output(32, GPIO.LOW)
            GPIO.output(36, GPIO.LOW)
            GPIO.output(38, GPIO.LOW)
            GPIO.output(40, GPIO.HIGH)

        if(not ser.is_open):
            ser.open()
        ser.write(message.encode())
        print("seńt the following over USART: "+message+"\nwrite done")
        ser.close()
        resp.media = {
            "message": message
        }
        resp.status = falcon.HTTP_200

class getTemperature:

    def on_get(self, req, resp):
        #message = req.media.get("message")
        print('I was called on getTemp\n')
        print(threading.current_thread().name)
        currentTemp = {
            'Temp': (randomSensorData(0,35))
        }
        resp.media = currentTemp
        resp.status = falcon.HTTP_200

class getBatteryLevel:

    def on_get(self, req, resp):
        print('I was called on getBatteryLevel\n')
        print(threading.current_thread().name)
        currentBatteryLvl = {
           'Battery': (randomSensorData(0, 100))
        }
        resp.media = currentBatteryLvl
        resp.status = falcon.HTTP_200

class getSpeed:

    def on_get(self, req, resp):
        print('I was called on getSpeed\n')
        print(threading.current_thread().name)
        currentSpeed = {
           'Speed': (randomSensorData(0, 10))
        }
        resp.media = currentSpeed
        resp.status = falcon.HTTP_200


class getGyrosensor:

    def on_get(self, req, resp):
        print('I was called on getGyro\n')
        print(threading.current_thread().name)
        currentGyro = {
           'Gyro': ({
               'x': randomSensorData(-10, 10),
               'y': randomSensorData(-10, 10),
               'z': randomSensorData(-10, 10)
               })
        }
        #TODO: send data to DB
        resp.media = currentGyro
        resp.status = falcon.HTTP_200

def longTask():
    print("started bg task..")
    print(threading.current_thread().name)
    while(1):
        speed = randomSensorData(0, 10)
        temp = randomSensorData(0, 40)
        battery = randomSensorData(0, 100)
        requests.post("http://"+IP_ADDR_FE+":3002/receiveGyro", json=[{"x": 0.1, "y": 0.2, "z": 0.3}])
        time.sleep(0.5)
        requests.post("http://"+IP_ADDR_FE+":3002/receiveGyro", json=[{"x": 0.15, "y": 0.15, "z": 0.25}])
        time.sleep(0.5)
        requests.post("http://"+IP_ADDR_FE+":3002/receiveGyro", json=[{"x": -0.13, "y": -0.13, "z": 0.2}])
        time.sleep(0.5)
        requests.post("http://"+IP_ADDR_FE+":3002/receiveGyro", json=[{"x": -0.11, "y": -0.12, "z": 0.2}])
        time.sleep(0.5)
        requests.post("http://"+IP_ADDR_FE+":3002/receiveGyro", json=[{"x": -0.10, "y": -0.11, "z": 0.2}])
        time.sleep(2)
        requests.post("http://"+IP_ADDR_FE+":3002/receiveGyro", json=[{"x": -0.9, "y": -0.1, "z": 0.2}])
        time.sleep(2)
        requests.post("http://"+IP_ADDR_FE+":3002/receiveSensorData", json={"tmp": temp, "speed": speed, "battery": battery})
        time.sleep(1)

app = falcon.App(middleware=falcon.CORSMiddleware(allow_origins='*', allow_credentials='*'))
help_page = helpPage()
send_uart = SendUart()
getTemp = getTemperature()
getBat = getBatteryLevel()
getSpd = getSpeed()
getGyro = getGyrosensor()

app.add_route('/', help_page)
app.add_route('/receiveControlInput', send_uart)
app.add_route('/temp', getTemp)
app.add_route('/bat', getBat)
app.add_route('/speed', getSpd)
app.add_route('/gyro', getGyro)

if __name__ == '__main__':
    threading.Thread(target=longTask).start()
    with make_server('', 80, app) as httpd:
        print('Server is listening on Port 80 ...')
        httpd.serve_forever()
