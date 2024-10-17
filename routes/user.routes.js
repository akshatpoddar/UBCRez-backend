const express = require('express');
const router = express.Router();

const User = require('../models/user.model')

// Get users (with filter)
router.get('/', async (req, res)=> {
    try{
        filters = req.query
        users = await User.find(filters)
        res.status(200).json({users: users})
    } catch(err){
        res.status(404).json({error: err.message})
    }
})

// Create a new user
router.post('/', async (req, res)=> {
    try{
        user = await User.create(req.body)
        res.status(200).json({message: "User added succesfully", user: user})
    } catch(err){
        res.status(404).json({error: err.message})
    }
})

// Delete all users
router.delete('/', async (req, res) => {
    try{
        users = await User.find()
        await User.deleteMany({})
        users.map(async (user) =>  await Post.deleteMany({author: user._id}))
        res.status(200).json({message: "Deleted all users successfully!", users: users})
    } catch(err){
        res.status(404).json({error: err.message})
    }
})

// Delete a user
router.delete('/:id', async(req, res) => {
    try{
        user = await User.findByIdAndDelete(req.params.id)
        if(!user) throw new Error(`User with id: ${req.params.id} does not exist`)
        await Post.deleteMany({author: req.params.id})
        res.status(200).json({message: `Deleted user with id: ${req.params.id} succesfully`})
    } catch(err){
        res.status(404).json({error: err.message})
    }
})


module.exports = router