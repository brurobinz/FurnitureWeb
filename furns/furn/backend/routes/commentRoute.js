// routes/Comment.js
import express from 'express';
import Comment from '../models/Comment.js';
import userModel from '../models/userModel.js';
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const { userId } = req.query; 
    
    const query = userId ? { userId } : {};
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const comments = await Comment.find(query)
      .populate('userId', 'name') // 
      .sort({ createdAt: -1 }); // 
    res.json(comments); // 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { userId, comment } = req.body;

    
    if (!userId || !comment) {
      return res.status(400).json({ message: 'userId and comment are required' });
    }

    
    const newComment = new Comment({
      userId,
      comment,
    });

    
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error in POST /api/comments:', error); 
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
});

export default router;