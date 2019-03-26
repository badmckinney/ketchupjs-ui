import React from 'react';
import FeedTableItem from '../FeedTableItem';

const FeedTable = (props) => {
  let count = 0;
  const FeedTable = props.data.map(event => {
    return (
      <FeedTableItem key={count++}
        name={event.name}
        user_name={event.user_name}
        metric={event.metric}
        count={event.count}
        max={event.max}
      />
    )
  })

  return (
    <>
      {FeedTable}
    </>
  )
}

export default FeedTable;