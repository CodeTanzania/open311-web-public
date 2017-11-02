/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map, TileLayer, Tooltip, GeoJSON } from 'react-leaflet';
import { divIcon, marker } from 'leaflet';
import SRTooltip from './components/SRTooltip';
import SRCard from './components/SRCard';
import SRMapLegend from './components/SRMapLegend';
import { connect } from 'react-redux';
import { getServiceRequests } from 'actions';
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
    this.pointToLayer = this.pointToLayer.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
  }

  componentDidMount() {
    const map = this.map.leafletElement;
    map.on('click', () => {
      this.setState({ selected: undefined, zoom: defaultZoom });
    });
  }

  pointToLayer(feature, latlng) {
    const SRItem = JSON.parse(feature.properties.SRItem);
    const SRMarker = marker(latlng, { icon: getIcon(SRItem.service.name) });
    const markerContent = document.createElement('div');

    ReactDOM.render(
      <SRTooltip serviceRequest={SRItem} />,
      markerContent
    );
    SRMarker.bindTooltip(markerContent.innerHTML, { direction: 'top' });
    return SRMarker;
  }

  onEachFeature(feature, layer) {
    layer.on({
      click: () => {
        const SRItem = JSON.parse(feature.properties.SRItem);
        this.setState({ selected: SRItem, center: [SRItem.latitude, SRItem.longitude], zoom: 12 });
      }
    });
  }

  render() {
    const { center, zoom, selected } = this.state;
    const { serviceRequests, mapLoading } = this.props;

    return (
      <div>
        <div className={cx('loaderContainer', { 'hide': !mapLoading })} style={{ zIndex: 501 }}>
          <div className={cx('loader')}></div>
        </div>
        <SRCard serviceRequest={selected} />
        <Map center={center} zoom={zoom} ref={map => this.map = map}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />

          {
            serviceRequests.map(item => {
              const data = {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': item.location.coordinates
                },
                'properties': {
                  'SRItem': JSON.stringify(item)
                }
              };
              return (<GeoJSON data={data} key={item.code} pointToLayer={this.pointToLayer.bind(this)} onEachFeature={this.onEachFeature}>
              </GeoJSON>);
            })
          }
        </Map >
        <div className={cx('mapLegend')} style={{ zIndex: 500 }}>
          <SRMapLegend />
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    serviceRequests: state.serviceRequests,
    mapLoading: state.mapLoading
  };
};

export default connect(mapStateToProps, { getServiceRequests })(SimpleMap);

