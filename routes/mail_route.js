const express               = require('express');
const mailman               = require('../middleware/mailman.js');
const emailRouter           = express.Router();


module.exports  = emailRouter;

/*
 * Email routes
 */


emailRouter.post('/', mailman.deliverEmail, (req, res, next) => {
  res.status(200).json({'message': req.message});
});
