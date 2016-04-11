import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { GrowlerReducer } from 'flash-notification-react-redux';
import { validateReducer } from 'redux-form-validator';
import { popin } from './popin.reducer';
import { tweetsConfigs } from './tweets-configs.reducer';
import { tweets } from './tweets.reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  growler: GrowlerReducer,
  validate: validateReducer,
  popin,
  tweetsConfigs,
  tweets,
});

export default rootReducer;
