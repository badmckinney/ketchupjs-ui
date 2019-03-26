import React from 'react';
import { Link } from 'react-router-dom';

const ClientListItem = (props) => {

  return (
    <Link to={`/${props.name}`} id={props.name} className="clientListItem">{props.name}</Link>
  )
}

export default ClientListItem;