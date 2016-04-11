import {POPIN__HIDE, POPIN__HIDED, POPIN__SHOW} from './types/popin.types';
/**
 * @api /actions/popin.action hidePopin
 * @apiName hidePopin
 * @apiGroup Actions
 * @apiDescription
 * Hide a popin in the page
 * @apiExample {js} Example:
 *   this.props.hidePopin('popin_id');
 * @apiParam {String} ID Id of the popin to hide
 */
export function hidePopin(id) {
  return dispatch => {
    dispatch({ type: POPIN__HIDE, id });
    window.setTimeout(() =>{
      dispatch({
        type: POPIN__HIDED,
        id,
      });
    }, 500);
  };
}
/**
 * @api /actions/popin.action showPopin
 * @apiName showPopin
 * @apiGroup Actions
 * @apiDescription
 * Show a popin in the page
 * @apiExample {js} Example:
 *   this.props.showPopin('popin_id');
 * @apiParam {String} ID Id of the popin to show
 */
export function showPopin(id) {
  return {type: POPIN__SHOW, id};
}
