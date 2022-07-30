// server/index.js

const express = require("express");
const session = require('express-session');
const http = require("http");
const bodyParser = require('body-parser');
const cors = require('cors');


const {Server} = require("socket.io");
const { application } = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin: "*"
    }
})

const connections = [];
io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log(' %s sockets is connected', connections.length); // this is not printing

    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1);
    });
});

const EventEmitter = require('events').EventEmitter;
const myEmitter = new EventEmitter();

myEmitter.on('updateGyro', function (data) {
    // do something here like broadcasting data to everyone
    // or you can check the connection with some logic and 
    // only send to relevant user
    connections.forEach(function(socket) {
        socket.emit('gyroData', data);
    });
});

myEmitter.on('updateSensorData', function (jsonobj) {
    // do something here like broadcasting data to everyone
    // or you can check the connection with some logic and 
    // only send to relevant user
    connections.forEach(function(socket) {
        socket.emit('sensorData', jsonobj);
    });
});

app.post('/receiveGyro', function (req, res, next) {  
    const data = req.body
    // emit your custom event with custom data
    myEmitter.emit('updateGyro', data);

    // send the response to avoid connection timeout
    res.send({ok: true});
});


app.post('/receiveSensorData',function (req,res,next){
    const data = req.body
    myEmitter.emit("updateSensorData", data);

    res.send({ok:true});
})


app.get("/api", (req, res) => {
    res.json({ message: "Hello bois" });
});

app.put("/leftMotorControl", (req,res) => {
    res.json({ message: "MotorControlsentToDevice"});
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


server.listen(3002, () => {
    console.log(`Server listening on 3002`);
});
