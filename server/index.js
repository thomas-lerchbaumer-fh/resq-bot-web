// server/index.js

const express = require("express");
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors({
    origin: '*'
}));

app.get("/api", (req, res) => {
    res.json({ message: "Hello bois" });
});

app.put("/leftMotorControl", (req,res) => {
    console.log(req);
    res.json({ message: "MotorControlsentToDevice"});
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
