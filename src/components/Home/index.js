import React, { Component } from 'react';
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet';
import MapTooltip from './components/MapTooltip';
import IssueCard from './components/IssueCard';
import './leaflet.css';

//Get service request(issue) using lat & lng
const getIssue = (latlng, issues) => {
  return issues.find(issue => {
    return issue.latitude === latlng.lat && issue.longitude === latlng.lng;
  });
};


class SimpleMap extends Component {
  constructor() {
    super();
    this.state = {
      zoom: 13,
      center: [-6.816330, 39.276638],
      issues: [],
      selected: {}
    };
    //bind functions
  }

  componentDidMount() {
    const map = this.map.leafletElement;
    map.on('click', (event) => {
      const serviceRequest = getIssue(event.latlng, this.state.issues);
      this.setState({ selected: serviceRequest });
    });

    fetch('/api/issues')
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ issues: data });
      });
  }

  render() {
    const { center, zoom, issues, selected } = this.state;

    return (
      <div>
        <IssueCard issue={selected} showCard={true} />
        <Map center={center} zoom={zoom} ref={map => this.map = map}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {
            issues.map(issue =>
              <Marker position={[issue.latitude, issue.longitude]} key={issue.code} bubblingMouseEvents={true} >
                <Tooltip direction='top'>
                  <MapTooltip
                    service={issue.service.name}
                    ticket={issue.code.toUpperCase()}
                    address={issue.address}
                    date={issue.createdAt}
                    status={issue.status.name}
                  />
                </Tooltip>
              </Marker>)
          }
        </Map >
      </div>
    );
  }
}

export default SimpleMap;

