const {Model} = require('objection');


class Vote extends Model {
    static get tableName(){
        return 'votes'
    }

    static get relationMappings(){

        const Poll = require('./Poll')
        const User = require('./User')
        const Vote_Choice = require('./Vote_Choice')
        return {
            poll: {
                relation: Model.BelongsToOneRelation,
                modelClass: Poll,
                join: {
                    from: 'votes.poll_id',
                    to: 'polls.id'
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'votes.user_id',
                    to: 'users.id'
                }
            },
            choice: {
                 relation: Model.HasOneRelation,
                 modelClass: Vote_Choice,
                 join: {
                     from: 'vote_choice.vote_id',
                     to: 'votes.id'
                 }
            }
        }
    }
}

module.exports = Vote