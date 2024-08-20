const express = require('express');
const router = express.Router();
const upload = require('../config/multerconfig');
const {
  createPost,
  getPosts,
  getPostById,
  addReview,
  deletePost
} = require('../controllers/postcontroller');

router.post('/', upload.single('postImage'), createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.delete('/:id', deletePost);
router.put('/:id/reviews', addReview);

module.exports = router;
