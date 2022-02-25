
exports.up = function(knex) {
  return knex.schema
  .createTable('roles', table => {
    table.increments('role_id')
    table.string('role_name', 255).notNullable()
  })
  .createTable('users', table => {
    table.increments('user_id')
    table.string('user_name', 255).notNullable()
    table.integer('role_id')
    .unsigned()
    .notNullable()
    .references('role_id')
    .inTable('roles')
    .onUpdate('RESTRICT')
    .onDelete('RESTRICT')
})
  .createTable('posts', table => {
    table.increments('post_id')
    table.string('post_content', 255)
    table.integer('user_id')
    .unsigned()
    .notNullable()
    .references('user_id')
    .inTable('users')
    .onUpdate('RESTRICT')
    .onDelete('RESTRICT')
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('posts')
  .dropTableIfExists('users')
  .dropTableIfExists('roles')
};
