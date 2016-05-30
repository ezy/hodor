// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

// This is the URL of a search for the latest tweets on the '#mediaarts' hashtag.
var hodorSearch = {
    q: "hold&door",
    count: 1,
    result_type: "recent"
};

// This function finds the latest tweet with the #mediaarts hashtag, and retweets it.
function tweetHodor() {
    T.get('search/tweets', hodorSearch, function(error, data) {
        // log out any errors and responses
        console.log(error, data);
        // If our search request to the server had no errors...
        if (!error) {
            // set the username and the id of the tweet we're responding to
            var userName = data.statuses[0].user.screen_name,
								statusReply = data.statuses[0].id_str;
            // ... then we respond to the tweet with Hodor!
						T.post('statuses/update', { in_reply_to_status_id: statusReply, status: '@' + userName + ' Hodor!' }, function(err, data, response) {
                if (response) {
                    console.log('Success! Check your bot, it should have retweeted something.');
                }
                // If there was an error with our Twitter call, we print it out here.
                if (err) {
                    console.log('There was an error with Twitter:', error);
                }
            });
        }
        // However, if our original search request had an error, we want to print it out here.
        else {
            console.log('There was an error with your hashtag search:', err);
        }
    });
}

// Try to retweet something as soon as we run the program...
tweetHodor();
// ...and then every 60 mins after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 60 minutes --> 1000 * 60 * 60
setInterval(tweetHodor, 1000 * 60 * 3);
