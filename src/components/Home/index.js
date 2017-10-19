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
      zoom: 9,
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
      if (serviceRequest) {
        this.setState({ selected: serviceRequest, center: event.latlng, zoom: 13 });
      } else {
        this.setState({ zoom: 9 });
      }
    });

    fetch('http://dawasco.herokuapp.com/servicerequests?query={"location":{"$ne":null}}&limit=200', {
      headers: new Headers({
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5ZTQ0OWQzODI0NjEwMDAwNGYzNDgzMSIsImlhdCI6MTUwODEzMzMzMSwiZXhwIjozMzA2NTczMzMzMSwiYXVkIjoib3BlbjMxMSJ9.3-a02oah-lmHFdqw1wMkbxIVa2qdA_D7ZTo0bGQQ_zE'
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ issues: data.servicerequests });
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
                    area={issue.jurisdiction.name}
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

