
exports.up = function(knex, Promise) {
  return knex.schema.createTable('vote_choice', t =>{
      t.increments('id').unsigned().primary();
      t.integer('choice_id').unsigned().references('id').inTable('choices').onDelete('CASCADE')
      t.integer('vote_id').unsigned().references('id').inTable('votes').onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.dropTable('vote_choice')
};
