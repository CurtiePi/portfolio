const { GraphQL, GraphQLSchema, GraphQLObjectType, GraphQLList,  GraphQLString, GraphQLInt } = require('graphql');

const AuthData = new GraphQLObjectType({
    name: 'AuthData',
    description: 'Authenitcation object',
    fields: () => {
        return {
            userId: {
                type: GraphQLInt,
            },
            token: {
                type: GraphQLString,
            },
            tokenExpiry: {
                type: GraphQLInt,
            }
        }
    }
});

module.exports = AuthData;
