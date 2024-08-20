const User = require('../models/userModel');

const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

const updateProfile = async (req, res) => {
  const { firstName, lastName, gender, location, phoneNumber, email, bio } = req.body;
  const profileImage = req.file ? req.file.filename : undefined;

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { firstName, lastName, gender, location, phoneNumber, email, bio, profileImage },
    { new: true, runValidators: true }
  ).select('-password');

  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(updatedUser);
};

const getProfileById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

const deleteUser = async (req, res) => {
  try {
 
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getProfileById,
  deleteUser
};
