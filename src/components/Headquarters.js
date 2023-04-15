import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import ColdStorage from './ColdStorage'
import LogPanel from './LogPanel'
import "../stylesheets/Headquarters.css";

function Headquarters({ hosts, areas, toggleActive, changeArea, toggleActiveAll }) {
  const [logs, setLogs] = useState([])

  function log(message) {
    setLogs([message, ...logs])
  }


  return (
    <Grid celled="internally">
      <Grid.Column width={8}><ColdStorage hosts={hosts} /></Grid.Column>
      <Grid.Column width={5}>
        <Details toggleActive={toggleActive} changeArea={changeArea} hosts={hosts} areas={areas} log={log} />
      </Grid.Column>
      <Grid.Column width={3}>
        <LogPanel hosts={hosts} toggleActiveAll={toggleActiveAll} logs={logs} log={log} />
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
