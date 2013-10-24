

var settings = {};

settings.projects = [
  {
    name : "dspr",
    repo : "ebensing/Dspr",
    branch : "master",
    after : [
      // okay, so this ugly ass PoS is because things need to run as root when
      // using upstart, and some node modules have trouble doing that when they
      // are installing. Should I just make upstart run as a normal user? Most
      // likely. I'm lazy
      'sudo -u root -i sh -c "cd %loc%; npm install"',
      'sudo chown %user%:%user% %loc% -R',
      'sudo -u %user% -i sh -c "forever stop client.js"',
      'sudo -u %user% -i sh -c "cd %loc%; forever start client.js"'
    ],
    user : "ebensing"
  }
];

settings.pubPort = 4501;

settings.githubPort = 4500;

settings.serverUrl = "Akroma";

settings.projectDir = "/home/ebensing";

module.exports = exports = settings;
