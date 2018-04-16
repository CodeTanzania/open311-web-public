import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchServices } from 'actions';
import API from 'API';
import classnames from 'classnames/bind';
import styles from './styles.scss';


const cx = classnames.bind(styles);

class Statistic extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchServices();
    API
      .getSRSummary()
      .then((data) => {
        this.setState({ data });
      });
  }

  render() {
    const { data } = this.state;
    const { publicServices } = this.props;
    let services = [];
    if (data) {
      services = data
        .services
        .filter(service =>
          publicServices.some(publicService => publicService.name === service.name));
    }

    return (
      [
        <div key='1' className={cx('title')}>
          <span className={cx('titleLabel')}>Statistics</span>
          <span className={cx('titleValue')}>LAST 30 DAYS</span>
        </div>,
        <div key='2' className={cx('items')} id='statistics' >
          {
            services.length ? services.map((service) => {
              const alias = service.name.replace(/\s/g, '_').toLowerCase();
              const imgUrl = `images/icons/${alias}.svg`;
              return (
                <div key={service.name} className={cx('item')} >
                  <img src={imgUrl} className={cx('icon')} />
                  <div key='name' className={cx('itemName')} >{service.name}</div>
                  <div key='value' className={cx('itemValue')} >{service.count}</div>
                </div>
              );
            }) : ''
          }
        </div>,
      ]);
  }
}

const mapStateToProps = state => ({
  publicServices: state.serviceFilter.services,
});

export default connect(mapStateToProps, { fetchServices })(Statistic);
