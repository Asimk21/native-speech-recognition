$( document ).ready(function() {
	console.log('Starting SpeechRecognition library.');
	var speech = new SpeechToText();

	$("#toggleButton").click(function(){
		console.log("Toggle Button Called")
		speech.toggleStartStop()
	});

	$("#sendToSlack").click(function(){
		console.log("Sending data to slack")
		speech.sendRecordedDataToSlack()
	});
});