import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Examples.scss';

class Examples extends Component {

  componentDidMount() {
    this.props.highlight(this.props.location.pathname);
  }

  render() {
    return (
      <div className="examples">
        <h1>Examples</h1>
        <div className="content">
          <div className="description"><span className="bold">config</span> sets api key to allows access to use our service.</div>
          <div className="code">cketchup.config("XXXXXXX-XXXXXXX-XXXXXXX-XXXXXXX")</div>
          <div className="description"><span className="bold">save</span> records an event of the <span className="bold">metric</span> and its <span className="bold">value</span>.</div>
          <div className="code">ketchup.save("sales", 2.49)</div>
          <div className="description">You can assign the recorded event to a certain user by specifying their <span className="bold">user_name</span>.</div>
          <div className="code">ketchup.save("sales", 2.49, "User1")</div>
          <div className="description">By setting <span className="bold">public</span> to false you can prevent anyone from viewing this data through our service at <a href="www.ketchupjs.dev">ketchupjs.dev</a> (defaulted to true, this can be changed in your profile settings).</div>
          <div className="code">ketchup.save("sales", 2.49, "User1", false)</div>
          <div className="description"><span className="bold">most</span> records the highest <span className="bold">value</span> and overwrites any previous lesser recorded <span className="bold">value</span> for the specified <span className="bold">metric</span>.</div>
          <div className="code">ketchup.most("daily_spending", 4.92, "User1", false)</div>
          <div className="description">Ex. if the <span className="bold">value</span> of <span className="bold">daily_spending</span> was greater than the <span className="bold">valueStored</span>, the event would be recorded, but if it were less than the <span className="bold">valueStored</span> it would not be recorded:</div>
          <div className="code block">if(value > valueStored) {"{"}</div>
          <div className="code block second">valueStored = value</div>
          <div className="code block last">};</div>
        </div>
      </div>
    )
  }
};

export default withRouter(Examples);