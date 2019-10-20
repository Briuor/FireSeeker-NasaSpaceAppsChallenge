from unicodedata import normalize
import requests
import string
import json
import sys

def remover_acentos(txt):
    return normalize('NFKD', txt).encode('ASCII', 'ignore').decode('ASCII')

maps_api_key = 'AIzaSyBpvYF2XxF3UcBxSdgGrTqcy8TnoctbSS0'
lat = sys.argv[1]
lon = sys.argv[2]
st = sys.argv[3]

res = requests.get('https://maps.googleapis.com/maps/api/geocode/json?latlng={},{}&key={}'.format(lat,lon,maps_api_key))
data = res.json()

l = len(data['results'][0]['address_components'])
if l == 1:
    uf = 'Unknown'
elif l == 5:
    uf = data['results'][0]['address_components'][2]['long_name']
elif l == 4 or l == 3:
    uf = data['results'][0]['address_components'][1]['long_name']
    city = data['results'][0]['address_components'][0]['long_name']           
    for char in city:
        pos = string.digits
        if pos.find(char) != -1 or city[0] == 'U':
            uf = data['results'][0]['address_components'][2]['long_name']
            break
elif l == 6:
    uf = data['results'][0]['address_components'][3]['long_name']
elif l == 7:
    uf = data['results'][0]['address_components'][4]['long_name']
print(remover_acentos(uf)+"|"+st, end='')