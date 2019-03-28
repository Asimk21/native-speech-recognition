$( document ).ready(function() {
	console.log('Starting SpeechRecognition library.');
	var speech = new SpeechToText();
	var bot = new Bot();

	$("#toggleButton").click(function(){
		console.log("Toggle Button Called")
		speech.toggleStartStop()
	});

	$("#sendToSlack").click(function(){
		console.log("Sending data to slack")
		speech.sendRecordedDataToSlack()
	});

	$("#sendToAIEngine").click(function(){
		console.log("Calling AI")
		bot.sendToAIEngine(speech)
	})
});