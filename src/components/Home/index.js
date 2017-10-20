import React, { Component } from 'react';
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet';
import MapTooltip from './components/MapTooltip';
import IssueCard from './components/IssueCard';
import { connect } from 'react-redux';
import { getAllServiceRequests } from 'actions';
import './leaflet.css';

const defaultZoom = 11;
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
      zoom: defaultZoom,
      center: [-6.816330, 39.276638],
      issues: [],
      selected: {}
    };
    //bind functions
  }

  componentDidMount() {
    const map = this.map.leafletElement;
    map.on('click', (event) => {
      const serviceRequest = getIssue(event.latlng, this.props.serviceRequest.items);
      if (serviceRequest) {
        this.setState({ selected: serviceRequest, center: event.latlng, zoom: 12 });
      } else {
        this.setState({ zoom: defaultZoom });
      }
    });

    this.props.getAllServiceRequests();
  }

  render() {
    const { center, zoom, selected } = this.state;
    const { serviceRequest } = this.props;

    return (
      <div>
        <IssueCard issue={selected} showCard={true} />
        <Map center={center} zoom={zoom} ref={map => this.map = map}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {
            serviceRequest.items.map(issue =>
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

const mapStateToProps = (state) => {
  return {
    serviceRequest: state.serviceRequest
  };
};

export default connect(mapStateToProps, { getAllServiceRequests })(SimpleMap);

