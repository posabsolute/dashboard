/**
 * @api /components/popin/popin Popin
 * @apiName Popin
 * @apiGroup Component
 * @apiDescription
 * This component is a very simple popin modal container
 * @apiExample {html} Example:
 *   <Popin classes="popin--tweets-config" id={`configs_${handle}`}>
 *     <Configs handle={handle} configs={this.props.configs} afterUpdate={this.fetch.bind(this)} />
 *   </Popin>
 *
 * @apiParam {String} id the ID that will be used to show and hide the popup
 * @apiParam {String} classes CSS classes added on the popin top div
 */

import React from 'react';
import { connect } from 'react-redux';
import 'style!./popin.scss';

const mapStateToProps = (state) => {
  return {
    popinStore: state.popin,
  };
};

@connect(mapStateToProps, {})
export default class Popin extends React.Component {
  componentWillMount() {
  }

  getStatus(id) {
    return this.props.popinStore[id];
  }

  render() {
    const {classes, id} = this.props;
    const status = this.getStatus(id);
    return status === 'show' && (
      <div className={`popin ${classes} popin--${status}`}>
        {this.props.children}
      </div>
    );
  }
}

Popin.propTypes = {
  childen: React.PropTypes.any,
  id: React.PropTypes.string,
  popinStore: React.PropTypes.object,
  popinClasses: React.PropTypes.string,
};

