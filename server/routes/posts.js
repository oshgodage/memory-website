const express = require('express')
const router = express.Router();
const postController = require('../controller/post.js')
const bodyparser = require('body-parser');
router.use(bodyparser.json())

router.get('/view',postController.getAllPosts);
router.post('/posts',postController.createPost);
router.patch('/update/:id', postController.updatePost)
router.delete('/delete/:id', postController.deletePost)
router.patch('/likepost/:id', postController.likePost)

module.exports = router;