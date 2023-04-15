import React from "react";
import { Card } from "semantic-ui-react";
import Host from './Host'

function HostList({ hosts }) {
  const hostsToRender = hosts.map(host => {
    return <Host key={host.id} host={host} />
  })

  return (
    <Card.Group itemsPerRow={6}>{hostsToRender}</Card.Group>
  );
}

export default HostList;
