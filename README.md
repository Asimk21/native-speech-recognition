# Generate Certs

openssl genrsa -out privatekey.pem 1024 

openssl req -new -key privatekey.pem -out certrequest.csr 

openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem



# Slack

Replace SLACK_WEBHOOK_TOKEN with actual token in config.json file
