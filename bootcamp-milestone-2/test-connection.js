require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGO_URI;

console.log('Attempting to connect with URI:', url?.replace(/:[^:@]+@/, ':****@'));

mongoose.connect(url)
  .then(async () => {
    console.log('✅ Successfully connected to MongoDB!');

    const Blog = mongoose.model('Blog', new mongoose.Schema({}, { strict: false }));

    const blogs = await Blog.find();
    console.log('Found', blogs.length, 'blogs');
    console.log('Blogs:', JSON.stringify(blogs, null, 2));

    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Connection error:', err.message);
    process.exit(1);
  });
