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
    ref: 'groups'
  },
  access: {
    type: Schema.Types.ObjectId,
    ref: 'acess'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }],
  likes: { type: Number, default: 0 }
});


ContentSchema.statics.addComment= function(id, by, body) {
  const Comment = mongoose.model('comment');
  return this.findById(id)
    .then(content => {
      const comment = new Comment({ by, body, content })
      content.comments.push(comment)
      return Promise.all([comment.save(), content.save()])
        .then(([comment, content]) => content);
    });
}

ContentSchema.statics.findComments = function(id) {
  return this.findById(id)
    .populate('comments')
    .then(content => content.comments);
}

ContentSchema.statics.countComments = function(){
    return 10;
}

ContentSchema.statics.addLike = function(id){
  const Content = mongoose.model('content');
  return Content.findById(id)
    .then(content => {
      ++content.likes;
      return content.save();
    })
}

mongoose.model('content', ContentSchema);
