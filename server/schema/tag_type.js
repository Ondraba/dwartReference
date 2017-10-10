const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Tag = mongoose.model('tag');

const TagType = new GraphQLObjectType({
  name:  'TagType',
  fields: () => ({
    id: { type: GraphQLID },
    systemName: { type: GraphQLString },
    name: { type: GraphQLString },
    content: {
      type: require('./content_type'),
      resolve(parentValue) {
        return Tag.findById(parentValue).populate('content')
          .then(tag => {
            console.log(comment)
            return tag.content
          });
      }
    }
  })
});

module.exports = TagType;

