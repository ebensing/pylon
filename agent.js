
var async = require('async');
var axon = require('axon');

var config = require('./config.js');
var git = require('./git.js');
var fs = require('fs');
var exec = require('child_process').exec;

var sock = axon.socket('sub-emitter');

sock.connect(config.pubPort, config.serverUrl);

sock.on('deploy', function (cfg, url) {
  var ex = fs.existsSync(cfg.name);
  console.log("Deploying %s", cfg.name);

  if (!ex) {
    git.clone(url, cfg.name, function (err, repo_loc) {
      git.checkout_ref(repo_loc, cfg.branch, function (err) {
        runAfterCommands(err, repo_loc);
      });
    });
  } else {
    git.pull_latest(cfg.name, cfg.branch, runAfterCommands);
  }

  function runAfterCommands(err, loc) {
    if (err) {
      console.log(err);
      return;
    }

    async.series(cfg.after, exec, function (err) {
      if (err) {
        console.log(err);
      }
      console.log("%s has been deployed", cfg.name);
    });
  }
});
