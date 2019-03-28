function SpeechToText() {
    recognition = new webkitSpeechRecognition();
    recognition.interimResults = true;
    var recognizing;
    // this.recognition.continuous = false;
    recorded_data = [];


    this.toggleStartStop = function() {
        console.log("Recognizing " + recognizing)
        if (recognizing) {
            console.log("Stopping recording")
            recognition.stop();
            recognition.abort();
            this.reset();
        }else {
            console.log("Start recording")
            recognition.start();
            recognizing = true;
            toggleButton.innerHTML = "Click to Stop Recording";
        }
    }

    this.sendRecordedDataToSlack = function(){
        console.log("Sending Recorded data")
        if (recorded_data === undefined || recorded_data.length === 0){
            console.log("Nothing to send")
        }else{
            $.ajax({
              type: 'POST',
              data: JSON.stringify({"text": recorded_data}),
              contentType: 'application/json',
              url: '/slack'
            });
        }
        
        recorded_data = []
        document.getElementById("sendToAIEngine").disabled = true
        document.getElementById("sendToSlack").disabled = true

    }

    recognition.onresult = function(e) {
        const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')

        if(e.results[0].isFinal){
            recorded_data.push(transcript); 
        }

        if(! (recorded_data === undefined || recorded_data.length === 0) ) {
            console.log("recorded_data present")
            document.getElementById("sendToAIEngine").disabled = false
            document.getElementById("sendToSlack").disabled = false
        }

    }

    recognition.onend = function(e){
        if(recognizing){
            recognition.start();
            recognizing = true; 
        }
        console.log("End :" +recorded_data)
        
    }

    recognition.onerror = function(e) {
        recognition.stop();
    }

    this.reset = function(){
        recognizing = false;
        toggleButton.innerHTML = "Click to Start Recording"
    }

    this.getLastRecordedData = function(){
        if(recorded_data === undefined || recorded_data.length === 0){
            return ""
        }else{
            return recorded_data[recorded_data.length - 1]
        }
    }

}