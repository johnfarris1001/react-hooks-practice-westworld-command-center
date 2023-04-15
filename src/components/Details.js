import React, { useContext } from "react";
import { Segment, Image } from "semantic-ui-react";
import HostInfo from './HostInfo'
import { HostContext } from "../context/host";
import * as Images from "../services/Images";

function Details({ host, toggleActive, changeArea, hosts, areas, log }) {
  // We'll render the logo if no host is selected. But if a host does get selected....
  // Watch the video to see how this works in the app.
  const { selectedHost } = useContext(HostContext)

  return (
    <Segment id="details" className="HQComps">
      {!selectedHost ? <Image size="medium" src={Images.westworldLogo} /> : <HostInfo host={host} hosts={hosts} areas={areas} toggleActive={toggleActive} changeArea={changeArea} log={log} />}
    </Segment>
  );
}

export default Details;
