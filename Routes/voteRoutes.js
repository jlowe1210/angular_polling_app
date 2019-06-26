const express = require('express');
const Router = express.Router();
const voteContrll = require('../Controllers/voteController')
const asyncMiddleWare = require('../Middleware/asyncMiddleWare');
const authMiddleWare = require('../Middleware/authMiddleWare')

Router.post('/vote/:pollid', authMiddleWare, asyncMiddleWare(voteContrll.vote))




module.exports = Router;