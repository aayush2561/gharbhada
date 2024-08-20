const Blog = require('../models/Blogmodel');
const upload = require('../config/multerconfig');

async function addBlog(req, res) {
  const { profileImage, heading, description, username } = req.body;
  const blogImage = req.file ? req.file.filename : '';
  const newBlog = new Blog({
    profileImage,
    blogImage,
    heading,
    description,
    username,
  });

  await newBlog.save();
  res.status(201).json(newBlog);
}

async function getAllBlogs(req, res) {
  const blogs = await Blog.find();
  res.status(200).json(blogs);
}

async function getBlogById(req, res) {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  res.status(200).json(blog);
}
const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    
    const result = await Blog.findByIdAndDelete(blogId);
    
    if (!result) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

async function addCommentToBlog(req, res) {
  const blogId = req.params.id;
  const { text, username, profileImageUrl } = req.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    {
      $push: {
        comments: { text, username, profileImageUrl },
      },
    },
    { new: true }
  );
  res.status(200).json({ comment: updatedBlog.comments.slice(-1)[0] });
}

module.exports = {
  addBlog,
  getAllBlogs,
  getBlogById,
  addCommentToBlog,
  deleteBlog
};
