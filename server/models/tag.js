const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  content: {
    type: Schema.Types.ObjectId,
    ref: 'content'
  },
  systemName: { type: String },
  name: { type: String }
});

mongoose.model('tag', TagSchema);

