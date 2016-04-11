/**
 * @api /components/tweets/list-container TweetsList
 * @apiName TweetsList
 * @apiGroup Component
 * @apiDescription
 * Iterate on a list of tweets
 * @apiExample {html} Example:
 *   <ListContainer items={this.props.tweets} title={`Tweets from ${this.props.configs.handle}`} />
 *
 * @apiParam {Array} items List of tweets
 * @apiParam {String} List Title
 */


import React from 'react';
import ListItem from 'components/tweets/list-item';

export default class ListContainer extends React.Component {

  openTwitter() {
    window.open(`https://twitter.com/${this.user.name}/status/${this.id_str}`);
  }

  render() {
    const {items} = this.props;
    return (
      <div className="list-item_container">
        {items.map((item) =>
            <ListItem
              key={`tweets_list_${item.id_str}`}
              onClick={this.openTwitter.bind(item)}
              {...item}
            />
        )}
      </div>
    );
  }
}


ListContainer.propTypes = {
  title: React.PropTypes.string,
  items: React.PropTypes.array,
  onClick: React.PropTypes.func,
  descMod: React.PropTypes.func,
};
