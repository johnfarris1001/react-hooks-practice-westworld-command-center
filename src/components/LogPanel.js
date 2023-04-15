import React, { useState } from "react";
import { Segment, Button } from "semantic-ui-react";
import { Log } from "../services/Log";

function LogPanel({ hosts, toggleActiveAll, logs, log }) {
  const [activate, setActivate] = useState(true)

  function dummyLogs() {
    // This is just to show you how this should work. But where should the log data actually get stored?
    // And where should we be creating logs in the first place?
    // Use the Log Service class (located in: 'src/services/Log') we've created anywhere you like.
    // Just remember to import it

    let logs = [];

    logs.unshift(Log.warn("This is an example of a warn log"));
    logs.unshift(Log.notify("This is an example of a notify log"));
    logs.unshift(Log.error("This is an example of an error log"));

    return logs;
  }

  function realLogs() {
    return logs
  }

  function handleClick() {
    const updatedHosts = hosts.map(host => {
      return { ...host, active: activate }
    })
    updatedHosts.forEach(host => {
      fetch(`http://localhost:3001/hosts/${host.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ active: activate })
      })
        .then(r => r.json())
        .then(() => toggleActiveAll(activate))
    })

    setActivate(!activate)

    if (activate) {
      log(Log.warn('Activating all hosts!'))
    } else {
      log(Log.notify('Decommissioning all hosts.'))
    }

  }

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {realLogs().map((log, i) => (
          <p key={i} className={log.type}>
            {log.msg}
          </p>
        ))}
      </pre>

      {/* Button below is the Activate All/Decommisssion All button */}
      {/* This isn't always going to be the same color...*/}
      {/* Should the button always read "ACTIVATE ALL"? When should it read "DECOMMISSION ALL"? */}
      <Button
        fluid
        onClick={handleClick}
        color={activate ? "red" : "green"}
        content={activate ? "ACTIVATE ALL" : "DECOMMISSION ALL"}
      />
    </Segment>
  );
}

export default LogPanel;
