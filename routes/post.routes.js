const express = require('express');
const router = express.Router();

const Post = require('../models/post.model')

// Get posts with filters
router.get('/', async (req, res)=> {
    try{
        filters = req.query
        posts = await Post.find(filters)
        res.status(200).json({posts: posts, params: req.query.params})
    } catch(err){
        res.status(404).json({ error: err.message })
    }
})

// Create post
router.post('/', async (req, res)=> {
    try{
        post = await Post.create(req.body);
        result = await User.findByIdAndUpdate(req.body.author, { $push: { posts: post._id } }, {new:true, upsert: false})
        if(!result){
            throw new Error("User does not exist")
        }
        res.status(200).json({msg: 'Post added succesfully', post: post, res: result})
    }catch(err){
        res.status(404).json({ error: err.message })
    }
})


// Remove all posts
router.delete('/', async (req, res) => {
    try{
        posts = await Post.find()
        await Post.deleteMany({})
        posts.map(async (post) =>  await User.findByIdAndUpdate(post.author, {$pull : {posts: post._id}},{new: true}))
        res.status(200).json({message: "Deleted all posts successfully!", post: posts})
    } catch(err){
        res.status(404).json({error: err.message})
    }
})


// Remove a post
router.delete('/:id', async(req, res) => {
    try{
        post = await Post.findByIdAndDelete(req.params.id)
        if(!post) throw new Error(`Post with id: ${req.params.id} does not exist`)
        res.status(200).json({message: `Deleted post with id: ${req.params.id} succesfully`})
    } catch(err){
        res.status(404).json({error: err.message})
    }
})

module.exports = router