#!/bin/bash

cur_dir=$(pwd)

escaped=${cur_dir//\//\\/}

echo $escaped

sed -e "s/_app_dir_/$escaped/" pylon.conf.template > pylon.conf

sudo cp pylon.conf /etc/init/pylon.conf
