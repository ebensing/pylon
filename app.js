
var http = require('http');
var axon = require('axon');

var config = require('./config.js');

var repos = {};

//setup a dict like this to make things easier later on
for (var i=0; i < config.projects; i++) {
  var p = config.projects[i];

  repos[p.repo + "/" + p.branch] = p;
}

var sock = axon.socket('pub-emitter');
sock.bind(config.pubPort);

http.createServer(function (req, res) {
  var data = "";

  req.on('data', function (d) {
    data += d.toString();
  });

  req.on('end', function () {
    var hook = null;
    try {
      hook = JSON.parse(data);
    } catch (e) {
      console.log(g);
      return res.end();
    }

    var identifier = hook.repository.owner.name + "/" hook.repository.name +
      hook.ref.replace("refs/heads","");

    if (repos[identifier] !== undefined) {
      // it's in the config, deploy to everybody who is connected
      sock.emit('deploy', repos[identifier], hook.repository.url);
    }
    return res.end();
  });
}).listen(config.githubPort, function (err) {
  if (err) throw err;

  console.log("Listening for Github hooks on port %d", config.githubPort);
});
