require('dotenv').config();

const env = process.env.NODE_ENV; // 'dev' or 'test'

const prod = {
    app: {
        port: parseInt(process.env.PROD_APP_PORT) || 3020,
    },
    db: {
        host: process.env.PROD_DB_HOST || 'localhost',
        port: parseInt(process.env.PROD_DB_PORT) || 27017,
        name: process.env.PROD_DB_NAME || 'portfolio_data'
    }
};

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 3020,
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DEV_DB_NAME || 'portfolio_data'
    }
};

const config = {
    dev,
    prod
};


module.exports = config[env];
