const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
    required: true,
  },
}, );


const blogSchema = new Schema({
  profileImage: {
    type: String,
    required: true,
  },
  blogImage: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  comments: [commentSchema],
}, ); 


const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
