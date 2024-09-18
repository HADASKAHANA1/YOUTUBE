import videoModel from './video.js'
import mongoose from "mongoose"
const schema = mongoose.Schema



// הגדרת הסכימה של המשתמש
const User = new schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
  },
  videos: [{
    type: Number // Array of video IDs
  }]
})


export default mongoose.model('User', User);


























