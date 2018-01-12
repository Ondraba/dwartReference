const mongoose = require('mongoose');
const Content = mongoose.model('content');
const Comment = mongoose.model('comment');
const Tag = mongoose.model('tag');
const Edee = require('../models/edee');

const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;


const ContentType = require('./content_type');
const CommentType = require('./comment_type');
const TagType = require('./tag_type');
const EdeeType = require('./edee_type');



const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
     content: {
      type: new GraphQLList(ContentType),
      resolve() {
        return Content.find({});
      }
    },
     contentDetail: {
      type: ContentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Content.findById(id);
      }
    },
      comment: {
      type: CommentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Comment.findById(id);
      }
    },
     tag: {
      type: TagType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Tag.findById(id);
      }
    },
    edee: {
      type: EdeeType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve() {
        return Edee.gqlEdeeDb()
      }
    }
  })
});

module.exports = RootQuery;
