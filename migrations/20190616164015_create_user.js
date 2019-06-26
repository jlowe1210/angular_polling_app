
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', t =>{
      t.increments('id').unsigned().primary();
      t.string('username', 255).notNull()
      t.string('password', 255).notNull()
  })
};

exports.down = function(knex, Promise) {
  return knex.dropTable('users')
};
