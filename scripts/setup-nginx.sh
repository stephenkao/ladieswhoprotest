#!/bin/bash

cwd=`pwd`
nginx_dir=/usr/local/nginx
conf_dir=~/workspace/stephenkao/ladieswhoprotest/config/nginx


cd $nginx_dir

cp -f "$conf_dir/nginx.conf" "$nginx_dir/conf/nginx.conf"
cp -r "$conf_dir/global" "conf/global"

# Symlink catch-all block for 444s
if [ ! -d "sites-enabled" ]; then
    mkdir sites-enabled
fi
cp -f "$conf_dir/sites-enabled/default" "$nginx_dir/sites-enabled/default"

# Symlink ladieswhoprotest.com configuration
if [ ! -d "sites-available" ]; then
    mkdir sites-available
fi
cp -f "$conf_dir/sites-available/ladieswhoprotest.com" "$nginx_dir/sites-available/ladieswhoprotest.com"
if [ "$ENV" == "development" ]; then
    sed -i 's/ladieswhoprotest.com/ladieswhoprotest.me/g' "$nginx_dir/sites-available/ladieswhoprotest.com"
fi

if [ ! -d "/run" ]; then
    mkdir /run
fi

if [ ! -d "/var/log/nginx" ]; then
    mkdir -p /var/log/nginx
    touch /var/log/nginx/error.log
    touch /var/log/nginx/access.log
fi

nginx -t

cd $cwd
