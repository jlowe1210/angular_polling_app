const express = require('express');
const Router = express.Router();
const asyncMiddleWare = require('../Middleware/asyncMiddleWare');
const authMiddleWare = require('../Middleware/authMiddleWare')
const authContrll = require('../Controllers/authController');

Router.post('/signup',   asyncMiddleWare(authContrll.signUp))
Router.post('/signin', asyncMiddleWare(authContrll.signIn))

module.exports = Router;

