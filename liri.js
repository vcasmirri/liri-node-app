// Initialize/require basic files/variables

require("dotenv").config();

var keys = require("./keys.js");

var request = require("request");

var moment = require('moment');

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var fs = require("fs");

// Storing user commands

var command = process.argv[2];
var query = process.argv.slice(3).join(" ");

// Interpreting user commands

function userInput(command, query) {
    switch (command) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            spotifyThis();
            break;
        case "do-what-it-says":
            doThis(query);
            break;
        case "movie-this":
            movieThis();
            break;
        default:
            console.log("Sorry, didn't understand the command.");
            break;
    }
}

// Initialize user command logic

userInput(command, query);

// Log functionality (append commands and data output)

// Defines Bands in Town Artist Events API function

function concertThis() {

    // Note that query is working/searching
    console.log(`\n------------------------\n\nOne moment, searching for ${query}'s next concert...`);

    var concertCommand = '\n------------------------\nRecorded user command and query: ' + command + ' ' + query + '\n------------------------';

    fs.appendFile("log.txt", concertCommand, function(err) {
        // Logs errors, if any
        if (err) {
            console.log(err);
        }
    });

    // Request info from API using user's query and adding it to query URL
    request("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp", function (error, response, body) {
       
    // Sets 200 status code if there aren't any errors
        if (!error && response.statusCode === 200) {

            // Format response data, access keys, and log response
            var music = JSON.parse(body);
        
            if (music.length > 0) {
                for (i = 0; i < 1; i++) {
                    var musicDate = moment(music[i].datetime).format("MM/DD/YYYY hh:00 A");
                    var concertLog = `\n------------------------\nArtist: ${music[i].lineup[0]} \nVenue: ${music[i].venue.name}\nVenue Location: ${music[i].venue.city}, ${music[i].venue.country}\nDate and Start Time: ${musicDate}\n------------------------`
                    console.log(concertLog);

                    fs.appendFile("log.txt", concertLog, function(err) {
                        // Logs errors, if any
                        if (err) {
                            console.log(err);
                        }
                    });

                };

            } else {
                console.log('Sorry, cannot seem to find the concert info you are looking for.');
            };
        };
    });
};

function spotifyThis() {

    // Note that query is working/searching
    console.log(`\n------------------------\n\nOne moment, searching for "${query}"`);

    var spotifyCommand = '\n------------------------\nRecorded user command and query: ' + command + ' ' + query + '\n------------------------';

    fs.appendFile("log.txt", spotifyCommand, function(err) {
        // Logs errors, if any
        if (err) {
            console.log(err);
        }
    });

    // Default to "The Sign" by Ace of Base if query is not found.
    if (!query) {
        query = "the sign ace of base"
    };

    // Requests song data from Spotify API
    spotify.search({
        type: 'track',
        query: query,
        limit: 1,
    }, function (error, data) {
        if (error) {
            return console.log('Sorry, there has been an error: ' + error);
        }

        // Collects/organizes response data and displays in console
        var spotifyArr = data.tracks.items;

        for (i = 0; i < spotifyArr.length; i++) {
            var spotifyLog = `\n------------------------\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify Link: ${data.tracks.items[i].external_urls.spotify}\n------------------------`
            console.log(spotifyLog)

            // Adds output data to log.txt file
            fs.appendFile("log.txt", spotifyLog, function(err) {
                // Logs errors, if any
                if (err) {
                    console.log(err);
                }
            });

        };
    });
}

// Defines function that reads random.txt

function doThis() {

    var doCommand = '\n------------------------\nRecorded user command: ' + command + '. This will execute contents of random.txt.\n------------------------';

    fs.appendFile("log.txt", doCommand, function(err) {
        // Logs errors, if any
        if (err) {
            console.log(err);
        }
    });
  
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        // Split data into array and pass user command as parameters

        var dataArr = data.split(",");

        command = dataArr[0];
        query = dataArr[1];
    
        userInput(command, query);
    });
};

function movieThis() {
    console.log(`\n------------------------\n\nOne moment, searching for "${query}"`);

    var movieCommand = '\n------------------------\nRecorded user command and query: ' + command + ' ' + query + '\n------------------------';

    fs.appendFile("log.txt", movieCommand, function(err) {
        // Logs errors, if any
        if (err) {
            console.log(err);
        }
    });

    if (!query) {
        query = "mr nobody";
    };

    // Requests movie data from OMDB API
    request("http://www.omdbapi.com/?t=" + query + "&apikey=trilogy", function (error, response, body) {
        var movie = JSON.parse(body);

        // Retrieve RottenTomatoes ratings from response
        var ratingsArr = movie.Ratings;
        if (ratingsArr.length > 2) {}

        if (!error && response.statusCode == 200) {
            var movieLog = `\n------------------------\nTitle: ${movie.Title}\nCast: ${movie.Actors}\nReleased: ${movie.Year}\nIMDb Rating: ${movie.imdbRating}\nRotten Tomatoes Rating: ${movie.Ratings[1].Value}\nCountry: ${movie.Country}\nLanguage: ${movie.Language}\nPlot: ${movie.Plot}\n------------------------`
            console.log(movieLog)

            // Adds output data to log.txt file
            fs.appendFile("log.txt", movieLog, function(err) {
                // Logs errors, if any
                if (err) {
                    console.log(err);
                }
            });

        } else {
            return console.log("Can't seem to find the movie, sorry. Error: " + error)
        };
    })
};