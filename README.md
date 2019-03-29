# Generate Certs

openssl genrsa -out privatekey.pem 1024 

openssl req -new -key privatekey.pem -out certrequest.csr 

openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem



# Slack

Replace SLACK_WEBHOOK_TOKEN and DIALOGFLOW_CLIENT_TOKEN with actual tokens in config.json file

# Run

`npm install`
`node server.js`

```
Navigate to https://localhost:8080
Click start to record
Speak in English
Click stop recording
Send to slack
```
