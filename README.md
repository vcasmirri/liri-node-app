# LIRI Node App
---
### Description / Requirements

This Node application takes a user command specific query to output responses from the Bands in Town, Spotify, and OMDB APIs. Using the terminal, users could find information about a band's next concert, a particular song, or a specific movie.

The logic of the app takes in arguments from a user's command-line arguments and utilizes Axios to request API responses. It then logs a JSON response with the requested information in the console. At the same time, the user's arguments and the JSON response are both logged to a text file (log.txt).

---

### Why LIRI?
LIRI stands for "Language Interpretation and Recognition Interface". Think SIRI, except it uses the command line instead of speech.

---

### Commands / Queries

Command | Output
---------|---------
concert-this | Takes in a band or musician argument and requests information about their next concert from the Bands in Town API. Information is returned in the form of Artist, Venue, Venue Location, and Date and Time.
spotify-this-song | Takes in a song title argument and requests information from the Spotify API. Information is returned in the form of Artist, Song, Album, and Spotify Link.
movie-this | Takes in a movie title argument and requests information from the OMDB API. Information is returned in the form of Title, Cast, Released, IMDb Rating, Rotten Tomatoes Rating, Country, Language, and Plot.
do-what-it-says | Takes no argument, but instead uses the readFile() method to access the random.txt file and execute whatever command/search query is found there.

---
### Technologies
This app utilizes Javascript, text files, and Node packages/modules to handle the user's command line requests and return information from the various APIs mentioned above.

#### Packages
The following descriptions primarily originate from their respective pages on npmjs.com.

1. **Request**: Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.
2. **Dotenv**: Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. In this app, this sets environment variables that help mask our API keys on GitHub.
3. **FS**: Built in to Node already, this package allows us to use functions like readFile() and appendFile(). This is essential for our log function and the 'do-what-it-says' command.
4. **Moment**: This Javascript library helps us format dates in the JSON responses we receive from the API requests.

---
### Demonstration

1. Clearly state the problem the app is trying to solve (i.e. what is it doing and why)
2. Give a high-level overview of how the app is organized
3. Give start-to-finish instructions on how to run the app
4. Include screenshots, gifs or videos of the app functioning
5. Contain a link to a deployed version of the app
6. Clearly list the technologies used in the app
7. State your role in the app development