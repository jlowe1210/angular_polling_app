const {Model} = require('objection');

class Poll extends Model{
    static get tableName(){
        return 'polls'
    }

    static get relationMappings(){
        const User = require('./User')
        const Choice = require('./Choice')
        const Vote = require('./Vote')
        return {
            owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'polls.user_id',
                    to: 'users.id'
                }
            },
            choices: {
                relation: Model.HasManyRelation,
                modelClass: Choice,
                filter: query => query.select('name', 'id'),
                join: {
                    from: 'polls.id',
                    to: 'choices.poll_id'
                }
            
            },
            votes: {
                relation: Model.HasManyRelation,
                modelClass: Vote,
                join: {
                    from: 'polls.id',
                    to: 'votes.poll_id'
                }
            }
        }
    }
}
module.exports = Poll