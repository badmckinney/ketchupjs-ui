import React, { Component } from 'react';
import './Feature.scss';
import { connect } from 'react-redux';
import Chart from '../../components/Chart';
import { getFeature } from '../../actions'

class Feature extends Component {
  componentWillMount() {
    this.props.onLoad();
  }

  render() {
    return (
      <>
        {this.props.feature[1] ?
          <div className="featureContainer">
            <Chart chartClass="one" data={this.props.feature[0]} />
            {/* <Chart chartClass="two" data={this.props.feature[1]}/> */}
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