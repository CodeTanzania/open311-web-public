import React, { Component } from 'react';
import styles from './styles.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
import Button from 'Button';

import { connect } from 'react-redux';
import { searchSRByTicketNo } from 'actions';

class SearchBox extends Component {

    constructor() {
        super();
        this.state = {
            ticketNum: ''
        };
        //bind functions
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ticketNum !== this.props.ticketNum) {
            this.setState({
                ticketNum: nextProps.ticketNum
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
            <form className={cx('searchBox')} onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.ticketNum} onChange={this.handleChange} className={cx('searchField')} placeholder="Enter Ticket Number" />
                {/* <button className={cx('searchBtn')}><i className="fa fa-search" aria-hidden="true"></i></button> */}
                <Button searchBtn={true}><i className="fa fa-search" aria-hidden="true"></i></Button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ticketNum: state.ticketNum
    };
};

export default connect(mapStateToProps, { searchSRByTicketNo })(SearchBox);