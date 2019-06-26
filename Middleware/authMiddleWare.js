const jwt = require('jsonwebtoken')
const {generateError} = require('../Helpers/Helpers')
const asyncMiddleWare = require('../Middleware/asyncMiddleWare')
const User = require('../Models/User');

async function authMiddleWare(req,res,next){
    const header  = req.get('Authorization')
    if(!header) throw new Error(generateError({type: 'Error', statusCode: 401, message: 'Unauthorized Authorization header not present'}))
    const token = header.split(" ")[1];
    try {
        var isVerify = await jwt.verify(token, 'justin is the best')
    } catch (error) {
        throw new Error(generateError({type: 'Error', statusCode: 401, message: 'Unauthorized please login'}))
    }
    
    const {id} = isVerify;
    let user = await User.query().findById(id).select('id', 'username')
    req.user = user;
    next()
    
}


module.exports = asyncMiddleWare(authMiddleWare)


