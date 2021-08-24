const GraphQLHTML = require('graphql-scalar-html');

const allowList = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const HTML = new GraphQLHTML({
    allowedTags: [...GraphQLHTML.defaults.allowedTags, ...allowList]
});


module.exports = HTML;
