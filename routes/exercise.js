const express = require('express');
const Exercise = require('../models/Exercise');
const router = express.Router();
const verifyToken = require('./verifyToken');
const {exerciseValidations} = require('./validations');

router.get('/', verifyToken, async (req, res) => {
    try{
        const allExercise = await Exercise.find();
        res.json(allExercise);
    }catch(err){
        res.status(400).json({message: err});
    }   
});

router.post('/add', verifyToken, async (req, res) => {

    //Validate through JOI
    const {error} = exerciseValidations(req.body);
    if(error) return res.status(400).json({message:error.details[0].message});


    const user = new Exercise({
        username : req.body.username,
        description: req.body.description,
        duration: Number(req.body.duration),
        date : Date.parse(req.body.date),
        user_id : req.body.user_id
    });
    try{
        const exerciseSaved = await user.save();
        res.json(exerciseSaved);
    }catch(err){
        res.status(400).json({message: err});
    }
});

//Get specific exercise
router.get('/:exerciseId', verifyToken, async (req, res) => {
    try{
        const specificExercise = await Exercise.findById(req.params.exerciseId);
        res.json(specificExercise);
    }catch(err){
        res.json({message:err});
    }
});

//Delete a exercise
router.delete('/delete/:exerciseId', verifyToken, async (req, res) => {
    try{
        const deletePost = await Exercise.deleteOne({ _id :req.params.exerciseId});
        res.json(deletePost);
    }catch(err){
        res.json({message:err});
    }
});

//update a exercise
router.patch('/update/:exerciseId', verifyToken, async (req, res) => {
    //Validate through JOI
    const {error} = exerciseValidations(req.body);
    if(error) return res.status(400).json({message:error.details[0].message});

    try{
        const updatePost = await Exercise.update({_id : req.params.exerciseId},
                                                {
                                                    username : req.body.username,
                                                    description: req.body.description,
                                                    duration: Number(req.body.duration),
                                                    date : Date.parse(req.body.date)
                                                });
        res.json(updatePost);
    }catch(err){
        res.json({message:err});
    }
});

module.exports = router