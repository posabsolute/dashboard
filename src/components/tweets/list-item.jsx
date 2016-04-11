/**
 * @api /components/tweets/list-item TweetsItem
 * @apiName TweetsItem
 * @apiGroup Component
 * @apiDescription
 * One tweet
 * @apiExample {html} Example:
 *   <ListItem
        key={'list' + index}
        onClick={this.openTwitter.bind(item)}
        {...item}
      />
 *
 * @apiParam {Object} user Tweet user data
 * @apiParam {Date} created_at Date of the tweet creation
 * @apiParam {String} text The actual tweet
 * @apiParam {Function} onClick Event when the tweet is clicked
 * @apiParam {retweeted_status} is the tweet a retweet
 */
import React from 'react';
import Time from 'components/time';
import reactStringReplace from 'react-string-replace';
import 'style!./list.scss';

export default class TweetItem extends React.Component {
  /**
   * @description return the user depending if the tweet is a retweet
   * @return {object} user object
   */
  getUser(user, retweeted_status){
    if(retweeted_status){
      return retweeted_status.user;
    }
    return user;
  }
  /**
   * @description return tweet with parsed user links
   * @return {ReactComponent} Array of react nodes
   */
  getTweetText(text, retweeted_status){
    // text is slightly different in retweets
    const tweetText = retweeted_status ? retweeted_status.text : text;
    // replace @user with it's own link to profile
    return reactStringReplace(tweetText, /\B\@([\w\-]+)/i, (match) => (
      <a target="_blank" onClick={(evt) => evt.stopPropagation()} href={`http://twitter.com/${match}`} key={`tweet_link_${match}`}>@{match}</a>
    ));

  }

  render() {
    const {user, created_at, text, onClick, retweeted_status, id_str} = this.props;
    const userData = this.getUser(user, retweeted_status);
    const tweetText = this.getTweetText(text, retweeted_status);

    return (<div className="list-item tweet" onClick={onClick}>
        <div className="tweet__content">
          <img className="tweet__img" src={userData.profile_image_url} />
          <div className="tweet__user">
            <span className="tweet__user__name"><strong> {userData.name}</strong></span>
            <span className="tweet__user__handle"> @{userData.screen_name} . <Time date={created_at} /></span>
          </div>
          <div className="tweet__text">{tweetText}</div>
          <div className="tweet__meta">
            { retweeted_status && <div>Retweet from {user.name}</div>}

          </div>
        </div>
      </div>
    );
  }
}

TweetItem.propTypes = {
  user: React.PropTypes.object,
  created_at: React.PropTypes.string,
  text: React.PropTypes.string,
  onClick: React.PropTypes.func,
  retweeted_status: React.PropTypes.object,
  id_str: React.PropTypes.string,
};