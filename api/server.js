const express           = require("express");
const { graphqlHTTP }   = require('express-graphql');
const schema            = require('../schema');
const cors              = require("cors");
const app               = express();

app.use(cors({credentials: true, origin: 'http://192.168.1.3:8080'}));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the party Hans."});
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    pretty: true
}));


module.exports = app;
