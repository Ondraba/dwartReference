const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  title: { type: String },
  main: { type: String },
  header: { type: String },
  footer: { type: String },
  state: { type: String },
  url: { type: String },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'tags'
  }],
  access: [{
    type: Schema.Types.ObjectId,
    ref: 'acess'
  }],
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

ContentSchema.statics.addTag= function(id, systemName, name) {
  const Tag = mongoose.model('tag');
  return this.findById(id)
    .then(content => {
      const tag = new Tag({ id, systemName, name })
      content.tags.push(tag)
      return Promise.all([tag.save(), content.save()])
        .then(([tag, content]) => content);
    });
}

ContentSchema.statics.addTagArray = function(tagArray, id) {
  return this.findById(id)
    .then(content => {
      content.tags.concat(tagArray);
      return content.save(content);
    });
}



ContentSchema.statics.updateContent = function(id, title, main, header, footer, state, url){
  const Content = mongoose.model('content');
  return Content.findById(id)
    .then(content => {
      content.title = title;
      content.main = main;
      content.header = header;
      content.footer = footer;
      content.state = state;
      content.url = url;
      return content.save(content);
    })
}


ContentSchema.statics.findComments = function(id) {
  return this.findById(id)
    .populate('comments')
    .then(content => content.comments);
}

ContentSchema.statics.findTags = function(id) {
  return this.findById(id)
    .populate('tags')
    .then(content => content.tags);
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
