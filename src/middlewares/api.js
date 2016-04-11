/**
 * @api /middlewares/https://arcane-anchorage-39586.herokuapp.com/ Api Calls
 * @apiName apicalls
 * @apiGroup Middlewares
 * @apiDescription
 * Call any api to retrieve data
 * @apiExample {js} Example:
 *  return {
 *    [CALL_API]: {
 *      types: [ TWEETS_LIST_REQUEST, TWEETS_LIST_FETCH, TWEETS_LIST_FAIL ],
 *      params: {
 *        'screen_name': configs.handle,
 *        'count': configs.count,
 *      },
 *      configs: {
 *        id: configs.id,
 *      },
 *      dataProcessor: tweetsModel.dataProcessor,
 *      endpoint: tweetsModel.endpoint(),
 *      model: tweetsModel,
 *    },
 * };
 *
 * @apiParam {Array} types All calls must have 3 events, request is before the request, useful for loading, errors states
 * @apiParam {Object} params params passed as query string
 * @apiParam {configs} passed to the data processor function
 * @apiParam {Function} dataProcessor function called after the data is received, modify the values passed to the storex
 * @apiParam {String} endpoint Api endpoint called
 * @apiParam {Object} Model Data model used for this call
 *
 */
import qs from 'qs';
import 'whatwg-fetch';

const API_ROOT = 'https://arcane-anchorage-39586.herokuapp.com';

// Fetches an API response
// return a promise from the action so side effect can be executed after the call
function callApi(endpoint, user, dataProcessor, store, sideEffectSuccess, method, postData, params, configs) {
  const urlParams = params ? '?' + qs.stringify(params) : '';
  const url = API_ROOT + endpoint + urlParams;

  return fetch(url, {
    method: method || 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((resp) => { return resp.json(); }).then((data) => {
    // side effects can be passed to the call
    // you can also use the action as a promise
    if (sideEffectSuccess) {
      sideEffectSuccess.call(this, store.dispatch);
    }
    // the model can have a data processor to make changes on the returned data
    return (dataProcessor) ? dataProcessor(data, params, configs) : data;

  }, (data, status, response) =>{
    store.dispatch({
      type: 'GROWLER__SHOW',
      growler: {
        text: response,
        type: 'growler--error',
      },
    });

  });
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];
  // no symbol? pass right throught
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { dataProcessor, types, callData, sideEffectSuccess, validate, method, postData, params, configs } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());

  }
  if (validate && !validate(store.dispatch, callData)) {
    return next({type: 'MODEL_VALIDATION_FAILURE'});
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }
  // modify the aciton type, useful in case of a failure
  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [ requestType, successType, failureType ] = types;
  next(actionWith({ data: callData, type: requestType }));
  const user = store.getState().user;


  return callApi(endpoint, user, dataProcessor, store, sideEffectSuccess, method, postData, params, configs).then(
    data => next(actionWith({
      data,
      type: successType,
    })),
    error => {
      next(actionWith({
        type: failureType,
        data: callData,
        error: error || 'Something bad happened',
      }));
    }
  );
};
