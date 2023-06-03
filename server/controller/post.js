const { default: mongoose } = require("mongoose");
const PostMessage = require( "../models/postMessage");

exports.getAllPosts = async function (req, res, next) {
    try {
        const postMessage = await PostMessage.find()
        console.log(postMessage)
        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

exports.createPost = async function  (req, res, next){
    // const post = req.body;
    // const newPost = new PostMessage(post)

    // try {
    //     await newPost.save();
    //     res.status(201).json(newPost)
    // } catch (error) {
    //     res.status(409).json({message: error.message})
    // }
    const creator = req.body.creator;
    const title = req.body.title;
    const message = req.body.message;
    const tags = req.body.tags;
    const selectedFile = req.body.selectedFile;
    // const createdAt = req.body.createdAt;

    const newMemory = new PostMessage({creator, title, message, tags, selectedFile })
    try {
        const savedMemory = await newMemory.save();
        res.status(201).json(savedMemory)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

exports.updatePost = async function (req,res, next){
    
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
    
}


exports.deletePost = async function (req, res, next){
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);
    res.json({message: 'Post deleted successfully'})
}

exports.likePost = async function (req, res, next) {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    const post = await PostMessage.findById(id)
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true})

    res.json(updatedPost)    
}


 module.exports.createPost = this.createPost;
 module.exports.updatePost = this.updatePost;
 module.exports.deletePost = this.deletePost;
