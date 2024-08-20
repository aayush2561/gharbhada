const express = require('express');
const router = express.Router();
const upload = require('../config/multerconfig');
const {
  addBlog,
  getAllBlogs,
  getBlogById,
  addCommentToBlog,
  deleteBlog
} = require('../controllers/blogController');

router.post('/add', upload.single('blogImage'), addBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.delete('/:id', deleteBlog);
router.put('/:id/comment', addCommentToBlog);

module.exports = router;
