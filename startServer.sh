#!/bin/bash

LOGPATH=$(pwd)

mkdir -p logs/

forever start -a \
  -l $LOGPATH/logs/forever-server.log \
  -o $LOGPATH/logs/out-server.log \
  -e $LOGPATH/logs/err-server.log \
  app.js

