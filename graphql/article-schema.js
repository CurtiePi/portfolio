const { GraphQL, GraphQLSchema, GraphQLObjectType, GraphQLList,  GraphQLString, GraphQLInt } = require('graphql');
const HTML = require('./html-schema');
const User = require('./user-schema');
const Date = require('./date-schema');

const Article = new GraphQLObjectType({
    name: 'Article',
    description: 'This represents a Article',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(article) {
                    return article.id;
                }
            },
            intro: {
                type: GraphQLString,
                resolve(article) {
                    return article.intro;
                }
            },
            content: {
                type: HTML,
                resolve(article) {
                    return article.content;
                }
            },
            isActive: {
                type: GraphQLInt,
                resolve(article) {
                    return article.isActive;
                }
            },
            createdAt: {
                type: Date,
                resolve(article) {
                    return article.createdAt;
                }
            },
            updatedAt: {
                type: Date,
                resolve(article) {
                    return article.updatedAt;
                }
            },
            user: {
                type: User,
                resolve(article) {
                    return article.getUser();
                }
            }
        }
    }
});


module.exports = Article;
