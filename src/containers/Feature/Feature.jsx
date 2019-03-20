import React, { Component } from 'react';
import './Feature.scss';
import { connect } from 'react-redux';
import FeedTable from '../../components/FeedTable';
import { getFeature } from '../../actions'

class Feature extends Component {
  componentWillMount() {
    this.props.onLoad();
  }

  componentDidMount() {
    let intervalId = setInterval(this.props.onLoad, 30000);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    return (
      <>
        {this.props.feature[0] ?
          <div className="featureContainer">
            <div className="heading">Recent Recordings</div>
            <ul className="feedTable">
              <li className="feedTableItem label">
                <div className="feedTableData">Program Name</div>
                <div className="feedTableData">Username</div>
                <div className="feedTableData">Metric</div>
                <div className="feedTableData">Occurences</div>
                <div className="feedTableData">Time</div>
              </li>
              <FeedTable data={this.props.feature} />
            </ul>
          </div>

          :
          null
        }
      </>
    )
  }
};

const mapStateToProps = state => {
  return {
    feature: state.feature
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => dispatch(getFeature())
  }
}

Feature = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feature);

export default Feature;