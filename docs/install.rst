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

Set up GIT
----------
