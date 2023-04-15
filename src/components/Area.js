import React from "react";
import HostList from './HostList'
import "../stylesheets/Area.css";

function Area({ area, hosts }) {
  const areaNameClean = area.name.split('_').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
  const hostsInArea = hosts.filter(host => {
    return host.area === area.name && host.active
  })

  return (
    <div
      className="area"
      id={area.name}
    >
      <h3 className="labels">
        {areaNameClean}
      </h3>
      <HostList hosts={hostsInArea} />
    </div>
  );
}

Area.propTypes = {
  hosts: function (props) {
    if (props.hosts.length > props.limit) {
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      );
    }
  },
};

export default Area;
