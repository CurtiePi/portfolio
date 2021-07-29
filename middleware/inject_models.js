const Db = require('../models');
const models = Db.models;


const InjectModels = (request, response, next) => {
    request.models = models;
    next();
}

module.exports = InjectModels;
