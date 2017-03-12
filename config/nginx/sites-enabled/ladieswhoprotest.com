server {
  # Ports to listen on
  listen 80;

  # Server name to listen for
  server_name ladieswhoprotest.com;

  # Path to document root
  root /home/stephenkao/workspace/stephenkao/ladieswhoprotest;

  # File to be used as index
  index index.html;

  # Overrides logs defined in nginx.conf, allows per-site logs.
  access_log /var/log/nginx/ladieswhoprotest.com/access.log;
  error_log /var/log/nginx/ladieswhoprotest.com/error.log;

  # Default server block rules
  include global/server/defaults.conf;

  # REST API
  # rewrite ^/wordpress/wp-json /wordpress/index.php last;
  rewrite ^/wp-json /wordpress/index.php last;

  rewrite ^/wordpress/wp-login/?$ /wordpress/wp-login.php last;
  rewrite ^/wordpress/wp-admin/?$ /wordpress/wp-admin/index.php last;

  # DEV-ONLY
  location ~ ^/(protests|share|home|about|locate) {
    proxy_pass http://127.0.0.1:3000;
    proxy_redirect off;
  }

  location ~ \.php$ {
#    root /home/stephenkao/workspace/stephenkao/ladieswhoprotest/wordpress;

    try_files $uri $uri/ =404;

    fastcgi_intercept_errors on;
    fastcgi_pass unix:/var/run/php5-fpm.sock;
    fastcgi_split_path_info ^(.+\.php)(/.*)$;

    fastcgi_param HTTP_PROXY "";
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_param HTTPS off;
    fastcgi_buffer_size 16k;
    fastcgi_buffers 4 16k;

    include fastcgi_params;
    include global/fastcgi-params.conf;
  }

  # location ~ ^/wordpress/*/\.(js|jpg|png|css)$ {
  #    root /home/stephenkao/workspace/stephenkao/ladieswhoprotest/wordpress;
  # }

  ## Static files are served directly.
  location ~ ^/wp-includes/\.(?:css|gif|htc|ico|js|jpe?g|png|swf)$ {
    root /home/stephenkao/workspace/stephenkao/ladieswhoprotest/wordpress/wp-includes;

    expires max;
    log_not_found off;

    ## No need to bleed constant updates. Send the all shebang in one
    ## fell swoop.
    tcp_nodelay off;

    ## Set the OS file cache.
    open_file_cache max=1000 inactive=120s;
    open_file_cache_valid 45s;
    open_file_cache_min_uses 2;
    open_file_cache_errors off;
  }

  # location ~ ^wordpress/wp/*$ {
  #   try_files /home/stephenkao/workspace/stephenkao/ladieswhoprotest/wordpress/wp-includes/rest-api.php =404;
  # }
}

# Redirect www to non-www
server {
  listen 80;
  server_name www.ladieswhoprotest.com;

  return 301 $scheme://ladieswhoprotest.com$request_uri;
}
