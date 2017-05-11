var spotify = require('spotify');

exports.getSongPreviewUrl = function(query, callback) {
	console.log("query: " + query);

	spotify.search(
	{
		type: 'artist,track',
		query: query
	},
	function(err, searchResults) {
		if(err) {
			console.log("An error occurred searching spotify!");
		} else {
			try {
				var firstResult = searchResults['tracks']['items'][0];
				var previewUrl = firstResult['preview_url'];
				var artist = firstResult['artists'][0].name;
				var track = firstResult['name'];
				var album = firstResult['album']['name'];

				callback(artist, track, album, previewUrl);
			} catch(e) {
				callback(null, null, null, null);
			}
		}
	});
};