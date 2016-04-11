/**
 * @api /components/time Time
 * @apiName Time
 * @apiGroup Component
 * @apiDescription
 * This plugin transform any date to the x ago format
 * @apiExample {html} Example:
 * <Time date={created_at} />
 *
 * @apiParam {Date} date date to pretiffy
 */
import React from 'react';
import moment from 'moment';

export default class Time extends React.Component {
  getTime(data) {
    return moment(new Date(data)).fromNow();
  }
  render() {
    return (
      <span className="time">{this.getTime(this.props.date)}</span>
    );
  }
}

Time.propTypes = {
  date: React.PropTypes.string,
};

