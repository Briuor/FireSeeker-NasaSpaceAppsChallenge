import requests
import smtplib
import json
import sys

EMAIL_DEST = 'erick.teixeira_50@hotmail.com'
EMAIL_ADDRESS = 'projetorastreadorcom241@gmail.com'
PASSWORD = 'rastreador-admin'
subject = 'You have been Invited'
msg = 'Some people need your help! Please login in your FireSeeker account.'

def notify_me(subject, msg):
    try:
        server = smtplib.SMTP('smtp.gmail.com:587')
        server.ehlo()
        server.starttls()
        server.login(EMAIL_ADDRESS, PASSWORD)
        message = 'Subject: {}\n\n{}'.format(subject, msg)
        server.sendmail(EMAIL_ADDRESS, EMAIL_DEST, message)
        server.quit()
        print("Mail sent")
    except:
        print("Mail not sent")

st = ''
for char in sys.argv[1]:
	if char == '_':
		st += ' '
	else:
		st += char

user_ids = []
request_ids = []



res = requests.post('http://localhost:4000/useridbystate', json={'state':st})
data = res.json()
for _id in data:
	user_ids.append(_id['id'])
res = requests.post('http://localhost:4000/lastrequestidbystate', json={'state':st})
data = res.json()
for _id in data:
	request_ids.append(_id['id'])

print(user_ids)
print(request_ids)

for uid in user_ids:
	for rid in request_ids:
		res = requests.post('http://localhost:4000/addrequesttouser', json={'user_id':uid,'request_id':rid})

for uid in user_ids:
	res = requests.post('http://localhost:4000/emailbyid', json={'id':uid})
	data = res.json()
	EMAIL_DEST = data[0]['email']
	print(EMAIL_DEST)
	notify_me(subject,msg)