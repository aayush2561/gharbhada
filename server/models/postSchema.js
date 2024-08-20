const mongoose = require('mongoose');
const { Schema } = mongoose;


const reviewSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  profileImage: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const postSchema = new Schema({
  postimage: {
    type: String,
    trim: true,
    default: '',
    required: true
  },
  heading: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  tag: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    trim: true,
    default: ''
  },
  price: {
    type: Number,
    min: 0,
    default: 0
  },
  postBy: {
    type: String,
    required: true,
    trim: true
  },
  posterId:{
    type:String,
    required:true,
    trim:true
  },
  size: {
    type: String,
    trim: true
  },
  furnishings: {
    type: String,
    trim: true
  },
  storageSpace: {
    type: String,
    trim: true
  },
  lighting: {
    type: String,
    trim: true
  },
  privacy: {
    type: String,
    trim: true
  },
  utilities: {
    type: String,
    trim: true
  },
  heatingCooling: {
    type: String,
    trim: true
  },
  bathroom: {
    type: String,
    trim: true
  },
  kitchenAccess: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  reviews: [reviewSchema] 
});


postSchema.methods.formatDescription = function() {
  return this.description.trim();
};

postSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) return '0.0';
  
  const total = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  return (total / this.reviews.length).toFixed(1);
};


postSchema.methods.addReview = function(review) {
  this.reviews.push(review);
  return this.save();
};

const Postschem = mongoose.model('Postschem', postSchema);

module.exports = Postschem;
