#!/bin/bash

# TODO: Figure this out, ya dummy!
ENV="development"

cwd=`pwd`


# Set up php-fpm
php_conf_dir=~/workspace/stephenkao/ladieswhoprotest/config/php
mkdir /var/log/php
touch -f /var/log/php/php-fpm.log
if [ "$ENV" == "development" ]; then
    cp "$php_conf_dir/php.ini" /private/etc
    cp "$php_conf_dir/php-fpm.conf" /private/etc

else
    cp "$php_conf_dir/php.ini" /etc/php5/fpm
    cp "$php_conf_dir/php-fpm.conf" /etc/php5/fpm
fi

# Set up nginx
nginx_dir=/usr/local/nginx
nginx_conf_dir=~/workspace/stephenkao/ladieswhoprotest/config/nginx


cd $nginx_dir
rm -rf sites-*

cp -f "$nginx_conf_dir/nginx.conf" "$nginx_dir/conf/nginx.conf"
cp -r "$nginx_conf_dir/global" "conf/global"

# Symlink catch-all block for 444s
if [ ! -d "sites-enabled" ]; then
    mkdir sites-enabled
fi
cp -f "$nginx_conf_dir/sites-enabled/default" "$nginx_dir/sites-enabled/default"

# Symlink ladieswhoprotest.com configuration
if [ ! -d "sites-available" ]; then
    mkdir sites-available
fi

cp -f "$nginx_conf_dir/sites-enabled/ladieswhoprotest.com" "$nginx_dir/sites-enabled/ladieswhoprotest.com"
if [ "$ENV" == "development" ]; then
    mv "$nginx_dir/sites-enabled/ladieswhoprotest.com" "$nginx_dir/sites-enabled/ladieswhoprotest.me"
    sed -i 's/ladieswhoprotest.com/ladieswhoprotest.me/g' "$nginx_dir/sites-enabled/ladieswhoprotest.me"
fi

if [ ! -d "/run" ]; then
    mkdir /run
fi


if [ ! -d "/var/log/nginx" ]; then
    mkdir -p /var/log/nginx
    touch /var/log/nginx/error.log
    touch /var/log/nginx/access.log
fi

if [ ! -d "/var/log/nginx/ladieswhoprotest.com" ]; then
    mkdir -p /var/log/nginx/ladieswhoprotest.com
    touch /var/log/nginx/ladieswhoprotest.com/error.log
    touch /var/log/nginx/ladieswhoprotest.com/access.log
fi

if [ ! -d "/var/log/nginx/ladieswhoprotest.me" ]; then
    mkdir -p /var/log/nginx/ladieswhoprotest.me
    touch /var/log/nginx/ladieswhoprotest.me/error.log
    touch /var/log/nginx/ladieswhoprotest.me/access.log
fi

nginx -t


cd $cwd
