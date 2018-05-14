import React, { Component } from 'react';
import classnames from 'classnames/bind';
// import Button from 'Button';
import { connect } from 'react-redux';
import { searchSRByTicketNo } from 'actions';
import styles from './styles.scss';

const cx = classnames.bind(styles);


class SearchBox extends Component {
  constructor() {
    super();
    this.state = {
      ticketNum: '',
    };
    // bind functions
    this.handleEnterKey = this.handleEnterKey.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ticketNum !== this.props.ticketNum) {
      this.setState({
        ticketNum: nextProps.ticketNum,
      });
    }
  }

  handleEnterKey(event) {
    if (event.key === 'Enter') {
      this.props.searchSRByTicketNo(this.state.ticketNum.toUpperCase());
    }
  }

  handleChange(event) {
    this.setState({ ticketNum: event.target.value });
  }

  render() {
    const { placeholder } = this.props;
    return (
      <div className={cx('searchBox')}>
        <div className={cx('searchBtn')}>
          <img src="icons/search.svg" alt="" className={cx('searchBtnIcon')} />
        </div>
        <div className={cx('searchFieldContainer')}>
          <input
            type="text"
            value={this.state.ticketNum}
            onChange={this.handleChange}
            className={cx('searchField')}
            onKeyPress={this.handleEnterKey}
            placeholder={placeholder || 'Enter ticket number'} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ticketNum: state.ticketNum,
});

export default connect(mapStateToProps, { searchSRByTicketNo })(SearchBox);
