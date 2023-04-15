import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import WestworldMap from './WestworldMap'
import Headquarters from './Headquarters'
import "../stylesheets/App.css";

function App() {
  const url = 'http://localhost:3001'
  const [hosts, setHosts] = useState([])
  const [areas, setAreas] = useState([])

  useEffect(() => {
    fetch(`${url}/hosts`)
      .then(r => r.json())
      .then(data => setHosts(data))

    fetch(`${url}/areas`)
      .then(r => r.json())
      .then(data => setAreas(data))
  }, [])

  function toggleActive(id) {
    const updatedHosts = hosts.map(host => {
      return host.id === id ? { ...host, active: !host.active } : host
    })
    setHosts(updatedHosts)
  }

  function changeArea(host) {
    const updatedHosts = hosts.map(item => {
      return item.id === host.id ? host : item
    })
    setHosts(updatedHosts)
  }

  function handleActiveAll(newActive) {
    const updatedHosts = hosts.map(item => {
      return { ...item, active: newActive }
    })
    setHosts(updatedHosts)
  }

  return (
    <Segment id="app">
      <WestworldMap
        hosts={hosts}
        areas={areas}
      />
      <Headquarters
        hosts={hosts}
        areas={areas}
        toggleActive={toggleActive}
        changeArea={changeArea}
        toggleActiveAll={handleActiveAll}
      />
    </Segment>
  );
}

export default App;
