const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  failedLoginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date },
});

adminSchema.pre('save', function(next) {
  if (this.isModified('password') || this.isNew) {
    bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      this.password = hashedPassword;
      next();
    });
  } else {
    next();
  }
});

adminSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

const Adminuser = mongoose.model('Adminuser', adminSchema);

module.exports = Adminuser;
