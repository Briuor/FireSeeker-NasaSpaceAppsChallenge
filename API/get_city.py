import requests
import string
import json
import sys

maps_api_key = 'AIzaSyBpvYF2XxF3UcBxSdgGrTqcy8TnoctbSS0'
lat = sys.argv[1]
lon = sys.argv[2]

res = requests.get('https://maps.googleapis.com/maps/api/geocode/json?latlng={},{}&key={}'.format(lat,lon,maps_api_key))
data = res.json()

l = len(data['results'][0]['address_components'])
if l == 1:
    city = 'Unknown'
elif l == 5:
    city = data['results'][0]['address_components'][1]['long_name']
elif l == 4 or l == 3:
    city = data['results'][0]['address_components'][0]['long_name']          
    for char in city:
        pos = string.digits
        if pos.find(char) != -1 or city[0] == 'U':
            city = data['results'][0]['address_components'][1]['long_name']
            break
elif l == 3:
    city = 'Unknown'
elif l == 6:
    city = data['results'][0]['address_components'][2]['long_name']
elif l == 7:
    city = data['results'][0]['address_components'][3]['long_name']
_city = ''
for char in city:
    if char != "'":
    	_city += char
city = _city
print(city, end='')