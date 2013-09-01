#!/bin/bash

LOGPATH=$(pwd)

mkdir -p logs/

forever start -a \
  -l $LOGPATH/logs/forever-agent.log \
  -o $LOGPATH/logs/out-agent.log \
  -e $LOGPATH/logs/err-agent.log \
  agent.js

