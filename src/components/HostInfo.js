import React, { useState, useEffect, useContext } from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import { HostContext } from "../context/host";
import { Log } from "../services/Log";
import "../stylesheets/HostInfo.css";

function HostInfo({ toggleActive, changeArea, hosts, areas, log }) {
  const { selectedHost } = useContext(HostContext)
  const [active, setActive] = useState(selectedHost.active)
  const [area, setArea] = useState(selectedHost.area)
  const patchUrl = `http://localhost:3001/hosts/${selectedHost.id}`

  const [options] = useState([
    { key: "high_plains", text: "High Plains", value: "high_plains" },
    { key: "lowlands", text: "Lowlands", value: "lowlands" },
    { key: "under_construction", text: "Under Construction", value: "under_construction" },
    { key: "pariah", text: "Pariah", value: "pariah" },
    { key: "python_pass", text: "Python Pass", value: "python_pass" },
    { key: "badlands", text: "Badlands", value: "badlands" },
  ]);

  const areaPopulation = [0, 0, 0, 0, 0, 0]

  hosts.forEach(host => {
    for (let place of areas) {
      if (host.area === place.name) {
        areaPopulation[place.id - 1]++
        return
      }
    }
  })

  useEffect(() => {
    setActive(selectedHost.active)
    setArea(selectedHost.area)
  }, [selectedHost])

  function handleOptionChange(e, { value }) {
    for (let place of areas) {
      if (value === place.name) {
        if (place.limit <= areaPopulation[place.id - 1]) {
          log(Log.error(`Too many hosts. Cannot add ${selectedHost.firstName} to ${e.target.textContent}`))
          return
        }
      }
    }
    fetch(patchUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ area: value })
    })
      .then(r => r.json())
      .then(data => changeArea(data))

    setArea(value)
    log(Log.notify(`${selectedHost.firstName} set in area ${e.target.textContent}`))
  }

  function handleRadioChange(e) {
    fetch(patchUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ active: !selectedHost.active })
    })
      .then(r => r.json())
      .then(data => toggleActive(data.id))

    setActive(!active)
    log(Log.warn(`${!active ? 'Activated' : 'Decommissioned'} ${selectedHost.firstName}`))
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={selectedHost.imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {`${selectedHost.firstName} ${selectedHost.lastName}`} | {selectedHost.gender === 'Male' ? <Icon name="man" /> : <Icon name="woman" />}
              {/* Think about how the above should work to conditionally render the right First Name and the right gender Icon */}
            </Card.Header>
            <Card.Meta>
              {/* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */}
              {/* Checked takes a boolean and determines what position the switch is in. Should it always be true? */}
              <Radio
                onChange={handleRadioChange}
                label={active ? "Active" : "Decommissioned"}
                checked={active ? true : false}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              value={area}
              options={options}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
