const Joi = require('@hapi/joi');
exports.UserCreationschema = Joi.object().keys({
    username: Joi.string().trim().min(3).max(255).required(),
    password: Joi.string().trim().min(7).max(255).required(),
    confirmedPassword: Joi.any().valid(Joi.ref('password')).required().options({
        language: {
            any: {
              allowOnly: '!!Passwords do not match',
            }
          }
    })

})

const choiceScema = Joi.object().keys({
    name: Joi.string().trim().required()
})

exports.PollSchema = Joi.object().keys({
    name: Joi.string().trim().required(),
    choices: Joi.array().min(2).items(Joi.string().trim().required()).required()
})

