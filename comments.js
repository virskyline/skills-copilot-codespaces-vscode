// create web server
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Comment = require('./models/Comment'); // Adjust the path to your Comment model
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Routes

// Add a new comment
app.post('/comments', async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).send(comment);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all comments
app.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).send(comments);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});