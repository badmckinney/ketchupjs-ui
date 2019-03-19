import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Hero.scss';

class Hero extends Component {
  componentDidMount() {
    this.props.highlight(this.props.location.pathname);
  }

  render() {
    return (
      <>
        <div className="hero">
          <div className="left">
            <h1>KetchupJS</h1>
            <div>Track the data you care about, in real-time, with the world's most recent data collection and analytic library.</div>
            <div>KetchupJS is a lightweight open source toolkit for tracking, storing, and analyzing data in JavaScript applications. Easily record data, as your application is being used, with one of our built in methods. We send packets of data through our data pipeline and store it on our servers where they can be accessed and analyzed on our website.</div>
            <div className="buttons">
              <Link to="/docs"><button className="cta">Get Started</button></Link>
              <a href="https://s3-us-west-2.amazonaws.com/ketchupjs-cdn/ketchupjs.js.zip"><button className="download">Download</button></a>
            </div>
            <div className="version">Currently v1.2.4</div>
          </div>
          <div className="right">
            <img src="/assets/KetchupJS.png" alt="Ketchup packet logo" />
          </div>
        </div>
        <div className="quick-links">
          <div className="column installation">
            <img src="/assets/download.png" alt="install icon" className="download icon" />
            <h2>Installation</h2>
            <div>Include KetchupJS's source code files via npm. Package managed installs don't include documentation, but do include our build system and readme.</div>
            <div className="code">$ npm install ketchupjs</div>
            <Link to="/docs"><button>Read installation docs</button></Link>
          </div>
          <div className="column cdn">
            <img src="/assets/cloud.png" alt="cloud icon" className="cloud icon" />
            <h2>KetchupCDN</h2>
            <div>When you are building a browser-based application with no backend and only need to include the compiled JS, you can use KetchupCDN.</div>
            <div className="script"><span className="d-blue">{'<script'} </span><span className="l-blue">src=</span><span className="red">"https://s3-us-west-2.amazonaws.com/ketchupjs-cdn/ketchupjs.js"</span><span className="d-blue">{"></script>"}</span></div>
            <Link to="/docs"><button>Explore the docs</button></Link>
          </div>
          <div className="column feature">
            <img src="/assets/chart.png" alt="chart icon" className="chart icon" />
            <h2>Featured Clients</h2>
            <div>Check out some of the applications that are currently tracking data with our library. Any company who has configured their data to be public will have their data analytics available for viewing on our feed page.</div>
            <Link to="/feed"><button>Browse Feed</button></Link>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Hero);

