

var settings = {};

settings.projects = [
  {
    "name" : "dspr",
    "repo" : "ebensing/Dspr",
    "branch" : "master",
    "after" : [
      'sudo -u root -i sh -c "cd /home/ebensing/dspr; npm install"'
    ]
  }
];

settings.pubPort = 4501;

settings.githubPort = 4500;

settings.serverUrl = "Akroma";

settings.projectDir = "/home/ebensing";

module.exports = exports = settings;
