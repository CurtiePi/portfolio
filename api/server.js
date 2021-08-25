const express           = require("express");
const { graphqlHTTP }   = require('express-graphql');
const schema            = require('../graphql/schema');
const cors              = require("cors");
const app               = express();
const isAuth            = require('../middleware/auth_check');
const models            = require('../middleware/inject_models');

app.use(cors({credentials: true, origin: 'http://192.168.1.5:8080'}));


emailRouter = require('../routes/mail_route');
app.use(isAuth);
app.use(models);

app.use('/email', emailRouter);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    pretty: true
}));


module.exports = app;
