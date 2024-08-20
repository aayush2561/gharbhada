const express = require('express');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const db = require('./config/db');
const authMiddleware = require('./middleware/authmiddleware');
const path =require('path');
const postRoutes=require('./routes/post');
const blogRoute=require('./routes/blog'); 
const app = express();
const contactRoute =require('./routes/contact')
const gptRoute=require('./routes/gpt3')
const adminRoute=require('./routes/admin');
require('dotenv').config();
const cors =require('./config/corsconfig')


app.use(cors);
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

db();

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/blog',blogRoute);
app.use('/api/contact', contactRoute);
app.use('/api/aichat',gptRoute);
app.use('/api/admin',adminRoute);


app.get('/api/check-token', authMiddleware, (req, res) => {
  res.json({ message: 'Token is valid', user: req.user });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
