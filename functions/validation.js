
const Joi = require("joi");

function ValidateRegisterData(user) {
    const newSchema = Joi.object({
        username: Joi.string().min(2).max(50).required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });

    return newSchema.validate(user);
};
function ValidateLoginData(user) {
    const newSchema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });

    return newSchema.validate(user);
};

function ValidateImageData(quote){
    const imageSchema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
    });

    return imageSchema.validate(quote);
}

exports.ValidateRegisterData = ValidateRegisterData;
exports.ValidateImageData = ValidateImageData;
exports.ValidateLoginData = ValidateLoginData;