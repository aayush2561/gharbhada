const Postschem = require('../models/postSchema')

async function createPost(req, res) {
  const { heading, description, tag, address, price, postBy, posterId,size,furnishings,storageSpace,lighting,privacy,utilities,heatingCooling,bathroom,kitchenAccess,location } = req.body;
  const postImage = req.file ? req.file.filename : '';
  const newPost = new Postschem({
    postimage: postImage,
    heading,
    description,
    tag,
    address,
    price,
    postBy,
    posterId,
    size,
    furnishings,
    storageSpace,
    lighting,
    privacy,
    utilities,
    heatingCooling,
    bathroom,
    kitchenAccess,
    location,
  });

  await newPost.save();
  res.status(201).json(newPost);
}

async function getPosts(req, res) {
  const { searchTerm, searchBy, location } = req.query;
  let query = {};

  if (searchTerm) {
    query.heading = { $regex: new RegExp(searchTerm, 'i') };
  }
  if (searchBy) {
    query.tag = searchBy;
  }
  if (location) {
    query.address = { $regex: new RegExp(location, 'i') };
  }

  const posts = await Postschem.find(query);
  res.json(posts);
}
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const result = await Postschem.findByIdAndDelete(postId);
    
    if (!result) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

async function getPostById(req, res) {
  const post = await Postschem.findById(req.params.id);
  res.status(200).json(post);
}

async function addReview(req, res) {
  const roomId = req.params.id;
  const { text, rating, username, profileImage } = req.body;
  const updatedRoom = await Postschem.findByIdAndUpdate(
    roomId,
    {
      $push: {
        reviews: { text, rating, username, profileImage, createdAt: new Date() },
      },
    },
    { new: true }
  );
  res.status(200).json({ review: updatedRoom.reviews.slice(-1)[0] });
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
  addReview,
  deletePost
};
