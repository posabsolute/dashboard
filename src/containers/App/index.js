import React, { Component } from 'react';

import Header from 'components/header/header.jsx';
import {GrowlerContainer} from 'flash-notification-react-redux';
import GrowlerMessages from 'locales/growler.locale.js';

/* global styles for app */
import 'style!./styles/app.scss';


export class App extends Component {
  render() {
    return (
      <section>
        <GrowlerContainer messages={GrowlerMessages} showFor={3000} currentLocale="enUS" />
        <Header />
        <div className="container-fluid">{this.props.children}</div>
      </section>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.any,
};
