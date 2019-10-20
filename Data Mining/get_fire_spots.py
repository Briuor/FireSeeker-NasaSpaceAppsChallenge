import requests
import string
import json
import csv

spots = []
maps_api_key = 'AIzaSyBpvYF2XxF3UcBxSdgGrTqcy8TnoctbSS0'

with open('MODIS_C6_South_America_24h.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    line_counter = 0
    for row in readCSV:
        if line_counter > 0:
            lat = row[0]
            lon = row[1]
            res = requests.get('https://maps.googleapis.com/maps/api/geocode/json?latlng={},{}&key={}'.format(lat,lon,maps_api_key))
            data = res.json()
            formatted_address = data['results'][0]['formatted_address']
            l = len(data['results'][0]['address_components'])
            if l == 1:
                city = 'Unknown'
                uf = 'Unknown'
            elif l == 5:
                city = data['results'][0]['address_components'][1]['long_name']
                uf = data['results'][0]['address_components'][2]['long_name']
            elif l == 4 or l == 3:
                city = data['results'][0]['address_components'][0]['long_name']
                uf = data['results'][0]['address_components'][1]['long_name']           
                for char in city:
                    pos = string.digits
                    if pos.find(char) != -1 or city[0] == 'U':
                        city = data['results'][0]['address_components'][1]['long_name']
                        uf = data['results'][0]['address_components'][2]['long_name']
                        break
            elif l == 6:
                city = data['results'][0]['address_components'][2]['long_name']
                uf = data['results'][0]['address_components'][3]['long_name']
            elif l == 7:
                city = data['results'][0]['address_components'][3]['long_name']
                uf = data['results'][0]['address_components'][4]['long_name']
            confidence = row[8]
            _city = ''
            for char in city:
                if char != "'":
                    _city += char
            city = _city
            spot = {'latitude':lat,'longitude':lon,'address':formatted_address,'city':city,'state':uf,'confidence':confidence}
            spots.append(spot)
        line_counter += 1
        print('Getting info of row #{}'.format(line_counter))

res = requests.post('http://localhost:4000/addcoordinates', json={'spots':spots})