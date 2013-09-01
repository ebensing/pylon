#!/bin/bash

NODE=`which node`

echo "Checking to see if node is installed..."
if [ ! $NODE ]; then
  echo "Installing Node.js"
  sudo apt-get install python-software-properties python g++ make
  sudo add-apt-repository ppa:chris-lea/node.js
  sudo apt-get update
  sudo apt-get install nodejs
  echo "Node.js installed!"
fi

GIT=`which git`
if [ ! $GIT ]; then
  echo "Installing git"
  sudo apt-get install git-core
  echo "Git installed!"
fi

echo "Installing node modules..."
npm install

echo "Installing forever..."
sudo npm install forever -g

echo "Setup complete. All dependencies have been installed"
