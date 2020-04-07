const Joi = require('joi');

const userValidations = (data) => {

    const schema={
        username: Joi.string().min(3).required(),
        email : Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(data,schema);

}


module.exports.userValidations = userValidations;
