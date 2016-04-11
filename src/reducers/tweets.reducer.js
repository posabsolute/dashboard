import { TWEETS_LIST_FETCH } from 'actions/types/tweets.types';

const initialState = [];

export function tweets(state = initialState, action) {

  switch (action.type) {

  case TWEETS_LIST_FETCH:
    const currentList = state.filter((list) => list.handle === action.data.handle);

    if (currentList.length) {
      return state.map(list => {
        if (list.id === action.data.id) {
          return Object.assign({}, state, action.data);
        }
        return list;
      });
    }

    return [
      ...state,
      action.data,
    ];

  default:
    return state;
  }
}
