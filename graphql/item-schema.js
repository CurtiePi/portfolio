const { GraphQL, GraphQLSchema, GraphQLObjectType, GraphQLList,  GraphQLString, GraphQLInt } = require('graphql');
const Date = require('./date-schema');
const Service = require('./service-schema');

const Item = new GraphQLObjectType({
    name: 'Item',
    description: 'This represents a Service Detail',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(item) {
                    return item.id;
                }
            },
            detail: {
                type: GraphQLString,
                resolve(item) {
                    return item.detail;
                }
            },
            createdAt: {
                type: Date,
                resolve(item) {
                    return item.createdAt;
                }
            },
            updatedAt: {
                type: Date,
                resolve(item) {
                    return item.updatedAt;
                }
            },
            service: {
                type: Service,
                resolve(item) {
                    return item.getService();
                }
            }
        }
    }
});

module.exports = Item;
