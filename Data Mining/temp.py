import requests

res = requests.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=-22.4135404,-45.449724&key=AIzaSyBpvYF2XxF3UcBxSdgGrTqcy8TnoctbSS0')

data = res.json()
formatted_address = data['results'][0]['formatted_address']
city = data['results'][0]['address_components'][2]['long_name']
uf = data['results'][0]['address_components'][3]['long_name']

print(formatted_address)
print(city)
print(uf)