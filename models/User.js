var Bookshelf = require('bookshelf').PG;

Bookshelf.knex.schema.hasTable('b_user').then(function(exists) {
  if (!exists) {
    Bookshelf.knex.schema.createTable('b_user', function(table) {
      table.increments('id');
      table.bigInteger('github_id');
      table.string('username');
      table.string('email');
      table.string('avatar_url');
      table.string('access_token').notNull();
      table.timestamps();
    }).then(function() {
      console.log('Users table created');
    });
  }
});

exports.User = Bookshelf.Model.extend({
  tableName: 'b_user',
  hasTimestamps: true
});
