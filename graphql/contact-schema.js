const { GraphQL, GraphQLBoolean, GraphQLSchema, GraphQLObjectType, GraphQLList,  GraphQLString, GraphQLInt } = require('graphql');
const Date = require('./date-schema');

const Contact = new GraphQLObjectType({
    name: 'Contact',
    description: 'This represents a Contact',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(contact) {
                    return contact.id;
                }
            },
            name: {
                type: GraphQLString,
                resolve(contact) {
                    return contact.name;
                }
            },
            email: {
                type: GraphQLString,
                resolve(contact) {
                    return contact.email;
                }
            },
            cover: {
                type: GraphQLString,
                resolve(contact) {
                    return contact.cover;
                }
            },
            hasMessaged: {
                type: GraphQLInt,
                resolve(contact) {
                    return contact.hasMessaged;
                }
            },
            createdAt: {
                type: Date,
                resolve(contact) {
                    return contact.createdAt;
                }
            },
            updatedAt: {
                type: Date,
                resolve(contact) {
                    return contact.updatedAt;
                }
            }
        }
    }
});


module.exports = Contact;
