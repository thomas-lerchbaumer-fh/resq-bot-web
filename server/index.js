// server/index.js

const express = require("express");
const session = require('express-session');
const http = require("http");
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;


const {Server} = require("socket.io");
const { application } = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(session({secret: 'mySecret', saveUninitialized: true, resave: false}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin: "*"
    }
})

const mongodburi = "mongodb+srv://wahlfachprojektuser:iFRUEjduALJZhzIp@cluster0.awuaqj3.mongodb.net/?retryWrites=true&w=majority"



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
    MongoClient.connect(mongodburi, function(err, db) {
        if (err) throw err;
        var dbo = db.db("WFP");
        var myobj = { timestamp: Date.now() ,  "X-Axis": data[0].x, "Y-Axis": data[0].y,"Z-Axis": data[0].z };
        dbo.collection("Gyrosensor").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("Gyrosensor to MongoDB");
          db.close();
        });
      });
    // send the response to avoid connection timeout
    res.send({ok: true});
});


app.post('/receiveSensorData',function (req,res,next){
    const data = req.body
    myEmitter.emit("updateSensorData", data);

    MongoClient.connect(mongodburi, function(err, db) {
        if (err) throw err;
        var dbo = db.db("WFP");
        var myobj = { timestamp: Date.now() ,  temperature: data.tmp, speed: data.speed, battery: data.battery };
        dbo.collection("Sensordata").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("Sensordata to MongoDB");
          db.close();
        });
      });

    res.send({ok:true});
})


app.get("/api", (req, res) => {
    res.json({ message: "Hello bois" });
});

app.put("/leftMotorControl", (req,res) => {
    res.json({ message: "MotorControlsentToDevice"});
});

app.post("/login", (req,res) => {
    console.log(req.body.username);
    MongoClient.connect(mongodburi, function(err, db) {
        if (err) throw err;
        var dbo = db.db("WFP");
        //Search for correct user and pw
        var query = { name: req.body.username.toLowerCase(), password: req.body.password };
        dbo.collection("Users").find(query).toArray(function(err, result) {
            if (err) throw err;
            //if user found
            if (result.length != 0){
                req.session.name = req.body.username;
                res.json({ token: "yes"});
            }
            else {
                res.json({ token: "wrong"});
            }
            db.close();
        });
      });
});

app.post("/logout", (req,res) => {
    req.session.destroy();
    res.json({ message: "Logout Successfull"});
    
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


server.listen(3002, () => {
    console.log(`Server listening on 3002`);
});
