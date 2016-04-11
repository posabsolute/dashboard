/**
 * @api /components/page-wrapper PageWrapper
 * @apiName PageWrapper
 * @apiGroup Component
 * @apiDescription
 * This component is a simple state loader that waits the the state stops being empty to show it's children, integrate a loader UI.
 * @apiExample {html} Example:
 *  <PageWrapper state={this.props.tweets}>
 *    <div>My content showing when this.props.tweets is not an empty array anymore
 *  </PageWrapper>
 *
 * @apiParam {Any} State Object or Array to check for values
 */

import React from 'react';
import 'style!./loader.scss';

export default class PageWrapper extends React.Component {
  componentWillMount() {
    this.hasOwnProperty = Object.prototype.hasOwnProperty;
  }

  isEmpty(obj) {
    // null and undefined are "empty"
    if (!obj) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.hasOwnProperty('size')) {
      if (obj.size > 0) return false;
      if (obj.size === 0) return true;

    }else {
      if (obj.length > 0) return false;
      if (obj.length === 0) return true;
    }

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (const key in obj) {
      if (this.hasOwnProperty.call(obj, key)) return false;
    }
    return true;
  }

  getComponent() {
    // check of there are values in the store
    if ((this.props.state && this.isEmpty(this.props.state)) || this.props.isLoading === true) {
      return this.getLoader();
    }
    if (this.props.stateExist === null) {
      return this.getLoader();
    }
    // when the store is not empty we return the childrens
    return (<div>{this.props.children}</div>);
  }

  getLoader() {
    return (
      <div className="loader" key={this.props.loaderKey}>
        <div className="button--loading loader--fixed loader--medium loader--red"></div>
      </div>
    );
  }

  render() {
    return this.getComponent();
  }
}

PageWrapper.propTypes = {
  stateExist: React.PropTypes.any,
  children: React.PropTypes.any,
  loaderKey: React.PropTypes.string,
  state: React.PropTypes.any,
  isLoading: React.PropTypes.bool,
};

