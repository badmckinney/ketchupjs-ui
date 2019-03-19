import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Hero.scss';

class Hero extends Component {
  componentDidMount() {
    this.props.highlight(this.props.location.pathname);
  }

  render() {
    return (
      <div className="hero">
        <div className="left">
          <h1>KetchupJS</h1>
          <div>Track the data you care about, in real-time, with the world's most recent data collection and analytic library.</div>
          <div>KetchupJS is a lightweight open source toolkit for tracking, storing, and analyzing data in JavaScript applications. Easily track data, in real-time as your application is being used, with one of our built in methods. We send those packets of data through our data pipeline and store it on our servers where they can be accessed and analyzed on our website.</div>
          <div className="buttons">
            <Link to="/docs"><button className="cta">Get Started</button></Link>
            <button className="download">Download</button>
          </div>
        </div>
        <div className="right">
          <img src="/assets/KetchupJS.png" alt="Ketchup packet logo" />
        </div>
      </div>
      <div className="quick-links">
        <div className="column installation">
        </div>
        <div className="column">

        </div>
      </div>
    );
  }
}

export default withRouter(Hero);

