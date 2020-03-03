// Initialize/require basic files/variables

require("dotenv").config();

var keys = require("./keys.js");

var request = require("request");

var moment = require('moment');

// var spotify = new Spotify(keys.spotify);

const fs = require("fs");

var bandsintown = (keys.bandsintown);

// Storing user commands

var command = process.argv[2];
var query = process.argv.slice(3).join(" ");

// Interpreting user commands

function userInput(command, query) {
    switch (command) {
        case "concert-this":
            concertThis();
            break;
        case "do-this":
            doThis(query);
            break;
        case "spotify-this":
            spotifyThis();
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

// Defines Bands in Town Artist Events API function

function concertThis() {
    
    // Note that query is working
    console.log(`\n------------------------\n\nOne moment, searching for ${query}'s next concert...`);

    // Request info from API using user's query and adding it to query URL
    request("https://rest.bandsintown.com/artists/" + query + "/events?app_id=" + bandsintown, function (error, response, body) {
       
    // Sets 200 status code if there aren't any errors
        if (!error && response.statusCode === 200) {

            // Format response data, access keys, and log response
            var music = JSON.parse(body);
        
            if (music.length > 0) {
                for (i = 0; i < 1; i++) {
                    console.log(`\nArtist: ${music[i].lineup[0]} \nVenue: ${music[i].venue.name}\nVenue Location: ${music[i].venue.city}, ${music[i].venue.country}`)
                    var musicDate = moment(music[i].datetime).format("MM/DD/YYYY hh:00 A");
                    console.log(`Date and Start Time: ${musicDate}\n\n------------------------`);
                };

            } else {
                console.log('Sorry, cannot seem to find the concert info you are looking for.');
            };
        };
    });
};