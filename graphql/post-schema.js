const { GraphQL, GraphQLSchema, GraphQLObjectType, GraphQLList,  GraphQLString, GraphQLInt } = require('graphql');
const User = require('./user-schema');
const Date = require('./date-schema');

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
            createdAt: {
                type: Date,
                resolve(post) {
                    return post.createdAt;
                }
            },
            updatedAt: {
                type: Date,
                resolve(post) {
                    return post.updatedAt;
                }
            },
            user: {
                type: User,
                resolve(post) {
                    return post.getUser();
                }
            }
        }
    }
});


module.exports = Post;
