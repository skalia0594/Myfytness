const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {userValidations} = require("./validations");
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const verifyToken = require('./verifyToken');

router.get('/', verifyToken, async (req, res) => {
    try{
        const user = await User.findById(req.user);
        res.json(user);
    }catch(err){
        res.status(400).json({message: err});
    }   
});

router.post('/add', async (req, res) => {

    //Validate through JOI
    const {error} = userValidations(req.body);
    if(error) return res.status(400).json({message:error.details[0].message});

    //validate Duplicate email
    const emailID = await User.findOne({email : req.body.email});
    if(emailID) return res.status(400).json({message:'Email already exists.'});

    //hash password
    const salt= await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    //Add user
    const user = new User({
        username : req.body.username,
        email : req.body.email,
        password : hashPassword
    });
    try{
        const userSaved = await user.save();
        res.json(userSaved);
    }catch(err){
        res.status(400).send(err.errmsg);
    }
});

router.post('/login', async (req,res) => {
    
    const user = await User.findOne({email : req.body.email});
    
    //validate email
    if(!user) return res.status(400).send('Invalid Email and Password.');
    
    //validate password
    const validatePassword = await bcrypt.compare(req.body.password, user.password);
    if(!validatePassword) return res.status('400').send('Invalid Email and Password.');

    
    const token = jsonWebToken.sign({_id : user._id},process.env.SECRET_TOKEN);
    res.send(token);

    // res.send('Logged In!');
})

router.post('/authlogin', async (req, res) => {
    const user = await User.findOne({email : req.body.email});
    let userID;
    //Add user
    if(!user) {
        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            authId : req.body.authId
        });
        try{
            const userSaved = await newUser.save();
            userID = userSaved._id;
        }catch(err){
            res.status(400).send(err.errmsg);
        }
    }else {
        if(user.authId !== req.body.authId) return res.status('400').send('Invalid authentication.');
        userID = user._id;
    }

    const token = jsonWebToken.sign({_id : userID},process.env.SECRET_TOKEN);
    res.send(token);

})

module.exports = router