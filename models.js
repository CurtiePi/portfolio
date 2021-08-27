const config                    = require('./config');
const bcrypt                    = require('bcryptjs');
const { Sequelize, DataTypes }  = require('sequelize');
const _                         = require('lodash');
const Faker                     = require('faker');

console.log(config);

const conn = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.pw,
    {
        host: config.db.host,
        dialect: 'mysql'
    });


const User = conn.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: async(user) => {
            const salt = await bcrypt.genSalt(10);
            console.log(`${user.firstName} ==> ${user.password}`);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
});

const Article = conn.define('article', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }
});

const Contact = conn.define('contact', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cover: {
        type: DataTypes.TEXT
    },
    hasMessaged: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }
});

User.hasMany(Article);
Article.belongsTo(User);


conn.sync({ force: true }).then( () => {
    _.times(10, () =>  {
        return User.create({
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
            email: Faker.internet.email(),
            password: Faker.internet.password()
        }).then((user) => {
            return user.createArticle({
                title: ` Article by ${user.firstName}`,
                content: Faker.lorem.sentences()
            }).then(() => {
                return Contact.create({
                    name: `${Faker.name.firstName()} ${Faker.name.lastName()}` ,
                    email: Faker.internet.email(),
                    cover: Faker.lorem.sentences(),
                    hasMessaged: Math.floor(Math.random() * 2)
                }).then((contact) => {
                    console.log(`Loaded contact ${contact.name}`);
                });
            });
        });
    });
});

/*
conn.sync({ force: true }).then( () => {
    _.times(10, () =>  {
        return Contact.create({
            name: `${Faker.name.firstName()} ${Faker.name.lastName()}` ,
            email: Faker.internet.email(),
            cover: Faker.lorem.sentences(),
            hasMessaged: Math.floor(Math.random() * 1)
        }).then((contact) => {
            console.log(`Loaded contact ${contact.name}`);
        });
    });
});
*/
module.exports = conn;
