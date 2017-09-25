const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  title: { type: String },
  main: { type: String },
  header: { type: String },
  footer: { type: String },
  state: { type: String },
  url: { type: String },
  groups: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  access: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }],
  likes: { type: Number, default: 0 }
});

ContentSchema.statics.findComments = function(id) {
  return this.findById(id)
    .populate('comments')
    .then(content => content.comments);
}

mongoose.model('content', ContentSchema);
