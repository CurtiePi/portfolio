const { GraphQL, GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLList,  GraphQLString, GraphQLInt } = require('graphql');
const HTML = require('./html-schema');
const Post = require('./post-schema');
const User = require('./user-schema');
const Contact = require('./contact-schema');

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Function to create stuff',
    fields: () => {
        return {
            addUser: {
                type: User,
                args: {
                    firstName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    lastName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    email: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    password: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(_, args, ctx ) {
                    if (!ctx.isAuth) {
                        throw new Error('You must be logged in to perform this operation!')
                    }
                    return ctx.models.user.create({
                        firstName: args.firstName,
                        lastName: args.lastName,
                        email: args.email.toLowerCase(),
                        password: args.password
                    });
                }
            },
            addPost: {
                type: Post,
                args: {
                    userId: {
                        type: GraphQLNonNull(GraphQLInt)
                    },
                    title: {
                        type: GraphQLNonNull(GraphQLString)
                    },
                    content: {
                        type: GraphQLNonNull(HTML)
                    }
                },
                async resolve (source, args, ctx) {
                    if (!ctx.isAuth) {
                        throw new Error('You must be logged in to perform this operation!')
                    }
                    var user = await ctx.models.user.findByPk(args.userId);
                    return user.createPost({
                        title: args.title,
                        content: args.content
                    });
                }
            },
            addContact: {
                type: Contact,
                args: {
                    name: {
                        type: GraphQLNonNull(GraphQLString)
                    },
                    email: {
                        type: GraphQLNonNull(GraphQLString)
                    },
                    cover: {
                        type: GraphQLNonNull(GraphQLString)
                    }
                },
                async resolve (source, args, ctx) {
                    return ctx.models.contact.create({
                        name: args.name,
                        email: args.email,
                        cover: args.cover
                    });
                }
            }
        }
    }
});


module.exports = Mutation;
