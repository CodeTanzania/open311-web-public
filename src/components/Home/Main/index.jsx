import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import { divIcon, marker } from 'leaflet';
import { getServiceRequests } from 'actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import Statistic from './Statistics';
import styles from './styles.scss';
import './styles.css';

const cx = classnames.bind(styles);
const getIcon = (service) => {
  const color = service.color.replace('#', '');
  return divIcon({
    className: `marker-${color}`,
    bgPos: [0, 0],
    tooltipAnchor: [15, 0],
  });
};

class Main extends Component {
  constructor(props) {
    super(props);
    // bind functions
    this.pointToLayer = this.pointToLayer.bind(this);
  }

  pointToLayer(feature, latlng) {
    const SRItem = JSON.parse(feature.properties.SRItem);
    const SRMarker = marker(latlng, { icon: getIcon(SRItem.service) });
    return SRMarker;
  }

  componentDidMount() {
    this.props.getServiceRequests(true);
  }

  render() {
    const { serviceRequests } = this.props;
    return (
      <div className={cx('container')} >
        <Map
          center={[-6.816330, 39.276638]}
          zoom={14}
          zoomControl={false}
          doubleClickZoom={false}
          dragging={false}
          scrollWheelZoom={false}
          touchZoom={false}
          keyboard={false}
          boxZoom={false}
          className='homePageMap'
        >
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
        <div className={cx('info')} >
          <div className={cx('infoItem')} >
            <div className={cx('infoItemHeader')} >What is MAJIFIX</div>
            <div >
              MajFix is the most recent initiative from DAWASCO to improve efficiency
              and accountability of its services. MajiFix relies on citizen participation
              to collect data about water problems in Dar es Salaam.
                </div>
          </div>
          <div className={cx('infoItem')} >
            <div className={cx('infoItemHeader')} >How to use MAJIFIX</div>
            <div >
              To report water problems, just call our free line&nbsp;
                <a href="tel:255800110064" className={cx('link')}><strong>0800110064</strong></a>,
                dial <a href="tel:*311#" className={cx('link')}><strong>*311#</strong></a>,
or download DAWASCO’s application from &nbsp;
                <a href="https://play.google.com/store/apps/details?id=com.customerinfo"
                className={cx('link')}>
                <strong>PlayStore</strong>
              </a>.
                 </div>
          </div>
          <div className={cx('infoItem')} >
            <div className={cx('infoItemHeader')} >About this website</div>
            <div>In this website we publicize the issues that citizens have reported so that
              you can follow up on the problems we’re solving everyday.
                </div>
          </div>
          <Link to="/issues" className={cx('infoItemBtn')}>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                width="24px" height="28px" viewBox="0 0 24 28">
                <filter filterUnits="objectBoundingBox" x="0.00" y="0.00" width="100.00" height="100.00" id="filter0">
                  <feFlood floodColor="rgb(255,255,255)" result="coFloodOut1" />
                  <feComposite in="coFloodOut1" in2="SourceAlpha" operator="in" result="coOverlay1" />
                  <feBlend in="coOverlay1" in2="SourceGraphic" mode="normal" result="colorOverlay1" />
                </filter>
                <image x="0" y="0" width="24" height="28" filter="url(#filter0)" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAQAAADR77dlAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAMkSURBVDjLdZNdaJNnGIav78vX1KbWxs4m6YE/ndZFZkW7OZhVUDo3xYm6UewQ9WBYNrYdTA8UZWwT2RzbGFgRx5yjq+tQtOJvqaiDFaeQUVKrDv9Ja0xKyL/p9zWmeXaQJjStee6TB97rfnnu9+FVhhhfgoVfmwKVu1qGUCacKqkJuAZYnutauNwaS02wqAb5GgE2/aZrsOYcpNHHnTOcJx3h9Goko5ZtgjGOUKJ545SRwprQLaaR0qFYmSIR85RUBHXsSHmBUPn8e90CV9888CmI0nQcTPkhYjlFEXrnIMh7Z4XW2Zmxzq0QomMo+nN6ShpnL2LVxdxDU4UqCFIRCOHHk6OIjyqG0LYeQTbv85Pg1IJs9G8+E2I5Du+ofDxj5iME+agxjMHGS1mD3RdlMMdpvtEsNrqcnmqAzu9sC8863SuzKQcd7Q3rrmQ5TR9tUpzZmuk81Xt35z9Mx7Z3rmQ5rRwAEyo3V1Cgbtcb2DAyT1+X24Db99xRyLKwoig8kiFVzKgopNEDTCtkKLYVBdIISTQXBmk0SmkcuFvAUBE4H9RIIpSg1uEgicE83j5d6P6lF19PPyOOnddQBDdRUszHVF4ZebHhwaxpnuuYqKQWhDgtC9YejCD81Jxd1ljt/EIQ3v/hq5URUiAcXacK8mGr8IStW0qG8/HGHbcQ9n2JIF9/LOCejSDF4U/2CNc5z41Zq49U3SkKm6K2ew3Humq7uIywt7nMiyCdS6j6HbE/dVeGSNLBL6To5jA1pS+VHeQqCdr5g2GCPCx13kYmnVR9DnCEagOP6eQOabrxYyaWCMbNhPiHJP204eHlRHU/GJPVb9ug99WlP0eZjp0w1+hjgKNcIkgfNxnAjp1iVu3vXAXNfynCu39eaIKZD5Yfm9duu2/hLhq7gRaCLMZPfEbPRvcHfYtg0d+utxTBy/YfT2zPfPAa1wyX9t9U/4ZIiXRM8VaZ596ve7xsGIA1bfu3zAehlx6OLG5otegv2gKCFEn9qUPL/8WNgSJcI8BcHvLE7lrrrb/3SsietBoWKDYmRayD1Y8c3W9cqOl3cgsrS/gfeH2m3/Uv79sAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDQtMjFUMDg6NTA6MjIrMDA6MDCu6BwAAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA0LTIxVDA4OjUwOjIyKzAwOjAw37WkvAAAAABJRU5ErkJggg==" />
              </svg>
            </span>
            <span>VIEW REPORTED ISSUES</span>
          </Link>
        </div>
        <Statistic />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  serviceRequests: state.serviceRequests,
});

export default connect(mapStateToProps, { getServiceRequests })(Main);
