const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  content: {
    type: Schema.Types.ObjectId,
    ref: 'tag'
  },
  systemName: { type: String },
  name: { type: String }
});

mongoose.model('tag', TagSchema);

