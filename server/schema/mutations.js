const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');

const Song = mongoose.model('song');

const Content= mongoose.model('content');
const Comment= mongoose.model('comment');

const Lyric = mongoose.model('lyric');
const SongType = require('./song_type');

const ContentType = require('./content_type');
const CommentType = require('./comment_type');
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
        url: { type: GraphQLString }
      },
      resolve(parentValue, { title, main, header, footer, state, url }) {
        return (new Content({ title, main, header, footer, state, url })).save()
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
    addSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return (new Song({ title })).save()
      }
    },
    addLyricToSong: {
      type: SongType,
      args: {
        content: { type: GraphQLString },
        songId: { type: GraphQLID }
      },
      resolve(parentValue, { content, songId }) {
        return Song.addLyric(songId, content);
      }
    },
    likeLyric: {
      type: LyricType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Lyric.like(id);
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
