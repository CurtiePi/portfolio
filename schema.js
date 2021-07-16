const Db = require('./models');
const { GraphQL, GraphQLSchema, GraphQLObjectType, GraphQLScalarType, GraphQLList,  GraphQLString, GraphQLInt, Kind } = require('graphql');

const Date = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
});

const User = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a User',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(user) {
                    return user.id;
                }
            },
            firstName: {
                type: GraphQLString,
                resolve(user) {
                    return user.firstName;
                }
            },
            lastName: {
                type: GraphQLString,
                resolve(user) {
                    return user.lastName;
                }
            },
            email: {
                type: GraphQLString,
                resolver(user) {
                    return user.email;
                }
            },
            password: {
                type: GraphQLString,
                resolve(user) {
                    return user.password;
                }
            },
            createdAt: {
                type: Date,
                resolve(user) {
                    return user.createdAt;
                }
            },
            updatedAt: {
                type: Date,
                resolve(user) {
                    return user.updatedAt;
                }
            }
        }
    }
});

const Post = new GraphQLObjectType({
    name: 'Post',
    description: 'This represents a Post',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(post) {
                    return post.id;
                }
            },
            title: {
                type: GraphQLString,
                resolve(post) {
                    return post.title;
                }
            },
            content: {
                type: GraphQLString,
                resolve(post) {
                    return post.content;
                }
            },
            email: {
                type: GraphQLString,
                resolver(user) {
                    return user.email;
                }
            },
            password: {
                type: GraphQLString,
                resolve(user) {
                    return user.password;
                }
            }
        }
    }
});


const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'This is a root query',
    fields: () => {
        return {
            users: {
                type: new GraphQLList(User),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    email: {
                        type: GraphQLString
                    }
                },
                resolve(users, args) {
                    return Db.models.user.findAll({ where: args});
                }
            }
        }
    }
});


const Schema = new GraphQLSchema({
    query: Query
});

module.exports = Schema;
