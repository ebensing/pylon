
var async = require('async');
var axon = require('axon');

var config = require('./config.js');
var git = require('./git.js');
var fs = require('fs');
var exec = require('child_process').exec;
var utils = require('util');

var sock = axon.socket('sub-emitter');

sock.connect(config.pubPort, config.serverUrl);

sock.on('deploy', function (cfg, url) {
  var proj_loc = config.projectDir + "/" + cfg.name;
  var ex = fs.existsSync(proj_loc);
  console.log("Deploying %s", cfg.name);

  if (!ex) {
    git.clone(url, proj_loc, function (err, repo_loc) {
      git.checkout_ref(repo_loc, cfg.branch, function (err) {
        runAfterCommands(err, repo_loc);
      });
    });
  } else {
    git.pull_latest(proj_loc, cfg.branch, runAfterCommands);
  }

  function runAfterCommands(err, loc) {
    if (err) {
      console.log(err);
      return;
    }

    var commands = cfg.after.map(function (item) {
      return utils.format("cd %s && ", loc) + item.replace("%loc%", loc);
    });

    async.eachSeries(commands, exec, function (err) {
      if (err) {
        console.log(err);
      }
      console.log("%s has been deployed", cfg.name);
    });
  }
});
