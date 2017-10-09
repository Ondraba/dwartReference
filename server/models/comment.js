const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: {
    type: Schema.Types.ObjectId,
    ref: 'content'
  },
  likes: { type: Number, default: 0 },
  body: { type: String },
  by: { type: String }
});

CommentSchema.statics.addLike = function(id) {
  const Comment = mongoose.model('comment');
  return Comment.findById(id)
    .then(comment => {
      ++comment.likes;
      return comment.save();
    })
}

CommentSchema.statics.updateComment = function(id, by, body){
  const Comment = mongoose.model('comment');
  return Comment.findById(id)
    .then(comment => {
      comment.by = by;
      comment.body = body;
    return comment.save(comment);
    })
}

mongoose.model('comment', CommentSchema);

