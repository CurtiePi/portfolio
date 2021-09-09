require('dotenv').config({ papth: require('find-config')('.env') });


export default {
    vapid_key: process.env.PUBLIC_VAPID
}
