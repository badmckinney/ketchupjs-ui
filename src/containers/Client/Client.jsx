import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Client.scss';
import { getClient } from '../../actions';
import Chart from '../../components/Chart';
import ChartMetricList from '../../components/ChartMetricList';
import ChartUserList from '../../components/ChartUserList';

class Client extends Component {
  constructor(props) {
    super(props);

    this.state = {
      metrics: [],
      users: [],
      flip: false
    };

    this.clickMetric = this.clickMetric.bind(this);
    this.clickUser = this.clickUser.bind(this);
  }

  componentWillMount() {
    this.props.onLoad(this.props.match.params.client);
  }

  componentDidMount() {
    this.props.highlight(this.props.location.pathname);
  }

  clickMetric(e) {
    let metricId = e.target.dataset.metric;
    if (e.target.classList.contains('selected')) {
      e.target.classList.remove('selected')
      let removeId = this.state.metrics.indexOf(this.props.client.metrics[metricId]);
      let tempArr = this.state.metrics;
      tempArr.splice(removeId, 1)
      this.setState({ metrics: tempArr })
    } else {
      e.target.classList.add('selected')
      this.setState({ metrics: [...this.state.metrics, this.props.client.metrics[metricId]] })
    }
  }

  clickUser(e) {
    let userId = e.target.dataset.user;
    if (e.target.classList.contains('selected')) {
      e.target.classList.remove('selected')
      let removeId = this.state.users.indexOf(this.props.client.users[userId]);
      let tempArr = this.state.users;
      tempArr.splice(removeId, 1)
      this.setState({ users: tempArr })
    } else {
      e.target.classList.add('selected')
      this.setState({ users: [...this.state.users, this.props.client.users[userId]] })
    }
  }

  render() {
    const client = this.props.client

    return (
      <div className="clientContainer">
        {client.id ?
          <>
            <div className="listOptions">
              <div className="listLabel">Metrics</div>
              <ul className="listContainer">
                <ChartMetricList metrics={client.metrics} click={this.clickMetric} />
              </ul>
              <div className="listLabel">Users</div>
              <ul className="listContainer">
                <ChartUserList users={client.users} click={this.clickUser} />
              </ul>
            </div>
            <div className="chartContainer">
              <Chart users={this.state.users} metrics={this.state.metrics} />
            </div>
          </>
          :
          null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    client: state.client
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: (client) => dispatch(getClient(client))
  }
}

Client = connect(
  mapStateToProps,
  mapDispatchToProps
)(Client);

export default withRouter(Client);