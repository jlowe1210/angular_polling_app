const {Model} = require('objection');

class Vote_Choice extends Model{
    static get tableName(){
        return 'vote_choice'
    }


    static get relationMappings(){


        const Vote = require('./Vote')
        const Choice = require('./Choice')
        return {
            vote: {
                relationMappings: Model.BelongsToOneRelation,
                modelClass: Vote,
                join: {
                    from: 'vote_choice.vote_id',
                    to: 'votes.id'
                }
            },

            choice: {
                relationMappings: Model.BelongsToOneRelation,
                modelClass: Choice,
                join: {
                    from: 'choices.id',
                    to: 'vote_choice.choice_id'
                }
            }
        }
    }
}

module.exports = Vote_Choice