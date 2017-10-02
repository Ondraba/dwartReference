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

mongoose.model('comment', CommentSchema);


