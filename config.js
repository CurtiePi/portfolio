require('dotenv').config({ papth: require('find-config')('.env') });

const env = process.env.NODE_ENV; // 'dev' or 'prod'

console.log(`Environment: ${env}`);

const prod = {
    app: {
        port: parseInt(process.env.PROD_APP_PORT) || 3020,
    },
    db: {
        host: process.env.PROD_DB_HOST || 'localhost',
        port: parseInt(process.env.PROD_DB_PORT) || 27017,
        name: process.env.PROD_DB_NAME || 'portfolio',
        user: process.env.PROD_DB_USER || 'portfolioapp',
        pw: process.env.PROD_DB_USER_PW
    },
    mail: {
        office: process.env.EMAIL_USER,
        access: process.env.EMAIL_PW
    },
    salt: 'th3eanswersl1eal0ng8heroa4swekn9w',
    vapid_pub: process.env.PUBLIC_VAPID,
    vapid_pri: process.env.PRIVATE_VAPID
};

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 3020,
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DEV_DB_NAME || 'portfolio',
        user: process.env.DEV_DB_USER || 'portfolioapp',
        pw: process.env.DEV_DB_USER_PW
    },
    mail: {
        office: process.env.EMAIL_USER,
        access: process.env.EMAIL_PW
    },
    salt: 'th3eanswersl1eal0ng8heroa4swekn9w',
    vapid_pub: process.env.PUBLIC_VAPID,
    vapid_pri: process.env.PRIVATE_VAPID
};

const config = {
    dev,
    prod
};

console.log(config[env]);

module.exports = config[env];
