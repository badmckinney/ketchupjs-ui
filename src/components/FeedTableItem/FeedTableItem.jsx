import React from 'react';

const FeedTableItem = (props) => {
  const date = new Date(props.max)

  return (
    <li className="feedTableItem">
      <div className="feedTableData name">{props.name}</div>
      <div className="feedTableData username">{props.user_name}</div>
      <div className="feedTableData metric">{props.metric}</div>
      <div className="feedTableData count">{props.count}</div>
      <div className="feedTableData date">{date.toLocaleString()}</div>
    </li>
  )
}

export default FeedTableItem;