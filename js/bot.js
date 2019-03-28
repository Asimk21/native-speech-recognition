function Bot(){


    this.sendToAIEngine = function(speech){
        text = speech.getLastRecordedData()
        console.log(text)
        if(text == ""){
            prepareResponse("Nothing recorded yet!")
        }else{
            $.ajax({
                type: 'POST',
                data:  JSON.stringify({"text": text}),
                contentType: 'application/json',
                url: '/apiEngine'
            }).done (function (data) {
                console.log("Data : " + typeof data )
                console.log(data)
                prepareResponse(data);
            });
        }

    }

    function prepareResponse(data ) {
        if(data === "Nothing recorded yet!"){
            var spokenResponse = "No recorded speech available"
        }else{
            var val = JSON.parse(data)
            var debugJSON = JSON.stringify(val, undefined, 2),
                spokenResponse = val['result']['fulfillment']['speech'];

        }
 
        var reply = new SpeechSynthesisUtterance();
        reply.voiceURI = "native";
        reply.text = spokenResponse;
        reply.lang = "en-UK";
        window.speechSynthesis.speak(reply);
    }
}
