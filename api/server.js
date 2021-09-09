const express           = require("express");
const { graphqlHTTP }   = require('express-graphql');
const bodyParser        = require('body-parser')
const { applyMiddleware } = require('graphql-middleware')
const schema            = require('../graphql/schema');
const cors              = require("cors");
const webPush           = require("web-push");
const config            = require("../config");
const app               = express();
const isAuth            = require('../middleware/auth_check');
const models            = require('../middleware/inject_models');

var jsonParser = bodyParser.json();

app.use(cors({credentials: true, origin: ['http://192.168.1.5:8080', 'http://localhost:8080']}));

const publicVapidKey = config.vapid_pub;
const privateVapidKey = config.vapid_pri;

webPush.setVapidDetails('mailto:teserac_4@hotmail.com', publicVapidKey, privateVapidKey);

const refreshMiddleware = {
    Mutation: {
        addContact: async (resolve, root, args, context, info) => {
            const result = await resolve(root, args, context, info)
            console.log(`1. logResult: ${JSON.stringify(result)}`)
            return result
        },
    },
}

var sub_store = null;

const schemaWithMiddleware = applyMiddleware(schema, refreshMiddleware)

const emailRouter = require('../routes/mail_route');
app.use(isAuth);
app.use('/email', jsonParser, emailRouter);
app.post('/subscribe', jsonParser, (req, res) => {
    console.log(`Request body: ${req.body.data}`);
    sub_store = req.body.data;
    const subscription = JSON.parse(sub_store);
    res.status(201).json({});

    const payload = JSON.stringify({
        title: 'This is a message from the server',
    });

    console.log(`This is the subscription: ${subscription}`);
    console.log(subscription);

    webPush.sendNotification(subscription, payload)
      .catch(error => console.error(error.stack));
});

app.post('/notify', jsonParser, (req, res) => {
    console.log(`Request body: ${req.body.message}`);
    console.log(sub_store);
    const subscription = JSON.parse(sub_store);
    res.status(201).json({});

    const payload = JSON.stringify({
        title: req.body.message,
    });

    console.log(`This is the subscription: ${subscription}`);
    console.log(subscription);

    webPush.sendNotification(subscription, payload)
      .catch(error => console.error(error.stack));
});

app.use(models);
app.use('/graphql', (req, res, next) => { 
    console.info(`This is the request ${req}`);
    next();
  },
  graphqlHTTP({
    schema: schemaWithMiddleware,
    pretty: true
}));


module.exports = app;
