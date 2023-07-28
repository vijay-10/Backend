const express = require('express');
const router = express.Router();

// Import controllers
const {likePost, unlikePost} = require('../controllers/likeController');
const {createComment} = require('../controllers/commentController');
const {createPost, getAllPosts} = require('../controllers/postController');

// Creae mapping
router.post('/likes/like', likePost);
router.post('/likes/unlike', unlikePost);
router.post('/comments/create', createComment);
router.post('/posts/create', createPost);
router.get('/posts/', getAllPosts);


// export
module.exports = router;