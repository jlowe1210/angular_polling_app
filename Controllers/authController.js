const Joi = require('@hapi/joi')
const User = require('../Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {generateError} = require('../Helpers/Helpers')
const Schemas = require('../Schemas/schemas')




exports.signUp = async (req, res) =>{
    let {username, password, confirmedPassword} = req.body
    try {
        var result = await Joi.validate(req.body, Schemas.UserCreationschema, {abortEarly: false})
    } catch (error) {
        const errors = error.details.map(detail => detail.message.replace(/\"/g, ""));
        const validationErrorResponse = {type: 'Error', errors: errors}
        throw new Error(generateError(validationErrorResponse))
    }
    let user = await User.query().where('username', username);
    if(user.length > 0){
        throw new Error(generateError({type: 'Error', message: `this username is already taken`}))
    }
    try {
        password = await bcrypt.hash(password, 10)
        user = await User.query().insert({username: username, password: password})
    } catch (error) {
        throw new Error()
    }
    return res.status(201).json({type: 'Success', message: 'User created'})  
}

exports.signIn = async (req,res) =>{
    const {username, password} = req.body;
    let user = await User.query().where('username', username)
    if(user.length == 0) throw new Error(generateError({type: 'Error', statusCoede: 422 , message: 'Invalid username or password'}))
    
    let isValid = await bcrypt.compare(password, user[0].password)
    if(!isValid) throw new Error(generateError({type: 'Error', statusCoede: 422 , message: 'Invalid username or password'}))
    const token = jwt.sign({username: user[0].username, id: user[0].id}, 'justin is the best', {
        expiresIn: '7d'
    })
    res.status(200).json({
        type: 'Success',
        message: 'User successfully logined in',
        token: token
    })
}