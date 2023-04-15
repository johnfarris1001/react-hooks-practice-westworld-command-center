import React, { useContext } from "react";
import { Card } from "semantic-ui-react";
import { HostContext } from "../context/host";
import "../stylesheets/Host.css";

function Host({ host }) {
  function handleClick() {
    setSelectedHost(host)
  }

  const { selectedHost, setSelectedHost } = useContext(HostContext)

  return (
    <Card
      className={host === selectedHost ? "selected host" : "host"}
      onClick={handleClick}
      image={host.imageUrl}
      raised
      link
    />
  );
}

export default Host;
