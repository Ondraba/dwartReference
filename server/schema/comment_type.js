const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Comment = mongoose.model('comment');

const CommentType = new GraphQLObjectType({
  name:  'CommentType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    by: { type: GraphQLString },
    body: { type: GraphQLString },
    content: {
      type: require('./content_type'),
      resolve(parentValue) {
        return Comment.findById(parentValue).populate('content')
          .then(comment => {
            console.log(comment)
            return comment.content
          });
      }
    }
  })
});

module.exports = CommentType;

