const {Model} = require('objection');


class User extends Model{
    static get tableName(){
        return 'users'
    }


    static get relationMappings(){
        const Poll = require('./Poll')
        const Vote = require('./Vote')
        return {
            polls: {
                relation: Model.HasManyRelation,
                modelClass: Poll,
                join: {
                    from: 'polls.user_id',
                    to: 'users.id'
                }
            },
            votes: {
                relation: Model.HasManyRelation,
                modelClass: Vote,
                join: {
                    from: 'votes.user_id',
                    to: 'users.id'
                }
            }
        }
    }

}

module.exports = User;