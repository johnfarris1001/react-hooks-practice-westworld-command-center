import React from "react";
import { Segment } from "semantic-ui-react";
import Area from './Area'

function WestworldMap({ hosts, areas }) {
  const areasToRender = areas.map(area => {
    return <Area key={area.id} area={area} hosts={hosts} />
  })

  return <Segment id="map">{areasToRender}</Segment>;
}

export default WestworldMap;
