
import {CALL_API} from 'middlewares/api';
import {TWEETS_LIST_REQUEST, TWEETS_LIST_FETCH, TWEETS_LIST_FAIL, TWEETS_CONFIG_UPDATE} from './types/tweets.types';
import tweetsModel from 'models/tweets.model';

/**
 * @api /actions/tweets.action tweetsConfigUpdate
 * @apiName tweetsConfigUpdate
 * @apiGroup Actions
 * @apiDescription
 * Update on tweets list configs array
 * @apiExample {js} Example:
 *  this.props.tweetsConfigUpdate({
 *    id: this.props.configs.id,
 *    count: evt.target.count.value,
 *    order: parseInt(evt.target.order.value, 10),
 *    handle: evt.target.handle.value,
 *  };);
 *
 * @apiParam {Object} Data Object of configs to update
 */
export function tweetsConfigUpdate(data) {
  return {
    type: TWEETS_CONFIG_UPDATE,
    localStore: {
      key: 'tweetsConfigs',
    },
    data,
  };
}

/**
 * @api /actions/tweets.action fetchTweets
 * @apiName fetchTweets
 * @apiGroup Actions
 * @apiDescription
 * Fetch tweets for a user
 * @apiExample {js} Example:
 *   this.props.fetchTweets(this.props.configs);
 * @apiParam {Object} Configs Object of configs for fetch that tweets list
 */
export function fetchTweets(configs) {
  return {
    [CALL_API]: {
      types: [ TWEETS_LIST_REQUEST, TWEETS_LIST_FETCH, TWEETS_LIST_FAIL ],
      params: {
        'screen_name': configs.handle,
        'count': configs.count,
      },
      configs: {
        id: configs.id,
      },
      dataProcessor: tweetsModel.dataProcessor,
      endpoint: tweetsModel.endpoint(),
      model: tweetsModel,
    },
  };
}
