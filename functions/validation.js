
const Joi = require("joi");

function ValidateData(user) {
    const newSchema = Joi.object({
        username: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });

    return newSchema.validate(user);
}

exports.ValidateData = ValidateData;