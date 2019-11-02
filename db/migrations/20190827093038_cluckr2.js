
exports.up = function(knex) {
  return knex.schema.createTable('clucks', (t) => {
    t.bigIncrements('id');
    t.text('username');
    t.text('image_url');
    t.text('content');
    t.timestamp('created_at').default(knex.fn.now());
    t.timestamp('updated_at').default(knex.fn.now());
  })
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('clucks');
};
