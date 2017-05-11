var VoiceResponse = require('twilio').twiml.VoiceResponse;

// Handle calls
module.exports = function(request, response) {
    var twiml = new VoiceResponse();

    function pause(length) {
        twiml.pause(length);
    };

    function say(text) {
        twiml.say({ voice: 'alice'}, text);
    };

    function play(url) {
        if(!url) {
            say("Oops!  An error has occurred.  Please try again.");
        }
        
        twiml.play(url);
    }

    function respond() {
        response.type('text/xml');
        response.send(twiml.toString());
    }

    function playAndRespond(url) {
        play(url);
        respond();
    }

    var url = decodeURIComponent(request.query.url);

    pause(2);
    say('Here are your sweet tunes!');
    pause(.5);
    playAndRespond(url);

    return;
};