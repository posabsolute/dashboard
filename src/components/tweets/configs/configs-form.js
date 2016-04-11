/**
 * @api /components/tweets/configs-form TweetsListConfigsForm
 * @apiName TweetsListConfigsForm
 * @apiGroup Component
 * @apiDescription
 * Form that controls a list of tweets settings
 * @apiExample {html} Example:
 *  <Configs configs={this.props.configs} afterUpdate={this.fetch.bind(this)} />
 *
 * @apiParam {Object} configs the configs object for the tweets list
 * @apiParam {Function} afterUpdate function to execute after the config has been updated
 */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {validateProps} from 'redux-form-validator';
import {validateActions} from 'redux-form-validator';

import * as popinActions from 'actions/popin.action';
import * as tweetsActions from 'actions/tweets.action';

import configsTweetsModel from 'models/tweets-configs.model';
import ConfigsForm from './configs-form.jsx';


const mapStateToProps = (state) => {
  return {
    tweetsConfigs: state.configs,
    validationStore: state.validate,
  };
};

const mapDispatchToProps = (
  dispatch,
) => {
  return {
    ...bindActionCreators(popinActions, dispatch),
    ...bindActionCreators(validateActions, dispatch),
    ...bindActionCreators(tweetsActions, dispatch),
    saveConfigs(evt) {
      evt.preventDefault();
      if (this.validate.formValidate(evt.target.elements)) {
        const data = {
          id: this.props.configs.id,
          count: evt.target.count.value,
          order: parseInt(evt.target.order.value, 10),
          handle: evt.target.handle.value,
        };
        this.props.hidePopin(`form_tweets_configs_${this.props.configs.id}`);
        this.props.tweetsConfigUpdate(data);
      }
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class TweetItem extends React.Component {
  componentWillMount() {
    this.validate = validateProps(this, configsTweetsModel);
  }

  render() {
    return (
      <ConfigsForm {...this.props} validate={this.validate} onSubmit={this.props.saveConfigs.bind(this)} />
    );
  }
}


TweetItem.propTypes = {
  saveConfigs: React.PropTypes.func,
  hidePopin: React.PropTypes.func,
  tweetsConfigUpdate: React.PropTypes.func,
  configs: React.PropTypes.object,
};

