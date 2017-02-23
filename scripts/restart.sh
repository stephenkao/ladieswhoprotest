#!/bin/bash

# TODO: Figure this out, ya dummy!
#ENV="development"

kill_all() {
    pgrep "$1" | xargs kill
}

if [ ! -d "/var/log/mysql" ]; then
    mkdir /var/log/mysql
#    touch -f /var/log/mysql/mysql.log
fi

if [ "$ENV" == "development" ]; then
    kill_all nginx
    kill_all mysql
    kill_all php
    sleep 1

    nginx

    su stephenkao -c "mysqld & > /var/log/mysql/mysql.log" -s /bin/sh

    php-fpm
else
    killall nginx && nginx
    service mysql stop && service mysql start
    service php5-fpm stop && service php5-fpm start
fi

exit 0
