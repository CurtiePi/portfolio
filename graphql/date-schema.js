const { GraphQLScalarType, Kind } = require('graphql');

const Date = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
     var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC', timeZoneName: 'short', hour12: false };
     return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(value);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
});

module.exports = Date;
