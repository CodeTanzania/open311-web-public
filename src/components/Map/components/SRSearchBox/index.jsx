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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ticketNum !== this.props.ticketNum) {
      this.setState({
        ticketNum: nextProps.ticketNum,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.searchSRByTicketNo(this.state.ticketNum.toUpperCase());
  }

  handleChange(event) {
    this.setState({ ticketNum: event.target.value });
  }

  render() {
    return (
      <div className={cx('searchBox')}>
        <div className={cx('searchBtn')} onClick={this.handleSubmit}>
          <img src="images/icons/search.svg" alt="" className={cx('searchBtnIcon')} />
        </div>
        <div className={cx('searchFieldContainer')}>
          <input
            type="text"
            value={this.state.ticketNum}
            onChange={this.handleChange}
            className={cx('searchField')}
            placeholder="Enter Ticket Number" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ticketNum: state.ticketNum,
});

export default connect(mapStateToProps, { searchSRByTicketNo })(SearchBox);
