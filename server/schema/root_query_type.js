const mongoose = require('mongoose');
const Content = mongoose.model('content');
const Comment = mongoose.model('comment');
const Tag = mongoose.model('tag');

const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;


const SongType = require('./song_type');
const LyricType = require('./lyric_type');
const Lyric = mongoose.model('lyric');
const Song = mongoose.model('song');

const ContentType = require('./content_type');
const CommentType = require('./comment_type');
const TagType = require('./tag_type');



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
    songs: {
      type: new GraphQLList(SongType),
      resolve() {
        return Song.find({});
      }
    },
    song: {
      type: SongType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Song.findById(id);
      }
    },
    lyric: {
      type: LyricType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return Lyric.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
