server {
	# Ports to listen on
	listen 80;

	# Server name to listen for
	server_name ladieswhoprotest.com;

	# Path to document root
	root /Users/stephenkao/workspace/stephenkao/ladieswhoprotest/dist;

	# File to be used as index
	index index.html;

	# Overrides logs defined in nginx.conf, allows per-site logs.
	access_log /sites/ladieswhoprotest.com/logs/access.log;
	error_log /sites/ladieswhoprotest.com/logs/error.log;

	# Default server block rules
	include global/server/defaults.conf;

	location / {
		try_files $uri $uri/ /index.html?$args;
	}

	location ~ \.php$ {
		try_files $uri =404;
		include global/fastcgi-params.conf;

		# Change socket if using PHP pools or PHP 5
		fastcgi_pass unix:/run/php/php7.0-fpm.sock;
		#fastcgi_pass unix:/var/run/php5-fpm.sock;
	}
}

# Redirect www to non-www
server {
	listen 80;
	listen [::]:80;
	server_name www.ladieswhoprotest.com;

	return 301 $scheme://ladieswhoprotest.com$request_uri;
}