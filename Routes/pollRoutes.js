const express = require('express');
const Router = express.Router()
const pollContrll = require('../Controllers/pollController')
const asyncMiddleWare = require('../Middleware/asyncMiddleWare');
const authMiddleWare = require('../Middleware/authMiddleWare')

Router.get('/getpolls',asyncMiddleWare(pollContrll.getpolls))
Router.post('/create', authMiddleWare,  asyncMiddleWare(pollContrll.createPoll))
Router.delete('/remove/:id', authMiddleWare, asyncMiddleWare(pollContrll.removePoll))
Router.get('/getpoll/:id', asyncMiddleWare(pollContrll.getPoll))
module.exports = Router;