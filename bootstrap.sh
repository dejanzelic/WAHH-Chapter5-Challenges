#!/usr/bin/env bash

#update and prepare dependencies 
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y curl

if [ -f /etc/is_vagrant_vm ] 
then
	app_home="/vagrant"
else
	is_prod=true
	app_home="/var/www/chapter5"
	$s3Bucket=""
fi

# Install Node
if command -v node; then
	echo "Node is already installed"
else
	curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
	apt-get install -y nodejs
fi

if [ "$is_prod" = true ]; then
	echo "Running in Prod"
	sudo apt-get install awscli -y
	mkdir -p $app_home
	aws s3 --recursive cp $s3Bucket $app_home
fi

if ! [ -L $app_home/node_modules ]; then
	cd $app_home && npm install 
fi

if [ "$is_prod" = true ]; then
	npm install -g pm2
	pm2 start $app_home/bin/www
	iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
	iptables -t nat -I OUTPUT -p tcp -o lo --dport 80 -j REDIRECT --to-ports 8080
fi
