const express   = require('express');
const config    = require('../config');
const jwt       = require('jsonwebtoken');

const AuthMiddleware = (request, response, next) => {

    console.log('Setting the authentication to false');
    request.isAuth = false;

    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
        return next();
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token || token === '') {
        return next();
    }
    
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, config.salt);
    } catch (err) {
        return next();
    }

    if (!decodedToken) {
        return next();
    }

    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
}


module.exports = AuthMiddleware;
