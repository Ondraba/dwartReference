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

mongoose.model('comment', CommentSchema);


