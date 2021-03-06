const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } = graphql;
const Content = mongoose.model('content');
const CommentType = require('./comment_type');
const TagType = require('./tag_type');

const ContentType = new GraphQLObjectType({
  name:  'ContentType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    main: { type: GraphQLString },
    header: { type: GraphQLString },
    footer: { type: GraphQLString },
    state: { type: GraphQLString },
    url: { type: GraphQLString },
    likes: { type: GraphQLInt },
    views: { type: GraphQLInt},
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue) {
        return Content.findComments(parentValue.id);
      }
    },
    tags: {
      type: new GraphQLList(TagType),
      resolve(parentValue) {
        return Content.findTags(parentValue.id);
      }
    },
    likesCount: {
      type: GraphQLInt,
      resolve(){
        return Content.countComments();
      }
    }
  })
});

module.exports = ContentType;


