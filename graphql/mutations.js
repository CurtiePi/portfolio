const { GraphQL, GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLList,  GraphQLString, GraphQLInt } = require('graphql');
const HTML = require('./html-schema');
const Article = require('./article-schema');
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
            addArticle: {
                type: Article,
                args: {
                    userId: {
                        type: GraphQLNonNull(GraphQLInt)
                    },
                    title: {
                        type: GraphQLNonNull(GraphQLString)
                    },
                    content: {
                        type: GraphQLNonNull(HTML)
                    },
                    isActive: {
                        type: GraphQLNonNull(GraphQLInt)
                    }
                },
                async resolve (source, args, ctx) {
                    if (!ctx.isAuth) {
                        throw new Error('You must be logged in to perform this operation!')
                    }
                    var user = await ctx.models.user.findByPk(args.userId);
                    return user.createArticle({
                        title: args.title,
                        content: args.content,
                        isActive: args.isActive
                    });
                }
            },
            updateArticleActivationStatus: {
                type: Article,
                args: {
                    id: {
                        type: GraphQLNonNull(GraphQLInt)
                    },
                    isActive: {
                        type: GraphQLNonNull(GraphQLInt)
                    }
                },
                async resolve (source, args, ctx) {
                    if (!ctx.isAuth) {
                        throw new Error('You must be logged in to perform this operation!')
                    }
                    var article = await ctx.models.article.findByPk(args.id);
                    if (!article) {
                        console.log(`Article not found for this id: ${args.id}`);
                    }
                    article.isActive = args.isActive;

                    return await article.save();
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
            },
            updateContactMessageStatus: {
                type: Contact,
                args: {
                    id: {
                        type: GraphQLNonNull(GraphQLInt)
                    },
                    hasMessaged: {
                        type: GraphQLNonNull(GraphQLInt)
                    }
                },
                async resolve (source, args, ctx) {
                    if (!ctx.isAuth) {
                        throw new Error('You must be logged in to perform this operation!')
                    }
                    var contact = await ctx.models.contact.findByPk(args.id);
                    if (!contact) {
                        console.log(`Contact not found for this id: ${args.id}`);
                    }
                    contact.hasMessaged = args.hasMessaged;

                    return await contact.save();
                }
            }
        }
    }
});


module.exports = Mutation;
