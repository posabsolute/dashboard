import React from 'react';
import { connect } from 'react-redux';

import TweetsContainer from './tweets-list';

import {tweetsConfigsSelector} from 'selectors/tweets-configs.selector';

const mapStateToProps = state => ({
  tweetsConfigs: tweetsConfigsSelector(state).orderedConfigs,
});

@connect(mapStateToProps, {})
export default class DashboardContainer extends React.Component {
  componentWillMount() {
  }
  render() {
    return (
      <section className="row-fluid" key="">
        {this.props.tweetsConfigs.map((configs, index) =>
          <TweetsContainer key={`tweetsList__${index}`} configs={configs} />
        )}
      </section>
    );
  }
}

DashboardContainer.propTypes = {
  tweetsConfigs: React.PropTypes.array,
};
