const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const allUsers = await User.find();
        res.json(allUsers);
    }catch(err){
        res.status(400).json({message: err});
    }   
});

router.post('/add', async (req, res) => {
    const user = new User({
        username : req.body.username
    });
    try{
        const userSaved = await user.save();
        res.json(userSaved);
    }catch(err){
        res.status(400).json({message: err});
    }
});
module.exports = router