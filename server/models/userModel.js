const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: true,
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  bio: {
    type: String,
    trim: true,
    default: '',  
  },
  profileImage: {
    type: String,
    trim: true,
    default: '',  
  }
});


userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {

      if (!this.password) return next(new Error('Password is required'));

      
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
      next();
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
