exports.githubAPIOptions = function(token) {
  this.host = 'api.github.com';
  this.port = 443;
  this.path = null;
  this.method = null;
  this.headers = {
    'Content-Type': 'application/json',
    'user-agent': 'buildlatex',
    'Authorization': 'token ' + token
  };
}
