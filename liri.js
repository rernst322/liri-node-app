
//key
var key = require('./key.js');

var request = require('request');

//twitter info
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: key.twitter_consumer_key,
  consumer_secret: key.twitter_consumer_secret,
  access_token_key: key.twitter_access_token_key,
  access_token_secret: key.twitter_access_token_secret
});


//spotify info

var Spotify = require('node-spotify-api');

var spotify = new Spotify ({
  id: key.spotify_client_id,
  secret: key.spotify_client_secret
});


//movie info
var omdb = require('omdb');

//intake
var cmdLine = process.argv[2];

var fs = require('fs');

//var name = process.argv.splice(3).join('+');

//twitter function
//my-tweets

function myTweet() {

var params = {screen_name: 'eener322'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log("Tweets have been loaded!");
    for (var i = 0; i < tweets.length; i++){
    	console.log("# " + (i+1) + " @eener322 : " + tweets[i].text + "\n  [" + tweets[i].created_at + " ]");

    };
   }
   else {
    	console.log(error);
    }
});



};

//spotify function 
//spotify-this-song

function spotifyThis(){

var songName = process.argv.splice(3).join('+');


spotify
.request('https://api.spotify.com/v1/search?q=*'+songName+'*&type=track')
.then(function(data){

	if (data.tracks.items.length === 0) {
		console.log("Error Occured");
		
	}
	else{
	 console.log("Artist: " + data.tracks.items[0].artists[0].name);
	 console.log("Song Name: " + data.tracks.items[0].name);
	 console.log("Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify);
	 console.log("Album: " + data.tracks.items[0].album.name);

	 fs.appendFile('random.txt', "\nArtist: " + data.tracks.items[0].artists[0].name + "\nSong Name: " + data.tracks.items[0].name + "\nSpotify Preview Link: " + data.tracks.items[0].external_urls.spotify + "\nAlbum: " + data.tracks.items[0].album.name + "\n= = = = = = = = = = = = = = = = = = = = = = = ");

	}
});
};
 




//movie
//movie-this

function movieSearch(){

	var movieName = process.argv.splice(3).join('+');

	if(!movieName) {
		movieName = 'Mr+Nobody';
	}
	request("http://www.omdbapi.com/?apikey=trilogy&t=" + movieName + "&y=&plot=full", function(err, data, body){
		if(err){
			console.log("Jesus Christ Figure it Out KID!!!");
		}
		else{
			var mData = JSON.parse(data.body);
			console.log(" ");
			console.log("Title: " + mData.Title);
			console.log("Year: " + mData.Year);
			console.log("Featuring: "+ mData.Actors);
			console.log("Produced in: "+ mData.Country);
			console.log("Language of " + mData.Title + " : " + mData.Language);

			console.log("--------------")
			console.log("IMBD Rating: " + mData.imdbRating);
			console.log("Rotten Tomatoes: " + mData.Ratings[1].Value);
			console.log("--------------");
			console.log("Plot: "+ mData.Plot);
			console.log("--------------");
		}
				
		
	});

};

//do-what-it-says
/*
function doIt(){
	fs.readFile("random.txt", "utf8", function(error, data){
		

		if(error){
			console.log(error);
		}
		cmdLine = data.split(',')[0];
		console.log(cmdLine);
		name = data.split(',')[1];
		console.log(name);
		
	})
};
*/

//Liri Command Lines

switch(cmdLine) {
	case 'do-what-it-says':
	//doIt();
		fs.readFile('random.txt', 'utf8', function(error, data){
			switch(data.split(',')[0]){
				case 'spotify-this-song': 
				spotifyThis(data.split(',')[1]);
				console.log("NOPE")
				break;
			case 'my-tweets':
				myTweet();
				console.log("here");
				//break;
				case 'movie-this':
					movieSearch(data.split(',')[1]);
					//break;
				default:
					console.log("didnt work silly goose");
			};
		});
	case 'my-tweets':
	myTweet();
	console.log("here2");
	//break;
	case 'spotify-this-song':
	spotifyThis();
	break;
	case 'movie-this':
	movieSearch();
	break;
	default:
	console.log("Well that DEF didnt work");
	console.log("░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░")
console.log("░░░░░░░░░░░░░░░░▄▄███▄▄▄░▄▄██▄░░░░░░░")
console.log("░░░░░░░░░██▀███████████████▀▀▄█░░░░░░")
console.log("░░░░░░░░█▀▄▀▀▄██████████████▄░░█░░░░░")
console.log("░░░░░░░█▀▀░▄██████████████▄█▀░░▀▄░░░░")
console.log("░░░░░▄▀░░░▀▀▄████████████████▄░░░█░░░")
console.log("░░░░░▀░░░░▄███▀░░███▄████░████░░░░▀▄░")
console.log("░░░▄▀░░░░▄████░░▀▀░▀░░░░░░██░▀▄░░░░▀▄")
console.log("░▄▀░░░░░▄▀▀██▀░░░░░▄░░▀▄░░██░░░▀▄░░░░")
console.log("█░░░░░█▀░░░██▄░░░░░▀▀█▀░░░█░░░░░░█░░░")
console.log("█░░░▄▀░░░░░░██░░░░░▀██▀░░█▀▄░░░░░░▀▀▀")
console.log("▀▀▀▀░▄▄▄▄▄▄▀▀░█░░░░░░░░░▄█░░█▀▀▀▀▀█░░")
console.log("░░░░█░░░▀▀░░░░░░▀▄░░░▄▄██░░░█░░░░░▀▄░")
console.log("░░░░█░░░░░░░░░░░░█▄▀▀▀▀▀█░░░█░░░░░░█░")
console.log("░░░░▀░░░░░░░░░░░░░▀░░░░▀░░░░▀░░░░░░░░")
console.log("░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░")
};




