import React from 'react';

const ChartUser = (props) => {

  return (
    <li className="listItem" onClick={props.click} data-user={props.id}>{props.name}</li>
  )
}

export default ChartUser;