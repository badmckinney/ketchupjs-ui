import React from 'react';
import ClientListItem from '../ClientListItem';

const ClientList = (props) => {

  const ClientList = props.clients.map(client => {
    return (
      <ClientListItem key={client.id}
        name={client.name}
      />
    )
  })

  return (
    <>
      {ClientList}
    </>
  )
}

export default ClientList;