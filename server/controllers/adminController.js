const Adminuser = require('../models/AdminModel');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Adminuser.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (admin.lockUntil && admin.lockUntil > Date.now()) {
      return res.status(403).json({ message: 'Account is temporarily locked due to multiple failed login attempts' });
    }

    admin.comparePassword(password, async (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ message: 'An error occurred while checking the password.' });
      }

      if (isMatch) {
        admin.failedLoginAttempts = 0;
        admin.lockUntil = undefined;
        await admin.save();

        const token = jwt.sign(
          { id: admin._id, username: admin.username,isAdmin:true },
          process.env.JWT_KEY,
          { expiresIn: '1h' }
        );
        return res.json({ message: 'Login successful', token });
      } else {
        admin.failedLoginAttempts += 1;

        if (admin.failedLoginAttempts >= 3) {
          admin.lockUntil = Date.now() + 15 * 60 * 1000; 
        }

        await admin.save();
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  } catch (err) {
    console.error('Error in loginAdmin controller:', err);
    return res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
