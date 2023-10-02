
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

// function ValidateQuoteData(quote){
//     const quoteSchema = Joi.object({
//         userID: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),
//         content: Joi.string().required(),
//         tags: Joi.array().items(Joi.string()).required(),
//     });

//     return quoteSchema.validate(quote);
// }

function ValidateQuoteData(quote){
const quoteSchema = Joi.object({
    userID: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),
    content: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    timestamp: Joi.date(),
    likesCount: Joi.number().integer().min(0),
    commentsCount: Joi.number().integer().min(0)
  });
  return quoteSchema.validate(quote);
}

exports.ValidateRegisterData = ValidateRegisterData;
exports.ValidateQuoteData = ValidateQuoteData;
exports.ValidateLoginData = ValidateLoginData;