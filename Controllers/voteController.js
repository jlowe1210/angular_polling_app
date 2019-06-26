const Vote = require('../Models/Vote');
const Vote_Choice = require('../Models/Vote_Choice');
const Choice = require('../Models/Choice');
const Poll = require('../Models/Poll');
const {generateError} = require('../Helpers/Helpers')
exports.vote = async (req,res,next) =>{
    const {choiceId} = req.body;
    const {pollid} = req.params;
    try {
        var poll = await Poll.query().findById(pollid);
        var choice = await Choice.query().findById(choiceId)
    } catch (error) {
        throw new Error()
    }
    if(!poll) throw new Error(generateError({type: 'Error', statusCode: 400, message: 'Poll doesnt exists or has been recently removed'}))
    if(poll.id !== choice.poll_id) throw new Error(generateError({type: 'Error', message: "That choice doesnt belong to this poll"}))
    let didVote = await Vote.query().where('user_id', req.user.id).where('poll_id', poll.id)
    if(didVote.length > 0) throw new Error(generateError({type: 'Error', message: 'Already voted on this poll'}))
    let vote = await Vote.query().insert({poll_id: poll.id, user_id: req.user.id})
    let vote_choice = await vote.$relatedQuery('choice').insert({choice_id: choiceId})
    

    res.status(201).json({type: 'Success', message: `You voted ${choice.name} on poll: ${poll.poll_name}`})
}