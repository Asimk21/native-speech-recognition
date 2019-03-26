var fs = require("fs");
var https = require('https');
var express = require('express');
var app = express();
var path = require('path');
var SlackWebhook = require('slack-webhook')
var bodyParser = require('body-parser')
var CONFIG = require('./config.json')

var webhookToken = CONFIG.slackWebhookToken


app.use('*/js',express.static('js'));
app.use( bodyParser.json() );

app.use(express.json());

var privateKey = fs.readFileSync(__dirname+'/certs/privatekey.pem').toString();
var certificate = fs.readFileSync(__dirname+'/certs/certificate.pem').toString();


var httpOptions = {key: privateKey, cert: certificate};

https.createServer(httpOptions, app).listen(8080, () => {
	console.log(">> Serving on " + 8080);
});


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/slack', function (req, res) {
	var slack = new SlackWebhook('https://hooks.slack.com/services/'+ webhookToken)
	console.log("Posting Slack with data : " + JSON.stringify(req.body.text))
  	slack.send(JSON.stringify(req.body.text))
  	res.redirect(req.get('referer'));
})
