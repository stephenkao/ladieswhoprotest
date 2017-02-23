#!/bin/bash

# TODO: Figure this out, ya dummy!
ENV="development"

kill_all() {
    pgrep "$1" | xargs kill
}

kill_all nginx
kill_all mysql
kill_all php
sleep 1

nginx

if [ ! -d "/var/log/mysql" ]; then
    mkdir /var/log/mysql
    touch -f /var/log/mysql/mysql.log
fi

if [ "$ENV" == "development" ]; then
    su stephenkao -c "mysqld & > /var/log/mysql/mysql.log" -s /bin/sh

    php-fpm
else
    su -c "mysqld & > /var/log/mysql/mysql.log" -s /bin/sh stephenkao

    pgrep php || service php5-fpm restart
fi

exit 0
