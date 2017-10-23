
import React, { Component } from 'react';
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { divIcon } from 'leaflet';
import SRTooltip from './components/SRTooltip';
import SRCard from './components/SRCard';
import SRMapLegend from './components/SRMapLegend';
import { connect } from 'react-redux';
import { getAllServiceRequests } from 'actions';
import styles from './styles.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
import './leaflet.css';

const defaultZoom = 10;
//Get service request(issue) using lat & lng
const getIssue = (latlng, issues) => {
  return issues.find(issue => {
    return issue.latitude === latlng.lat && issue.longitude === latlng.lng;
  });
};

const getIcon = serviceRequestName => {
  switch (serviceRequestName) {
    case 'Water Leakage':
      return divIcon({ className: 'iconWL' });
    case 'Water Theft':
      return divIcon({ className: 'iconWTH' });
    case 'Lack of Water':
      return divIcon({ className: 'iconLW' });
    case 'Meter Problem':
      return divIcon({ className: 'iconMP' });
    case 'Seawage Leakage':
      return divIcon({ className: 'iconSL' });
    case 'Water Quality':
      return divIcon({ className: 'iconWQ' });
    case 'New Connection':
      return divIcon({ className: 'iconNW' });
    default:
      return divIcon({ className: 'iconRO' });
  }
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
        <div className={cx('loaderContainer', { 'hide': !serviceRequest.isFetching })} style={{ zIndex: 501 }}>
          <div className={cx('loader')}></div>
        </div>
        <SRCard serviceRequest={selected} showCard={true} />
        <Map center={center} zoom={zoom} ref={map => this.map = map}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {
            serviceRequest.items.map(issue =>
              <Marker position={[issue.latitude, issue.longitude]} key={issue.code} bubblingMouseEvents={true} icon={getIcon(issue.service.name)}>
                <Tooltip direction='top'>
                  <SRTooltip serviceRequest={issue} />
                </Tooltip>
              </Marker>)
          }
        </Map >
        <div className={cx('mapLegend')} style={{ zIndex: 600 }}>
          <SRMapLegend />
        </div>
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

