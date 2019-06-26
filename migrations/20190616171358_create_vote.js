
exports.up = function(knex, Promise) {
  return knex.schema.createTable('votes', t =>{
      t.increments('id').unsigned().primary();
      t.integer('poll_id').unsigned().references('id').inTable('polls').onDelete('CASCADE')
      t.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.dropTable('votes')
};
