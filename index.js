/* eslint-disable no-use-before-define */
/* eslint-disable func-style */

$(document).ready(() => {
  /*FUNCTIONS*/
  function createTweet(tweet) {
    const $tweet = $('<div class=tweet></div>');
    const $user = $(`<div class=user-name>@${tweet.user}:</div>`);
    const $message = $(`<div class=message>${tweet.message}</div>`);
    const $timestamp = $(`<div class=timestamp data-timestamp=${tweet.created_at.toISOString()}>Posted: ${moment(tweet.created_at).fromNow()}</div>`);
    $tweet.append($user, $message, $timestamp);
    return $tweet;
  }

  function addTweets(tweets) {
    const $tweets = tweets.map(createTweet);
    $feedDiv.prepend($tweets);
  }

  function updateFeed() {
    const newTweets = streams.home.slice(currentTweetCount + 1);
    currentTweetCount = streams.home.length;
    addTweets(newTweets);
    $('.timestamp').each(function(index, element) { $(element).text(`Posted: ${moment($(element).attr('data-timestamp')).fromNow()}`); });
    setTimeout(updateFeed, 500);
  }

  //initialize current tweet count
  let currentTweetCount = 0;
  //save body tag
  const $body = $('body');
  //reset body
  $body.html('');

  //create feed div
  $feedDiv = $('<div id=feed></div>');
  //add feed div to body
  $body.prepend($feedDiv);

  //start update feed
  updateFeed();

});
