#!/bin/bash

cur_dir=$(pwd)

escaped=${cur_dir//\//\\/}

sed -e "s/_app_dir_/$escaped/" pylon.conf.template > pylon.conf.1

echo "What user should pylon run as?:"

read user

sed -e "s/_user_/$user/" pylon.conf.1 > pylon.conf

rm pylon.conf.1

sudo cp pylon.conf /etc/init/pylon.conf
