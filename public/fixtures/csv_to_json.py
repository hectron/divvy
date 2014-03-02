import csv
import sys
import json

# The column headers should be parsed into a list in an upcoming improvement. 
# Otherwise, we hard code them here.

column_headers = [
    'trip_id', 'starttime', 'stoptime', 'bikeid', 'tripduration', 'from_station_id',
    'from_station_name', 'to_station_id', 'to_station_name', 'usertype', 'gender', 'birthday']

column_headers = ['id','name','latitude','longitude','dpcapacity','landmark','online date']

def convert(filename):
    ''' Converts the file from *.csv to *.json, 
    maintaining the same file name.'''

    try:
        print "Opening CSV file: {0}".format(filename)

        csv_file = open(filename, 'r')

        csv_reader = csv.DictReader(csv_file, column_headers)

        json_filename = filename.split('.')[0] + '.json'

        print 'Saving JSON to file: {0}'.format(json_filename)

        json_file = open(json_filename, 'w')

        data = json.dumps([row for row in csv_reader])

        json_file.write(data)

        csv_file.close()
        json_file.close()

        print 'Complete!'
    except:
        print 'Unexpected error: ', sys.exc_info()[0]

    raw_input('Press any key to exit')

if __name__ == '__main__':
    try:
        arguments = sys.argv[1:]
        convert(arguments[0])
    except IndexError:
        print 'Errors with arguments given. ', IndexError
        sys.exit()
    