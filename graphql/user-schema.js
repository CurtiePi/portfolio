const { GraphQL, GraphQLSchema, GraphQLObjectType, GraphQLList,  GraphQLString, GraphQLInt } = require('graphql');
const Date = require('./date-schema');

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
            },
            posts: {
                type: new GraphQLList(require('./post-schema')),
                resolve(user) {
                    return user.getPosts();
                }
            }
        }
    }
});

module.exports = User;
