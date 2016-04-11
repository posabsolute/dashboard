import { TWEETS_CONFIG_UPDATE } from 'actions/types/tweets.types';

const configsStore = localStorage.getItem('tweetsConfigs') && JSON.parse(localStorage.getItem('tweetsConfigs'));
const initialState = configsStore || [
  {
    handle: 'appDirect',
    count: '30',
    order: 1,
    id: 1,
  },
  {
    handle: 'laughingsquid',
    count: '30',
    order: 2,
    id: 2,
  },
  {
    handle: 'techcrunch',
    count: '30',
    order: 3,
    id: 3,
  },
];

export function tweetsConfigs(state = initialState, action) {

  switch (action.type) {

  case TWEETS_CONFIG_UPDATE:
    let order;
    return state.map(config => {
      // update config object if you match the list id
      if (config.id === action.data.id) {
        // order has changed? save order to exchange with the other column
        if(config.order !== action.data.order){
          order = config.order;
        }
        return Object.assign({}, config, action.data);
      }
      // Duplicate order? echange order with the column modified
      if (config.order === action.data.order) {
        config.order = order || state.find(myconfig => myconfig.id === action.data.id).order;
      }
      return config;
    });
  default:
    return state;
  }
}
