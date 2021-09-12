const { GraphQL, GraphQLSchema, GraphQLObjectType, GraphQLList,  GraphQLString, GraphQLInt } = require('graphql');
const Date = require('./date-schema');

const Service = new GraphQLObjectType({
    name: 'Service',
    description: 'This represents a Service',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(service) {
                    return service.id;
                }
            },
            name: {
                type: GraphQLString,
                resolve(service) {
                    return service.name;
                }
            },
            description: {
                type: GraphQLString,
                resolve(service) {
                    return service.description;
                }
            },
            createdAt: {
                type: Date,
                resolve(service) {
                    return service.createdAt;
                }
            },
            updatedAt: {
                type: Date,
                resolve(service) {
                    return service.updatedAt;
                }
            },
            items: {
                type: new GraphQLList(require('./item-schema')),
                resolve(service) {
                    return service.getItems();
                }
            }
        }
    }
});

module.exports = Service;
