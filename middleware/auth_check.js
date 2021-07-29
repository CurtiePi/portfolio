const express   = require('express');
const config    = require('../config');
const jwt       = require('jsonwebtoken');

const AuthMiddleware = (request, response, next) => {

    request.isAuth = false;

    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
        return next();
    }

    const token = authorizationHeader;
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

    request.isAuth = true;
    request.userId = decodedToken.userId;
    next();
}


module.exports = AuthMiddleware;
