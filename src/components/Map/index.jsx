/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Tooltip, GeoJSON } from 'react-leaflet';
import { divIcon, icon, marker, control } from 'leaflet';
import SRTooltip from './components/SRTooltip';
import SRCard from './components/SRCard';
import SRFilter from './components/SRFilter';
import SRMapLegend from './components/SRMapLegend';
import SRDateFilter from './components/SRDateFilter';
import SRSearchBox from './components/SRSearchBox';
import { connect } from 'react-redux';
import { initMapData, selectMapPoint, fetchMapDataComplete, resetSearchTicketNum, reloadSRSummary } from 'actions';
import { MAP_DATA_RELOAD, MAP_DATA_SEARCH_BY_TICKETNO } from 'utils/constants';
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
/**
 * This function reset icon on previous marker and 
 * set icon on current marker
 * @param {Object} previousSRItemMarker ~ previous  marker
 * @param {Object} currentSRItemMarker ~ current  marker
 */
const setMarkerCustomIcon = (previousSRItemMarker, currentSRItemMarker) => {
  if (previousSRItemMarker) {
    //reset icon on previous clicked marker
    previousSRItemMarker.marker.setIcon(getIcon(previousSRItemMarker.SRItem.service.name));
  }
  //set new icon to the current clicked marker
  if (currentSRItemMarker) {
    currentSRItemMarker.marker.setIcon(divIcon({ className: 'customMarker' }));
  }
};

let srItemMarkerMap = {}; // Hold the mapping of SRItem and leaflet Marker instance


class SimpleMap extends Component {
  constructor() {
    super();
    this.state = {
      zoom: defaultZoom,
      center: [-6.816330, 39.276638],
      issues: []
    };
    //bind functions
    this.pointToLayer = this.pointToLayer.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
    this.handleEnterValidTicket = this.handleEnterValidTicket.bind(this);
  }
  /**
   * This method is called only once
   * 
   * @memberof SimpleMap
   */
  componentDidMount() {
    const map = this.map.leafletElement;
    //Reset zoom level when click outside issues
    map.on('click', () => {
      this.setState({ zoom: defaultZoom });
    });
    //Reposition zoom control buttons
    control.zoom({
      position: 'bottomleft'
    }).addTo(map);
    //Initialize map data, such as service requests etc
    this.props.initMapData();
    this.props.reloadSRSummary();
  }

  pointToLayer(feature, latlng) {
    const SRItem = JSON.parse(feature.properties.SRItem);
    const SRMarker = marker(latlng, { icon: getIcon(SRItem.service.name) });

    srItemMarkerMap[SRItem.code] = { marker: SRMarker, SRItem };
    const tooltipContent = document.createElement('div');

    ReactDOM.render(
      <SRTooltip serviceRequest={SRItem} />,
      tooltipContent
    );
    SRMarker.bindTooltip(tooltipContent, { direction: 'top' });
    return SRMarker;
  }

  onEachFeature(feature, layer) {
    layer.on({
      click: () => {
        const SRItem = JSON.parse(feature.properties.SRItem);
        const selectedSRItemMarker = srItemMarkerMap[SRItem.code];
        setMarkerCustomIcon(this.state.selectedSRItemMarker, selectedSRItemMarker);
        this.props.selectMapPoint(SRItem);
        this.props.resetSearchTicketNum();
        this.setState({ center: [SRItem.latitude, SRItem.longitude], zoom: 12, selectedSRItemMarker: selectedSRItemMarker });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedSR && srItemMarkerMap[prevProps.selectedSR.code]) {
      //There is a selected point and it's in the Map
      const selectedSRItemMarker = srItemMarkerMap[prevProps.selectedSR.code];
      const SRItem = selectedSRItemMarker.SRItem;
      if (!prevState.selectedSRItemMarker) {
        //This is the first point to be selected
        setMarkerCustomIcon(undefined, selectedSRItemMarker);
        this.setState({ center: [SRItem.latitude, SRItem.longitude], zoom: 12, selectedSRItemMarker: selectedSRItemMarker });
      } else if (prevState.selectedSRItemMarker.SRItem.code !== prevProps.selectedSR.code) {
        // 
        setMarkerCustomIcon(prevState.selectedSRItemMarker, selectedSRItemMarker);
        this.setState({ center: [SRItem.latitude, SRItem.longitude], zoom: 12, selectedSRItemMarker: selectedSRItemMarker });
      }
    }
  }

  handleEnterValidTicket() {
    this.props.resetSearchTicketNum();
    this.props.fetchMapDataComplete();
  }


  render() {
    const { center, zoom } = this.state;
    const { serviceRequests, mapData, ticketNum } = this.props;
    const { loading, dataFound, title } = mapData;
    const ticketNotFound = !loading && !dataFound && title === MAP_DATA_SEARCH_BY_TICKETNO;

    return (
      <div>
        <div className={cx('loader', { 'hide': !loading && dataFound })} style={{ zIndex: 501 }}>
          <div className={cx('spinner', { 'hide': !loading && !dataFound })}>
          </div>
          {
            ticketNotFound ? <div className={cx('loaderInfo')}>
              <div className={cx('loaderInfoHeader')}>Invalid Ticket Number</div>
              <div className={cx('loaderInfoBody')}>Dawasco Map Cannot Find Issue with Ticket No: <strong>{ticketNum}</strong></div>
              <div className={cx('loaderInfoAction')}>
                <button type="button" className="btn btn-primary" onClick={this.handleEnterValidTicket}>Enter Valid Ticket Number</button>
              </div>
            </div> : ''
          }
        </div>
        <div className={cx('header')} style={{ zIndex: 500 }}>
          <Link to="/"><div className={cx('headerItem', 'homeBtn')} title='Go Home'><i className="fa fa-home fa-2x" aria-hidden="true"></i></div></Link>
          <div className={cx('headerItem')} >
            <SRSearchBox />
          </div>
          <div className={cx('headerItem')}><SRDateFilter /></div>
          <div className={cx('headerItem')}><SRFilter /></div>
        </div>
        <SRCard />
        <Map center={center} zoomControl={false} zoom={zoom} ref={map => this.map = map}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />

          {
            serviceRequests.map(item => {
              if (item.location) {
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
              } else {
                '';
              }
            })
          }
        </Map >
        <div className={cx('legend')} style={{ zIndex: 500 }}>
          <SRMapLegend />
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    serviceRequests: state.serviceRequests,
    mapData: state.mapData,
    selectedSR: state.selectedMapPoint,
    ticketNum: state.ticketNum
  };
};

export default connect(mapStateToProps, { initMapData, selectMapPoint, fetchMapDataComplete, resetSearchTicketNum, reloadSRSummary })(SimpleMap);

