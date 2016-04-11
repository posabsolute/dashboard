import { createSelector } from 'reselect';

const getTweets = (state, configs) => state.tweets.find( data => data.handle === configs.handle);

export const tweetsSelector = createSelector(
  [getTweets],
  (tweetsData) => {
    return {
      tweets: tweetsData ? tweetsData.list : [],
    };
  }
);
