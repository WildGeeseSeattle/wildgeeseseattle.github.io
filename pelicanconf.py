#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'George V. Reilly'
SITENAME = 'Wild Geese Players of Seattle'
SITEURL = ''
THEME = 'theme/green-goose'

PATH = 'content'
STATIC_PATHS = ['extras', 'posters', 'images', 'scripts']

TIMEZONE = 'America/Los_Angeles'
DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
# LINKS = (('Pelican', 'http://getpelican.com/'),
#          ('Python.org', 'http://python.org/'),
#          ('Jinja2', 'http://jinja.pocoo.org/'),
#          ('You can modify those links in your config file', '#'),)

# the Wild Geese Players of Seattle Social widget
# SOCIAL = (('You can add links in your config file', '#'),
#           ('Another social link', '#'),)

DEFAULT_PAGINATION = 4

EXTRA_PATH_METADATA = {
    'extras/favicon.ico': {'path': 'favicon.ico'},
    'extras/CNAME': {'path': 'CNAME'},
}
TYPOGRIFY = True

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
