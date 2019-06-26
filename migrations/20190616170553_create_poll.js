
exports.up = function(knex, Promise) {
  return knex.schema.createTable('polls', t =>{
      t.increments('id').unsigned().primary();
      t.string('poll_name', 255).notNull()
      t.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.dropTable('polls')
};
