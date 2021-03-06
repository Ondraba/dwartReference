const graphql = require('graphql');
const { GraphQLInputObjectType, GraphQLString } = graphql;

const TagArrayType = new GraphQLInputObjectType({
  name: 'TagArrayType',
  fields: {
    systemName: { type: GraphQLString, description: 'Unique tag identifier' },
    name: { type: GraphQLString, description: 'Tag display name' }
  }
});

module.exports = TagArrayType;