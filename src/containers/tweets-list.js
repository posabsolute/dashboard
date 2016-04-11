import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import equal from 'deep-equal';
// components
import PageWrapper from 'components/page-wrapper';
import Popin from 'components/popin/popin';
import Configs from 'components/tweets/configs/configs-form.js';
import ListContainer from 'components/tweets/list-container';
// actions
import * as popinActions from 'actions/popin.action';
import * as tweetsActions from 'actions/tweets.action';
// selectors
import {tweetsSelector} from 'selectors/tweets.selector';

const mapStateToProps = (state, props) => ({
  popinStore: state.popin,
  tweets: tweetsSelector(state, props.configs).tweets,
});

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(tweetsActions, dispatch),
    ...bindActionCreators(popinActions, dispatch),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class TweetsList extends React.Component {
  componentWillMount() {
    this.fetch();
  }

  componentWillReceiveProps(nextState) {
    if (!equal(nextState.configs, this.props.configs)) {
      this.fetch(nextState.configs);
    }
  }

  getPopinName(id) { return `form_tweets_configs_${id}`;}
  getPopinStatus(name) { return this.props.popinStore[name];}

  openConfigPopin() {
    const name = this.getPopinName(this.props.configs.id);
    if (this.getPopinStatus(name) !== 'show') {
      this.props.showPopin(name);
    }else {
      this.props.hidePopin(name);
    }
  }

  fetch(data) {
    this.props.fetchTweets(data || this.props.configs);
  }

  render() {
    const handle = this.props.configs.handle;
    const configPopinStatus = this.getPopinStatus(this.getPopinName(this.props.configs.id));
    return (
      <div className="col-lg-4 list-column relative">
        <div className={`ion-ios-gear config-btn icon--default icon--${configPopinStatus}`} onClick={this.openConfigPopin.bind(this)} />
        <div className="list-title list-title--margin">{`Tweets from ${handle}`}</div>
        <Popin classes="popin--tweets-config" id={`form_tweets_configs_${this.props.configs.id}`}>
          <Configs configs={this.props.configs} />
        </Popin>
        <PageWrapper state={this.props.tweets}>
          <ListContainer items={this.props.tweets} />
        </PageWrapper>
      </div>
    );
  }
}

TweetsList.propTypes = {
  fetchTweets: React.PropTypes.func,
  showPopin: React.PropTypes.func,
  hidePopin: React.PropTypes.func,
  popinStore: React.PropTypes.object,
  configs: React.PropTypes.object,
  tweets: React.PropTypes.array,
};
