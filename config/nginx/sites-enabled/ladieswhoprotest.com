server {
  # Ports to listen on
  listen 80;

  # Server name to listen for
  server_name ladieswhoprotest.com;

  # Path to document root
  root /Users/stephenkao/workspace/stephenkao/ladieswhoprotest;

  # File to be used as index
  index index.html;

  # Overrides logs defined in nginx.conf, allows per-site logs.
  access_log /var/log/nginx/ladieswhoprotest.com/access.log;
  error_log /var/log/nginx/ladieswhoprotest.com/error.log;

  # Default server block rules
  include global/server/defaults.conf;

  # REST API
  rewrite ^/wordpress/wp-json /wordpress/index.php last;

  location ~ \.php$ {
#    try_files $uri $uri/ =404;
    try_files $uri $uri/ /index.php$is_args$args;

    fastcgi_intercept_errors on;
    fastcgi_pass unix:/var/run/php5-fpm.sock;
    fastcgi_split_path_info ^(.+\.php)(/.*)$;

    fastcgi_param HTTP_PROXY "";
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_param HTTPS off;
#    fastcgi_buffer_size 16k;
#    fastcgi_buffers 4 16k;

    include fastcgi_params;
    include global/fastcgi-params.conf;
  }

  location ~* ^wordpress\.(js|jpg|png|css)$ {
     root /Users/stephenkao/workspace/stephenkao/ladieswhoprotest/wordpress;
     expires 30d;
  }


  location ~ ^wordpress/wp/*$ {
    try_files /Users/stephenkao/workspace/stephenkao/ladieswhoprotest/wordpress/wp-includes/rest-api.php =404;
  }

  location / {
    try_files $uri $uri/ /index.html?$args;
  }

}

# Redirect www to non-www
server {
  listen 80;
  server_name www.ladieswhoprotest.com;

  return 301 $scheme://ladieswhoprotest.com$request_uri;
}
