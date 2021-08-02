const Db = require('./models');
const { GraphQL, GraphQLSchema, GraphQLObjectType, GraphQLScalarType, GraphQLNonNull, GraphQLList,  GraphQLString, GraphQLInt, Kind } = require('graphql');
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
            },
            posts: {
                type: new GraphQLList(Post),
                resolve(user) {
                    return user.getPosts();
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
                    return Db.models.user.findAll({ where: args });
                }
            },
            posts: {
                type: new GraphQLList(Post),
                resolve(posts, args) {
                    return Db.models.post.findAll({ where: args });
                }
            }
        }
    }
});

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
                resolve(_, args) {
                    return Db.models.user.create({
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
                        type: GraphQLNonNull(GraphQLString)
                    }
                },
                async resolve (source, args) {
                    var user = await Db.models.user.findByPk(args.userId);
                    return user.createPost({
                        title: args.title,
                        content: args.content
                    });
                }
            }
        }
    }
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

module.exports = Schema;
