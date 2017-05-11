var spotifyUtils = require('../spotify-utils');
var MessagingResponse = require('twilio').twiml.MessagingResponse;
var config = require('../config');

var client = require('twilio')(config.accountSid, config.authToken);

// Handle SMS submissions
module.exports = function(request, response) {

    var from = request.body.From;
    var to = request.body.To;
    var query = request.body.Body;

    spotifyUtils.getSongPreviewUrl(query, spotifyCallback);



    // respond with message TwiML content
    function respond(message) {
        var twiml = new MessagingResponse();
        twiml.message(message);
        response.type('text/xml');
        response.send(twiml.toString());
    }

    function makeCall(options) {
        client.calls.create(options)
            .then((message) => {
                console.log(message.responseText);
            })
            .catch((error) => {
                console.log(error);
                response.status(500);
            });
    }

    function spotifyCallback(artist, track, album, url) {
        if(!url) {
            respond("An error occurred querying Spotify!  Please try again.");
            return;
        }

        var options = {
            to: from,
            from: to,
            url: 'https://' + config.herokuAppName + '.herokuapp.com/api/call?url=' + encodeURIComponent(url)
        };

        var response = 'Top Spotify search result: ';
        response += '\nArtist: ' + artist + '\nTrack: ' + track + '\nAlbum: ' + album;
        response += '\nYou should receive a call with a song preview!';

        console.log(response);

        respond(response);

        makeCall(options);
    }
};