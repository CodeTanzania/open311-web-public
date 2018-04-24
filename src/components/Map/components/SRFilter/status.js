import React, { Component } from 'react';
import classnames from 'classnames/bind';
import styles from './status.scss';

const cx = classnames.bind(styles);

class Status extends Component {
  constructor() {
    super();
    this.onClickStatus = this.onClickStatus.bind(this);
  }

  onClickStatus() {
    this.props.onStatusClicked(this.props.status.id);
  }

  render() {
    const { status } = this.props;
    return (<div className={cx('status', { selected: status.selected })} onClick={this.onClickStatus} title='Click to Filter'>{status.name}</div>);
  }
}

export default Status;
