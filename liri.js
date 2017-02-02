// //import keys.js
var keys = require('./keys.js');

var request = require("request"); //installed

var nodeArgs= process.argv;

var inquirer = require('inquirer'); //installed
 
var Twitter = require('twitter'); //installed

var spotify = require('spotify'); //installed

function spotifySeach(songName) {
    var song = process.argv[3];
    if(!song){
      song = "The Sign";
    }
    params = song;
    spotify.search({ type: "track", query: params }, function(err, data) {
      if(!err){
        var songInfo = data.tracks.items;
        for (var i = 0; i < 5; i++) {
          if (songInfo[i] != undefined) {
            var spotifyResults =
            "Artist: " + songInfo[i].artists[0].name + "\r\n" +
            "Song: " + songInfo[i].name + "\r\n" +
            "Preview Url: " + songInfo[i].preview_url + "\r\n" + 
            "Album the song is from: " + songInfo[i].album.name + "\r\n";
            console.log(spotifyResults);
            log(spotifyResults); // calling log function
          }
        }
      } else {
        console.log("Error :"+ err);
        return;
      }
    });
  };
// function spotifySearch (){
 
//   var song = process.argv[3];

//   spotify.search({ type: 'track', query: song }, function(err, data) {
//       if ( err ) {
//           console.log('Error occurred: ' + err);
//           return;
//       }

//   });


//     inquirer.prompt([
//         {
//             type: 'input',
//             message: 'Enter song:',
//             name: "song",
//             default: parameter
//         }

//         //once the song is entered, pulls the spotify information
//     ]).then(function (song) {
//         var spotifyApi = new Spotify({
//         });

//         spotifyApi.searchTracks(song.song, {limit: 1}).then(function (data) {
//             var tracks = data.body.tracks.items;
//             for (var i in tracks) {
//                 console.log("Artist: " + tracks[i].artists[0].name);
//                 console.log("Song: " + tracks[i].name);
//                 console.log("Preview: " + tracks[i].preview_url);
//                 console.log("Album: " + tracks[i].album.name);
//             }
//         });
//     });
// }

var twitterDisplay = function(){
  var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret,
  });

  var params = {screen_name: '@anna_kimtis'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for(i=2, i)
      console.log(tweets.Date);
      console.log(tweets.Tweet);
    }
  });

  
  };



var movieSearch = function(){
  var movie ="";

  for (var i=3; i<nodeArgs.length; i++ ){
    console.log(nodeArgs[i]);
    if (i>3){
      movie = movie +"+"+ nodeArgs[i]
    }else{
      movie += nodeArgs[i]
    };
    console.log(movie);
  }
  // Then run a request to the OMDB API with the movie specified
  request("http://www.omdbapi.com/?t="+movie+"=&plot=short&r=json", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("The movie's title is: " + JSON.parse(body).Title);
    console.log("The Year the movie was released is: " + JSON.parse(body).Year);
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    console.log("The movie was produced in: " + JSON.parse(body).Country);
    console.log("The movie's language is: " + JSON.parse(body).Language);
    console.log("The movie's plot is: " + JSON.parse(body).Plot);
    console.log("The movie's actors are: " + JSON.parse(body).Actors);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
    console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);

//     // console.log("The movie's Rotten Tomato's rating is: " + JSON.parse(body).);
//     // console.log("Rotten Tomato's URL: " + JSON.parse(body).);
  }
});
}

switch(nodeArgs[2]) {
    case "my-tweets":
        console.log("my-tweets")
        twitterDisplay();
        break;
    case "spotify-this-song":
        console.log("spotify-this-song")
        spotifySearch();
        break;
    case "movie-this":
        console.log("movie-this!");
        movieSearch();
        break;
    case "do-what-it-says":
        console.log("do-what-it-says")
        break;
    default:
        console.log("none")
}

// function spotify() {


//     

// function itSays() {
//     fs.readFile("random.txt", "utf8", function(error, random) {
//        var randomTxt = random.split(',');
//         prompt = randomTxt[0];
//         parameter = randomTxt[1];
//         movie = randomTxt[1];
//         switchFunction(prompt);
//     });
// }
