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

const Post = conn.define('post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
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
        type: DataTypes.STRING
    },
    hasMessaged: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }
});

User.hasMany(Post);
Post.belongsTo(User);


conn.sync({ force: true }).then( () => {
    _.times(10, () =>  {
        return User.create({
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
            email: Faker.internet.email(),
            password: Faker.internet.password()
        }).then((user) => {
            return user.createPost({
                title: `Sample title by ${user.firstName}`,
                content: `Hello my name is ${user.firstName} ${user.lastName}`
            });
        });
    });
});

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
module.exports = conn;
