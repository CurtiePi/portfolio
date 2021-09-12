const { GraphQL,
        GraphQLSchema,
        GraphQLObjectType,
        GraphQLNonNull,
        GraphQLList,
        GraphQLString,
        GraphQLInt }    = require('graphql');
const bcrypt            = require('bcryptjs');
const config            = require('../config');
const jwt               = require('jsonwebtoken');
const Article           = require('./article-schema');
const User              = require('./user-schema');
const Auth              = require('./auth-schema');
const Contact           = require('./contact-schema');
const Service           = require('./service-schema');
const Item              = require('./item-schema');

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'This is a root query',
    fields: () => {
        return {
            getUsers: {
                type: new GraphQLList(User),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    email: {
                        type: GraphQLString
                    }
                },
                resolve(users, args, ctx) {
                    return ctx.models.user.findAll({ where: args });
                }
            },
            getArticles: {
                type: new GraphQLList(Article),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    userId: {
                        type: new GraphQLList(GraphQLInt)
                    },
                    isActive: {
                        type: GraphQLInt
                    }
                },
                resolve(articles, args, ctx) {
                    return ctx.models.article.findAll({ where: args, order: [ ['updatedAt', 'DESC'] ] });
                }
            },
            getContacts: {
                type: new GraphQLList(Contact),
                args: {
                    id: {
                        type: GraphQLInt
                    }
                },
                resolve(contacts, args, ctx) {
                    if (!ctx.isAuth) {
                        throw new Error('You must be logged in to perform this operation!')
                    }
                    return ctx.models.contact.findAll({ where: args });
                }
            },
            getServices: {
                type: new GraphQLList(Service),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    name: {
                        type: GraphQLString
                    },
                    description: {
                        type: GraphQLString
                    }
                },
                resolve(services, args, ctx) {
                    return ctx.models.service.findAll({ where: args });
                }
            },
            getItems: {
                type: new GraphQLList(Item),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    serviceId: {
                        type: new GraphQLList(GraphQLInt)
                    },
                    detail: {
                        type: GraphQLString
                    }
                },
                resolve(items, args, ctx) {
                    return ctx.models.item.findAll({ where: args });
                }
            },
            login: {
                type: Auth,
                args: {
                    email: {
                        type: GraphQLString
                    },
                    password: {
                        type: GraphQLString
                    }
                },
                async resolve(_, args, ctx) {
                    const user = await ctx.models.user.findOne({ where: { email: args.email } });
                    if (!user) {
                        throw new Error('User does not exist!');
                    }
                    const isEqual = await bcrypt.compare(args.password, user.password);
                    if (!isEqual) {
                        throw new Error('Password is incorrect for this user!');
                    }

                    const token = jwt.sign(
                        {userId: user.id, email: user.email},
                        config.salt,
                        { 
                            expiresIn: '1h'
                        }
                    );

                    return { userId: user.id, token: token, tokenExpiry: 1 }; 

                }
            }
        }
    }
});

module.exports = Query;
