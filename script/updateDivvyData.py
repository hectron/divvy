import json
import urllib2
import psycopg2

# Set up a quick object. I don't believe that we need to create a <class>.py
# for the purpose of scrapping. This allows easy JSON mapping.
class Station:
    pass

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
    conn = psycopg2.connect("dbname='divvy' user='hectorrios'")
    cur = conn.cursor()

    query = 'CREATE TABLE IF NOT EXISTS monthly.station_history(id SERIAL PRIMARY KEY, station_id INT, available_docks INT, status_key INT, available_bikes INT, inserted TIMESTAMP DEFAULT current_timestamp);'

    try:
        cur.execute(query)

        for station in stations_as_objects:
            query = 'INSERT INTO monthly.station_history(station_id, available_docks, status_key, available_bikes) VALUES (%d, %d, %d, %d);' % (station.id, station.availableDocks, station.statusKey, station.availableBikes)
            cur.execute(query)

        print('Getting ready to save!')
    except:
        print('Error!')
        conn.rollback()

    conn.commit()
    cur.close()
    conn.close()

print 'Done.'
