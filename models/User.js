var Bookshelf = require('bookshelf').PG;
var Promise = require('bluebird');

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
}, {
  findUserByUsername: Promise.method(function(user) {
    if (!user) {
      throw new Error('Username required.');
    }
    return new this({username: user}).fetch();
  }),
  findUserByUserId: Promise.method(function(userId) {
    if (!userId) {
      throw new Error('User ID required.');
    }
    return new this({id: userId}).fetch();
  })
});
