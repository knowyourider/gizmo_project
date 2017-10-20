Gizmo startu 2017
=====================

Create local first
---------------------

- Create dir -- gizmo_project

set up virtual env
-------------------

- Chicken and egg: I have command for attching to existing
- make phony dir until I make djnago app?
::
	mkvirtualenv -a /Users/don/Sites/gizmo_project/gizmo --python=/usr/local/bin/python3 gizmo

Install Django
--------------

first switch to new virt env
Install django, psycopg2, unipath
::
	workon gizmo
	pip install django
	pip install psycopg2
	pip install unipath

Start app
--------------

delete the temp dir (gizmo) and re-create as app
In Terminal in project
::
	cd ..
	rmdir gizmo
	django-admin.py startproject gizmo
	
- rename inner proj name to conf
- create docs dir (and save these notes there!)
- set up setting per two scoops


Install on eApps
================

Get Git
---------

Logged in as gizmo_user
::
	cd /var/www/gizmo_user/data/www
	git clone https://github.com/knowyourider/gizmo_project.git digitalgizmo.com.vm-host.net

Setup virtual environment and install Django
---------------------------------------------

Logged in as root
::
	mkvirtualenv -a  /var/www/gizmo_user/data/www/digitalgizmo.com.vm-host.net/gizmo --python=/usr/local/bin/python3.4 gizmo


Config Apache
--------------

Additions to apache
in /etc/httpd/conf/http...
::
	<VirtualHost 68.169.50.201:80 >
		ServerName digitalgizmo.com.vm-host.net
		CustomLog /var/www/httpd-logs/digitalgizmo.com.vm-host.net.access.log combined
		DocumentRoot /var/www/gizmo_user/data/www/digitalgizmo.com.vm-host.net
		ErrorLog /var/www/httpd-logs/digitalgizmo.com.vm-host.net.error.log
		ServerAdmin donpublic@digitalgizmo.com
		ServerAlias www.digitalgizmo.com.vm-host.net
		SuexecUserGroup gizmo_user gizmo_user

		Alias /static/ /var/www/gizmo_user/data/www/gizmo_static/
		WSGIDaemonProcess production python-path=/var/www/gizmo_user/data/www/digitalgizmo.com.vm-host.net/gizmo:/var/www/gizmo_user/data/.envs/gizmo/lib/python3.4/site-packages
		WSGIProcessGroup production
		WSGIScriptAlias / /var/www/gizmo_user/data/www/digitalgizmo.com.vm-host.net/gizmo/config/wsgi.py

	</VirtualHost>
	<Directory /var/www/gizmo_user/data/www/digitalgizmo.com.vm-host.net/gizmo>
		Options +Includes -ExecCGI
	</Directory>
