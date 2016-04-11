/**
 * @api /middlewares/storage Storage
 * @apiName storage
 * @apiGroup Middlewares
 * @apiDescription
 * Save a subset of the redux store in localstorage
 * @apiExample {js} Example:
 *  return {
 *    type: TWEETS_CONFIG_UPDATE,
 *    localStore: {
 *      key: 'tweetsConfigs',
 *    },
 *    data,
 *  };
 */
export default store => next => action => {
  const result = next(action);
  // if the action ask the result to be cached in localstorage
  if (action.localStore) {
    // get store key to save in localstorage
    const keyStore = store.getState()[action.localStore.key];
    if (keyStore) {
      window.localStorage.setItem(action.localStore.key, JSON.stringify(keyStore));
    }
  }
  return result;
};
