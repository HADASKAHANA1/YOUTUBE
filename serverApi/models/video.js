import mongoose from "mongoose"
const schema = mongoose.Schema


const videoSchema = new schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: String,
    required: true
  },
  authorId: {
    type: Number,
    required: true
  },
  comments: [{
    id: {
      type: Number,
    },
    user: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }],
  likes: [{
    type: String
  }],
  views: {
    type: Number,
    default: 0
  }
});


export default mongoose.model('Video', videoSchema);
