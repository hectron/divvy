import os
import sys
import multiprocessing
import json
import time
import urlparse
import urllib2
import psycopg2

# Set up a quick object. I don't believe that we need to create a <class>.py
# for the purpose of scrapping. This allows easy JSON mapping.
class Station:
    pass

def scrape():
    ''' scrapes information from divvy and stores it in a table.'''

    response = urllib2.urlopen('http://divvybikes.com/stations/json')
    data = json.load(response)

    # Divvy data is wrapped. Check out the fixture.json file for a snapshot.
    # Ex: { executionTime: @string, stationBeanList: @dict containing the stations}

    stations = data['stationBeanList'] if data.has_key('stationBeanList') else []
    stations_as_objects = []

    for s in stations:
        station = Station()

        # Set up the object. Very primative way of creating one.
        # Refer to bit.ly/1nluXtq
        station.id = s['id']
        station.availableDocks = s['availableDocks']
        station.statusKey = s['statusKey']
        station.availableBikes = s['availableBikes']

        stations_as_objects.append(station)

    if len(stations_as_objects) > 0:

        # check if we're in Heroku
        if os.environ.__contains__('DATABASE_URL'):
            urlparse.uses_netloc.append('postgres')
            url = urlparse.urlparse(os.environ['DATABASE_URL'])

            conn = psycopg2.connect(
                    database=url.path[1:],
                    user=url.username,
                    password=url.password,
                    host=url.hostname,
                    port=url.port
            )
        else:
            print("Connecting without HEROKU!")
            conn = psycopg2.connect("dbname='divvydata' user='' password=''")

        cur = conn.cursor()

        query = 'CREATE TABLE IF NOT EXISTS monthly.station_history(id SERIAL PRIMARY KEY, station_id INT, available_docks INT, status_key INT, available_bikes INT, inserted TIMESTAMP DEFAULT current_timestamp);'

        try:
            print("Executing query....")
            cur.execute(query)
            print("Starting station query...")

            for station in stations_as_objects:
                query = 'INSERT INTO monthly.station_history(station_id, available_docks, status_key, available_bikes) VALUES (%d, %d, %d, %d);' % (station.id, station.availableDocks, station.statusKey, station.availableBikes)
                cur.execute(query)

            print('Getting ready to save!')
        except:
            print('Error:', sys.exc_info()[0])
            conn.rollback()

        conn.commit()
        cur.close()
        conn.close()
# end of scrape

# allow the scrapping to be done on a different thread
scaper = multiprocessing.Process(target=scrape)
scaper.start()

# meanwhile the scrapping is done, we wait 60 seconds
timeout = 60
time.sleep(timeout)

# this hits after the timeout, so kill the thread even if it's not done
scaper.terminate()

print 'Done.'
