import json
import urllib2

response = urllib2.urlopen('http://divvybikes.com/stations/json')
data = json.load(response)
print data
