

var settings = {};

settings.projects = [
  {
    "name" : "dspr",
    "repo" : "ebensing/dspr",
    "branch" : "master",
    "after" : [
      "npm install"
    ]
  }
];

settings.pubPort = 4501;

settings.githubPort = 4500;

settings.serverUrl = "Akroma";

module.exports = exports = settings;
