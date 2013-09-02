

var settings = {};

settings.projects = [
  {
    "name" : "dspr",
    "repo" : "ebensing/Dspr",
    "branch" : "master",
    "after" : [
      "npm install"
    ]
  }
];

settings.pubPort = 4501;

settings.githubPort = 4500;

settings.serverUrl = "Akroma";

settings.projectDir = "/home/ebensing";

module.exports = exports = settings;
