const Poll = require('../Models/Poll');
const {PollSchema} = require('../Schemas/schemas')
const {generateError} = require('../Helpers/Helpers')
const Joi = require('@hapi/joi')
exports.getpolls = async (req,res) =>{
    try {
     //   var polls = await Poll.query().select('poll_name', 'polls.id', 'users.username as created by', 'votes.user_id').join('users', 'polls.user_id', 'users.id').joinRelation('votes').eager('choices');
        var polls = await Poll.query().select('polls.id', 'poll_name','owner.username as created by')
            .eager('[choices, votes.[choice]]')
            .modifyEager('votes', builder =>{
                builder.select('users.username').join('users', 'votes.user_id', 'users.id')
            })
            .modifyEager('votes.choice', builder =>{
                builder.select('vote_choice.id', 'choice_id', 'choices.name as user choice').join('choices', 'choice_id', 'choices.id')
            })
            .joinRelation('owner')
    } catch (error) {
        throw new Error()
    }
    res.status(200).json({type: 'Success', polls: polls})
}

exports.createPoll = async (req, res) =>{
    try {
        var result = await Joi.validate(req.body, PollSchema, {abortEarly: false})
    } catch (error) {
        throw new Error(generateError({type: 'Error',statusCode: 400,  message: 'Invalid Poll submission please make sure your poll has a name and at least two choices, and no empty choice field'}))
    }
    const choices = req.body.choices.map(choice => {
        return {name: choice}
    })
    try {
        const poll = await Poll.query().insertGraph({
            poll_name: req.body.name,
            user_id: req.user.id,
            choices: choices
        })
    } catch (error) {
     throw new Error()   
    }
    
    res.status(200).json({type: 'Success', message: 'Poll Successfully created'})
}

exports.removePoll = async (req,res) =>{
    const {id} = req.params;
    let poll = await Poll.query().findById(id)
    if(!poll) throw new Error(generateError({type:'Error', statusCode: 400, message: "This Poll doesnt exists"}))
    if(poll.user_id !== req.user.id) throw new Error(generateError({type: 'Error', statusCode: 400, message: 'This Poll doesnt belong to you'}))
    let removedPoll = await Poll.query().deleteById(id);
    console.log(removedPoll)
    res.status(200).json({type: 'Success',message: 'Poll successfully removed' , poll: poll})
}

exports.getPoll = async (req,res) =>{
    const {id} = req.params;
    let poll = await Poll.query().findById(id).select('polls.id', 'poll_name','owner.username as created by')
    .eager('[choices, votes.[choice]]')
            .modifyEager('votes', builder =>{
                builder.select('users.username').join('users', 'votes.user_id', 'users.id')
            })
            .modifyEager('votes.choice', builder =>{
                builder.select('vote_choice.id', 'choice_id', 'choices.name as user choice').join('choices', 'choice_id', 'choices.id')
            })
            .joinRelation('owner')
    if(!poll) throw new Error(generateError({type:'Error', statusCode: 400, message: "This Poll doesnt exists"}))
    console.log(poll)
    res.status(200).json({type: 'Success', message: 'Successfully retrieved poll', poll: poll})
}