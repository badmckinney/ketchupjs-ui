import React, { Component } from 'react';
import './FeedList.scss';
import { connect } from 'react-redux';
import ClientList from '../../components/ClientList';
import { getClients } from '../../actions'

class FeedList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
  }

  componentWillMount() {
    this.props.onLoad();
  }

  handleInputOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="nameListContainer">
        <form className="searchBox">
          <input className="searchInput" placeholder="Search for an application record" name="search" type="text" value={this.state.search} onChange={this.handleInputOnChange} />
        </form>
        <ul className="clientsList">
          {this.props.clients ?
            <ClientList clients={this.props.clients} />
            :
            null
          }
        </ul>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    clients: state.clients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => dispatch(getClients())
  }
}

FeedList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedList);

export default FeedList;