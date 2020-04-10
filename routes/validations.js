const Joi = require('joi');

const userValidations = (data) => {

    const schema={
        username: Joi.string().min(3).max(20).required(),
        email : Joi.string().min(6).max(50).required().email(),
        password: Joi.string().min(6).max(20).required()
    }
    return Joi.validate(data,schema);

}

function exerciseValidations(data){
    
    const schema= {
        username : Joi.string().required(),
        description: Joi.string().min(3).max(256).required(),
        duration: Joi.number().integer().positive().max(1440),
        date : Joi.date().less('now').required(),
        user_id : Joi.string().required()
    }
    return Joi.validate(data,schema);
}

module.exports.userValidations = userValidations;
module.exports.exerciseValidations = exerciseValidations;
