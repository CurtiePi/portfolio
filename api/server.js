const express           = require("express");
const { createServer}   = require('http');
const cors              = require("cors");
const app               = express();

app.use(cors({credentials: true, origin: 'http://192.168.1.3:8080'}));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the party Hans."});
});

const server = createServer(app);

module.exports = server;
