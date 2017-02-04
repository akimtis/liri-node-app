// //import keys.js
var keys = require('./keys.js');

var request = require("request"); //installed

var nodeArgs= process.argv;

var inquirer = require('inquirer'); //installed
 
var Twitter = require('twitter'); //installed

var spotify = require('spotify'); //installed

var file = require('file-system'); //installed
var fs = require('fs');
 
file.readFile === fs.readFile // true 


var spotifySearch = function() {
  console.log("spotifySearching ");
    var song = "";
    for (var i=3; i<nodeArgs.length; i++ ){
      console.log(nodeArgs[i]);
      if (i>3){
        song = song +"+"+ nodeArgs[i]
      }else{
        song += nodeArgs[i]
      };
    };
      console.log("song is "+song);
    // var song = process.argv[3];
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
            console.log("spotifyResults " +spotifyResults);
          }
        }
      } else {
        console.log("Error :"+ err);
        return;
      }
    });
};



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
      for(var i = 0; i <tweets.length; i++) {
          var twitterResults = 
          tweets[i].text + "\r\n" + 
          tweets[i].created_at + "\r\n";
          console.log(twitterResults); 
          //I only have two tweets so far but if i were to have 20 how to display them?
        }
      }  else {
        console.log("Error :"+ error);
        return;
    }
  });

  
  };



var movieSearch = function(){
  var movie ="";

  for (var i=3; i<nodeArgs.length; i++ ){
    console.log("movieArg "+nodeArgs[i]);
    if (i>3){
      movie = movie +"+"+ nodeArgs[i]
    }else{
      movie += nodeArgs[i]
    };
     if (!movie){
      movie += "Mr. Nobody"
    };
    console.log("movie "+ movie);
  }
  
  request("http://www.omdbapi.com/?t="+movie+"=&plot=short&r=json", function(error, response, body) {
    if (error){
      console.log(error);
   
    }
    if (!error && response.statusCode === 200) {


      console.log("The movie's title is: " + JSON.parse(body).Title);
      console.log("The Year the movie was released is: " + JSON.parse(body).Year);
      console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
      console.log("The movie was produced in: " + JSON.parse(body).Country);
      console.log("The movie's language is: " + JSON.parse(body).Language);
      console.log("The movie's plot is: " + JSON.parse(body).Plot);
      console.log("The movie's actors are: " + JSON.parse(body).Actors);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
      console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);

  //need to console log Mr. Nobody if person doesn't enter a movie

    }
  });
}

var doWhatItSays = function(){

  fs.readFile("random.txt", "utf8", function (err, data){
    var output = data.split(",");
    var onDifLines = output.join('\n')
    console.log(onDifLines)

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
        console.log("do-what-it-says");
        doWhatItSays();
        break;
    default:
        console.log("none")
}

