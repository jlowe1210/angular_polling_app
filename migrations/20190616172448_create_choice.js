
exports.up = function(knex, Promise) {
  return knex.schema.createTable('choices', t =>{
    t.increments('id').unsigned().primary();
    t.string('name', 255).notNull()
    t.integer('poll_id').unsigned().references('id').inTable('polls').onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.dropTable('choices')
};
