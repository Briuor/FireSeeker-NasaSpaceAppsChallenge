import requests
import json
import csv

spots = []
maps_api_key = 'AIzaSyBpvYF2XxF3UcBxSdgGrTqcy8TnoctbSS0'

with open('temp.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    line_counter = 0
    for row in readCSV:
        if line_counter > 0:
            lat = row[0]
            lon = row[1]
            res = requests.get('https://maps.googleapis.com/maps/api/geocode/json?latlng={},{}&key={}'.format(lat,lon,maps_api_key))
            data = res.json()
            formatted_address = data['results'][0]['formatted_address']
            try:
                city = data['results'][0]['address_components'][2]['long_name']
            except:
                city = 'Unknown'
            try:
                uf = data['results'][0]['address_components'][3]['long_name']
            except:
                uf = 'Unknown'
            confidence = row[8]
            spot = {'latitude':lat,'longitude':lon,'address':formatted_address,'city':city,'state':uf,'confidence':confidence}
            spots.append(spot)
        line_counter += 1
        print('Getting info of row #{}'.format(line_counter))

print({'spots':spots})
res = requests.post('http://localhost:4000/addcoordinates', json={'spots':spots})