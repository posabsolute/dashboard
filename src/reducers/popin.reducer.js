import {POPIN__HIDE, POPIN__HIDED, POPIN__SHOW} from '../actions/types/popin.types';

const initialState = {};

export function popin(state = initialState, action) {
  switch (action.type) {
  case POPIN__SHOW:
    return {
      ...state,
      [action.id]: 'show',
    };

  case POPIN__HIDED:
    return {
      ...state,
      [action.id]: 'hide',
    };

  case POPIN__HIDE:
    return {
      ...state,
      [action.id]: 'hidden',
    };

  default:
    return state;
  }
}
