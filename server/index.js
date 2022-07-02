// server/index.js

const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api", (req, res) => {
    res.json({ message: "Hello bois" });
});

app.put("/leftMotorControl", (req,res) => {
    console.log(req.body.message);
    res.json({ message: "MotorControlsentToDevice"});
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
