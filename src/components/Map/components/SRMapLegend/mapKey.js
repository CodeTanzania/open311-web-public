import React, { Component } from 'react';
import classnames from 'classnames/bind';
import styles from './styles.scss';

const cx = classnames.bind(styles);

class MapKey extends Component {
  constructor() {
    super();
    // bind function
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleClick() {
    this.props.onMapKeyClicked(this.props.mapKey.id);
  }

  handleInputChange() {
    this.props.onMapKeyClicked(this.props.mapKey.id);
  }

  render() {
    const { mapKey } = this.props;
    return (
      <div className={cx('symbol')} title='Click to Filter'>
        <div className={cx('symbolIcon', `${mapKey.code}`)}></div>
        <div className={cx('symbolDesc')} onClick={this.handleClick}>{mapKey.name}</div>
        <input name='mapKey' type='checkbox' className={cx('symbolInput')} checked={mapKey.selected} onChange={this.handleInputChange} />
      </div>
    );
  }
}

export default MapKey;
