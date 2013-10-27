
// this is where the logic to run all the Git commands will live

var exec_command = require('child_process').exec;
var utils = require('util');

// include the command that fails on the error message... Why isn't this
// default behavior?
function exec(command, user, callback) {
  if ('function' == typeof user) {
    callback = user;
    user = null;
  }
  if (user) {
    command = "sudo -u " + user + " -i sh -c \"" + command + "\""
  }
  exec_command(command, function (err, stdout, stderr) {
    if (err) {
      err.command = command;
      err.message += " Command: " + command;
    }
    return callback(err, stdout, stderr);
  });
}

/**
 * clones a Git repo
 *
 * @param {String} url - assumes it is a Github url
 * @param {String} user - user to run the command as
 * @param {Function} cb - callback
 */

function clone_repo(url, name, user, cb) {
  if (name[0] != "/") {
    name = "../" + name;
  }
  exec(utils.format("git clone %s %s", url, name), user, function (err, stdout, stderr) {
    if (err) return cb(err);
    return cb(null, name);
  });
}

/**
 * clones a Git repo using https address
 *
 * @param {String} url - assumes it is a Github url
 * @param {Function} cb - callback
 */

function clone_https_repo(url, cb) {
  var repoName = url.replace("https://github.com/","").replace(".git","").replace("/","-");
  exec(utils.format("git clone %s repos/%s", url, repoName), function (err, stdout, stderr) {
    if (err) return cb(err);

    return cb(null, "repos/" + repoName);
  });
}

/**
 * Checkout a specified ref
 *
 * @param {String} repo_loc - location of the repo on disk
 * @param {String} ref - name of the ref to checkout ie. "master"
 * @param {String} user - user to run the command as
 * @param {Function} cb - callback
 */

function checkout_ref(repo_loc, ref, user, cb) {
  var command = utils.format("cd %s && git fetch origin %s && git checkout %s", repo_loc, ref, ref);
  exec(command, user, cb);
}

/**
 * Checkout a specific commit
 *
 * @param {String} repo_loc - location of the repo on disk
 * @param {String} commit - sha of the commit
 * @param {Function} cb - callback
 */

function checkout_commit(repo_loc, commit, cb) {
  var command = utils.format("cd %s && git checkout %s", repo_loc, commit);
  exec(command, cb);
}

/**
 * Pushes a specific branch to a specific remote
 *
 * @param {String} repo_loc - location of the repo on disk
 * @param {String} remote - name of the remote
 * @param {String} branch - name of the branch
 * @param {Function} cb - callback
 */

function push_repo(repo_loc, remote, branch, cb) {
  var command = utils.format("cd %s && git push %s %s", repo_loc, remote, branch);
  exec(command, cb);
}

/**
 * Stage a set of files for commit
 *
 * @param {String} repo_loc - location of the repo on disk
 * @param {Array} fileNames - list of file names to stage
 * @param {Function} cb - callback
 */

function add_files(repo_loc, fileNames, cb) {
  // in case people decide to only pass a single file, let's not blow up in
  // their face
  if ('string' == typeof fileNames) {
    filesNames = [fileNames];
  }
  var count = fileNames.length;
  next(0);

  function next(i) {
    var command = utils.format("cd %s && git add %s", repo_loc, fileNames[i]);
    exec(command, function (err) {
      if (err) return cb(err);

      count--;
      if (count) {
        next(i + 1);
      } else {
        cb();
      }
    });
  }
}

/**
 * Commits a repo
 *
 * @param {String} repo_loc - location of the repository
 * @param {String} commitMsg - commit message to go with the commit
 * @param {Function} cb - callback
 */

function commit_repo(repo_loc, commitMsg, cb) {
  var command = utils.format("cd %s && git commit -m '%s'", repo_loc, commitMsg);
  exec(command, cb);
}

/**
 * Pull the latest changes from a branch
 *
 * @param {String} repo_loc - location of repository on disk
 * @param {String} branch - branch to pull
 * @param {String} user - user to run the command as
 * @param {Function} cb - callback
 */

function pull_latest(repo_loc, branch, user, cb) {
  var command = utils.format("cd %s && git pull origin %s", repo_loc, branch);
  exec(command, user, function (err) {
    cb(err, repo_loc);
  });
}

exports.clone = clone_repo;

exports.checkout_ref = checkout_ref;

exports.add_files = add_files;

exports.commit_repo = commit_repo;

exports.push_repo = push_repo;

exports.checkout_commit = checkout_commit;

exports.clone_https = clone_https_repo;

exports.pull_latest = pull_latest;
