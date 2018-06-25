/* eslint no-unused-vars: "off" */
/* eslint class-methods-use-this: "off" */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Tooltip, GeoJSON } from 'react-leaflet';
import { divIcon, icon, marker, control } from 'leaflet';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { initMapData, selectMapPoint, fetchMapDataComplete, resetSearchTicketNum, reloadSRSummary } from 'actions';
import { MAP_DATA_RELOAD, MAP_DATA_SEARCH_BY_TICKETNO } from 'utils/constants';
// import MapFilters from './components/MapFilters';
import SRTooltip from './components/SRTooltip';
import SRCard from './components/SRCard';
import DesktopMapFilter from './components/DesktopMapFilter';
// import SRMapLegend from './components/SRMapLegend';
import MapDateFilter from './components/MapDateFilter';
import SRSearchBox from './components/SRSearchBox';
import FilterBtn from './components/FilterBtn';
import MobileMapFilter from './components/MobileMapFilter';
import Header from '../Header';
import Footer from '../Footer';
import styles from './styles.scss';
import './styles.css';

const cx = classnames.bind(styles);


const defaultZoom = 11;
const bigZoom = 16;
// Get service request(issue) using lat & lng
const getIssue = (latlng, issues) => issues.find(issue =>
  issue.latitude === latlng.lat && issue.longitude === latlng.lng);

const getIcon = (service) => {
  const color = service.color.replace('#', '');
  return divIcon({
    className: `marker-${color}`,
    bgPos: [0, 0],
    tooltipAnchor: [15, 0],
  });
};
/**
 * This function reset icon on previous marker and
 * set icon on current marker
 * @param {Object} previousSRItemMarker ~ previous  marker
 * @param {Object} currentSRItemMarker ~ current  marker
 */
const setMarkerCustomIcon = (previousSRItemMarker, currentSRItemMarker) => {
  if (previousSRItemMarker) {
    // reset icon on previous clicked marker
    previousSRItemMarker.marker.setIcon(getIcon(previousSRItemMarker.SRItem.service));
  }
  // set new icon to the current clicked marker
  if (currentSRItemMarker) {
    currentSRItemMarker.marker.setIcon(divIcon({ className: 'customMarker' }));
  }
};

const srItemMarkerMap = {}; // Hold the mapping of SRItem and leaflet Marker instance


class SimpleMap extends Component {
  constructor() {
    super();
    this.state = {
      zoom: defaultZoom,
      center: [-6.816330, 39.276638],
      issues: [],
      showMobileFilter: false,
    };
    // bind functions
    this.pointToLayer = this.pointToLayer.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
    this.handleEnterValidTicket = this.handleEnterValidTicket.bind(this);
    this.restoreDefaultMapZoom = this.restoreDefaultMapZoom.bind(this);
    this.toggleMobileFilterContent = this.toggleMobileFilterContent.bind(this);
  }
  /**
   * This method is called only once
   *
   * @memberof SimpleMap
   */
  componentDidMount() {
    const map = this.map.leafletElement;
    // Reset zoom level when click outside issues
    // map.on('click', () => {
    //   this.setState({ zoom: defaultZoom });
    // });
    // Reposition zoom control buttons
    control.zoom({
      position: 'bottomleft',
    }).addTo(map);
    // Initialize map data, such as service requests etc
    this.props.initMapData();
    this.props.reloadSRSummary();
  }

  pointToLayer(feature, latlng) {
    const SRItem = JSON.parse(feature.properties.SRItem);
    const SRMarker = marker(latlng, { icon: getIcon(SRItem.service) });

    srItemMarkerMap[SRItem.code] = { marker: SRMarker, SRItem };
    const tooltipContent = document.createElement('div');

    ReactDOM.render(
      <SRTooltip serviceRequest={SRItem} />,
      tooltipContent,
    );
    SRMarker.bindTooltip(tooltipContent, { direction: 'right' });
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
        this.setState({
          center: [SRItem.latitude, SRItem.longitude],
          zoom: bigZoom,
          selectedSRItemMarker,
        });
      },
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedSR && srItemMarkerMap[prevProps.selectedSR.code]) {
      // There is a selected point and it's in the Map
      const selectedSRItemMarker = srItemMarkerMap[prevProps.selectedSR.code];
      const { SRItem } = selectedSRItemMarker;
      if (!prevState.selectedSRItemMarker) {
        // This is the first point to be selected
        setMarkerCustomIcon(undefined, selectedSRItemMarker);
        this.setState({
          center: [SRItem.latitude, SRItem.longitude],
          zoom: bigZoom,
          selectedSRItemMarker,
        });
      } else if (prevState.selectedSRItemMarker.SRItem.code !== prevProps.selectedSR.code) {
        //
        setMarkerCustomIcon(prevState.selectedSRItemMarker, selectedSRItemMarker);
        this.setState({
          center: [SRItem.latitude, SRItem.longitude],
          zoom: bigZoom,
          selectedSRItemMarker,
        });
      }
    }
  }

  handleEnterValidTicket() {
    this.props.resetSearchTicketNum();
    this.props.fetchMapDataComplete();
  }

  restoreDefaultMapZoom() {
    this.setState({ zoom: defaultZoom });
  }

  toggleMobileFilterContent() {
    this.setState({ showMobileFilter: !this.state.showMobileFilter });
  }

  render() {
    const { center, zoom, showMobileFilter } = this.state;
    const {
      serviceRequests,
      mapData,
      ticketNum,
      areas,
      statuses,
      issues,
    } = this.props;
    const isFilterApplied = areas.some(item => item.selected) ||
      statuses.some(item => item.selected) || issues.some(item => item.selected);
    const { loading, dataFound, title } = mapData;
    const ticketNotFound = !loading && !dataFound && title === MAP_DATA_SEARCH_BY_TICKETNO;
    const showRestoreMapZoomBtn = zoom !== defaultZoom;

    return [
      <Header key='header' />,
      <div key='body' className={cx('wrapper')} >
        <div style={{ position: 'relative' }}>
          <Map center={center} zoomControl={false} zoom={zoom} className='mapContainer' ref={(map) => { this.map = map; }}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              id='mapbox.light'
              url='https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoid29ybGRiYW5rLWVkdWNhdGlvbiIsImEiOiJIZ2VvODFjIn0.TDw5VdwGavwEsch53sAVxA#1.6/23.725906/-39.714135/0'
            />
            {
              serviceRequests.map((item) => {
                if (item.location) {
                  const data = {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: item.location.coordinates,
                    },
                    properties: {
                      SRItem: JSON.stringify(item),
                    },
                  };
                  return (<GeoJSON
                    data={data}
                    key={item.code}
                    pointToLayer={this.pointToLayer.bind(this)}
                    onEachFeature={this.onEachFeature}>
                  </GeoJSON>);
                }
                return '';
              })
            }
          </Map >
          <div className={cx('loader', { hide: !loading && dataFound })} style={{ zIndex: 501 }}>
            <div className={cx('spinner', { hide: !loading && !dataFound })}>
            </div>
            {
              ticketNotFound ? <div className={cx('loaderInfo')}>
                <div className={cx('loaderInfoHeader')}>Invalid Ticket Number</div>
                <div className={cx('loaderInfoBody')}>
                  Dawasco Map Cannot Find Issue with Ticket No: <strong>{ticketNum}</strong>
                </div>
                <div className={cx('loaderInfoAction')}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleEnterValidTicket}>
                    Enter Valid Ticket Number
                </button>
                </div>
              </div> : ''
            }
          </div>
          <div className={cx('filter')} style={{ zIndex: 500 }}>
            <div className={cx('filterItem')} >
              <SRSearchBox />
              {/* date filter visible on small screen */}
              <div className={cx('dateFilterVert')}><MapDateFilter /></div>
            </div>
            <div className={cx('filterItem')}>
              <div className={cx('dateFilterHor')}>
                {/* date filter visible on large screen */}
                <MapDateFilter showDefaultInputIcon />
              </div>
            </div>
            <div className={cx('filterItem')}>
              <div className={cx('mapFilterDesktop')}>
                <DesktopMapFilter />
              </div>
              <div className={cx('mapFilterMobile')}>
                <FilterBtn isFilterApplied={isFilterApplied}
                  toggleFilterContent={this.toggleMobileFilterContent} />
              </div>
            </div>
            {/* <div className={cx('filterItem')}>
              </div> */}
          </div>
          {
            showRestoreMapZoomBtn ? (<div
              className={cx('restoreMapZoomBtn')}
              style={{ zIndex: 500 }}
              title='Click to restore map zoom to original'
              onClick={this.restoreDefaultMapZoom}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#8a8a8a" viewBox="0 0 24 24"><path d="M16.586 19.414l-2.586 2.586v-8h8l-2.586 2.586 4.586 4.586-2.828 2.828-4.586-4.586zm-13.758-19.414l-2.828 2.828 4.586 4.586-2.586 2.586h8v-8l-2.586 2.586-4.586-4.586zm16.586 7.414l2.586 2.586h-8v-8l2.586 2.586 4.586-4.586 2.828 2.828-4.586 4.586zm-19.414 13.758l2.828 2.828 4.586-4.586 2.586 2.586v-8h-8l2.586 2.586-4.586 4.586z" />
              </svg>
            </div>) : ''
          }
          <div className={cx('issuesStatsCard')} style={{ zIndex: 500 }}>
            <SRCard />
          </div>
          <div className={cx('issuesStatsCardMobile')}>
            <SRCard />
          </div>

        </div >
        {/* <div className={cx('mobileFilter')} style={{ zIndex: 500 }}>
        </div> */}
        <div style={{ zIndex: '1003' }}>
          <MobileMapFilter showFilter={showMobileFilter}
            onClickCancel={this.toggleMobileFilterContent} />
        </div>
        <Footer />
      </div>,
    ];
  }
}

const mapStateToProps = state => ({
  serviceRequests: state.serviceRequests,
  mapData: state.mapData,
  selectedSR: state.selectedMapPoint,
  ticketNum: state.ticketNum,
  areas: state.jurisdictionFilter.jurisdictions,
  statuses: state.statusFilter.statuses,
  issues: state.serviceFilter.services,
});

export default connect(mapStateToProps, {
  initMapData, selectMapPoint, fetchMapDataComplete, resetSearchTicketNum, reloadSRSummary,
})(SimpleMap);

