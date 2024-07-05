const express = require('express');
const router = express.Router();
const Comment = require("../model/comment.js")
const Article = require('../model/article.js');
const User = require('../model/user.js');
const AuthMiddleware = require("../middleware/auth.js")
const mongoose = require("mongoose")
router.get('/getcomments/:articleId', async (req, res) => {
  try {
    const { articleId } = req.params;
    const comments = await Comment.find({ articleId })
      .populate('userId', 'username image')
      .populate({
        path: 'replies.userId',
        select: 'username image'
      })
      .exec(); // Ensure exec() is called on the query

    return res.status(200).json({ data: comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Add a comment to an article
router.post('/addcomment', async (req, res) => {
  try {
    const { text, articleId, userId } = req.body;

    if (!text || !articleId || !userId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newComment = new Comment({
      text,
      userId,
      articleId
    });

    const savedComment = await newComment.save();

    // Update the article to include the new comment
    await Article.findByIdAndUpdate(articleId, {
      $push: { comments: savedComment._id }
    });

    // Populate user info for immediate frontend response
    await savedComment.populate('userId', 'username image').execPopulate();

    // Respond with the saved comment
    res.status(200).json({ data: savedComment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Delete a comment
router.delete('/deletecomment/:commentId', AuthMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;

    // Validate commentId format
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ error: 'Invalid commentId format' });
    }

    // Find the comment by ID
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if the user is authorized to delete the comment
    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized to delete this comment' });
    }

    // Remove the comment from the database
    await Comment.findByIdAndDelete(commentId);

    // Update the associated article to remove the comment reference
    await Article.findByIdAndUpdate(comment.articleId, {
      $pull: { comments: commentId }
    });

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});


// Update a comment
router.put('/updatecomment/:commentId', AuthMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    // Validate commentId format
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ error: 'Invalid commentId format' });
    }

    // Find the comment by ID
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if the user is authorized to update the comment
    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized to update this comment' });
    }

    // Update the comment text
    comment.text = text;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});



// Reply to a comment
router.post('/replycomment/:commentId', AuthMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    const reply = { text, userId };

    comment.replies.push(reply);
    await comment.save();

    // Populate the newly added reply user info
    await comment.populate({
      path: 'replies.userId',
      select: 'username image'
    }).execPopulate();

    res.status(201).json({ data: comment });
  } catch (error) {
    console.error('Error replying to comment:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Like a comment
router.post('/likecomment/:commentId', AuthMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if the user has already liked the comment
    if (comment.likes.includes(req.user._id)) {
      return res.status(400).json({ error: 'You have already liked this comment' });
    }

    comment.likes.push(req.user._id);
    await comment.save();

    res.status(200).json({ message: 'Comment liked successfully' });
  } catch (error) {
    console.error('Error liking comment:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Unlike a comment
router.post('/unlikecomment/:commentId', AuthMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if the user has liked the comment
    const index = comment.likes.indexOf(req.user._id);
    if (index === -1) {
      return res.status(400).json({ error: 'You have not liked this comment' });
    }

    comment.likes.splice(index, 1);
    await comment.save();

    res.status(200).json({ message: 'Comment unliked successfully' });
  } catch (error) {
    console.error('Error unliking comment:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
