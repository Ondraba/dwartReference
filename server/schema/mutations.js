const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const mongoose = require('mongoose');

const Song = mongoose.model('song');

const Content= mongoose.model('content');
const Comment= mongoose.model('comment');
const Tag = mongoose.model('tag');

const Lyric = mongoose.model('lyric');
const SongType = require('./song_type');

const ContentType = require('./content_type');
const CommentType = require('./comment_type');
const TagType = require('./tag_type');

const TagArrayType = require('../customTypes/tag_array');

const LyricType = require('./lyric_type');


const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
     addContent: {
      type: ContentType,
      args: {
        title: { type: GraphQLString },
        main: { type: GraphQLString },
        header: { type: GraphQLString },
        footer: { type: GraphQLString },
        state: { type: GraphQLString },
        url: { type: GraphQLString },
      },
      resolve(parentValue, { title, main, header, footer, state, url}) {
        return (new Content({ title, main, header, footer, state, url})).save()
      }
    },
     updateContent: {
      type: ContentType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        main: { type: GraphQLString },
        header: { type: GraphQLString },
        footer: { type: GraphQLString },
        state: { type: GraphQLString },
        url: { type: GraphQLString }
      },
      resolve(parentValue, { id, title, main, header, footer, state, url }) {
        return Content.updateContent(id, title, main, header, footer, state, url);
      }
    },
    addComment: {
      type: ContentType,
      args: {
        by: { type: GraphQLString },
        body: { type: GraphQLString },
        contentId: { type: GraphQLID }
      },
      resolve(parentValue, { by, body, contentId }) {
        return Content.addComment(contentId, by, body);
      }
    },
     addTag: {
      type: ContentType,
      args: {
        systemName: { type: GraphQLString },
        name: { type: GraphQLString },
        contentId: { type: GraphQLID }
      },
      resolve(parentValue, { systemName, name, contentId }) {
        return Content.addTag(contentId, systemName, name);
      }
    },
     addTagArray: {
      type: ContentType,
      args: {
        tagArray: { type: (new graphql.GraphQLList(TagArrayType)) },
        contentId: { type: GraphQLID }
      },
      resolve(parentValue, { tagArray, contentId }) {
        return Content.addTagArray(tagArray, contentId);
      }
    },
    updateComment: {
    type: CommentType,
    args: {
      id: { type: GraphQLID },
      by: { type: GraphQLString },
      body: { type: GraphQLString }
    },
    resolve(parentValue, { id, by, body }) {
      return Comment.updateComment(id, by, body);
      }
    },
    likeComment: {
      type: CommentType,
      args: { id: { type: GraphQLID} },
        resolve(parentValue, { id }){
          return Comment.addLike(id);
        }
    },
    likeContent: {
      type: ContentType,
      args: { id: { type: GraphQLID } },
        resolve(parentValue, { id }){
          return Content.addLike(id);
        }
    },
    deleteContent: {
      type: ContentType,
      args: { id : { type: GraphQLID} },
      resolve(parentValue, { id }){
        return Content.remove({_id: id});
      }
    },
    deleteComment: {
      type: CommentType,
      args: { id: { type:GraphQLID } },
        resolve(parentValue, { id }){
          return Comment.remove({_id: id})
        }
    },
    deleteTag: {
      type: TagType,
      args: { id: { type: GraphQLID } },
        resolve(parentValue, { id }){
          return Tag.remove({_id: id})
        }

    },
    deleteSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Song.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;
