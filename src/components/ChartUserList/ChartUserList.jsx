import React from 'react';
import ChartUser from '../ChartUser';

const ChartUserList = (props) => {

  let count = 0;
  const ChartUserList = props.users.map(user => {
    return (
      <ChartUser
        id={count}
        key={count++}
        name={user.user_name}
        events={user.events}
        click={props.click}
      />
    )
  })

  return (
    <>
      {ChartUserList}
    </>
  )
}

export default ChartUserList;