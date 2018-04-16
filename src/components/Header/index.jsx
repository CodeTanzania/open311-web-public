
/* eslint no-unused-vars:1 */
import React, { Component } from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
// import Sidebar from 'Sidebar';
import styles from './styles.scss';

const cx = classnames.bind(styles);
/* eslint no-unused-vars:0 */

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    // Binding of this
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    const visible = !this.state.visible;
    this.setState({
      visible,
    });
  }

  render() {
    const { visible } = this.state;
    return (
      <div className={cx('header')}>
        <div className={cx('content')}>
          <Link to="/" className={cx('logoContainer')}>
            <img src='images/MajiFix_Logo.svg' className={cx('logo')} alt="" />
          </Link>
          {/* <div className={cx('offcanvasMenu')}>
                    <div className={cx('offcanvasBtn')}>
                        <a href="#" onClick={this.toggleSidebar} className="icon ion-navicon-round">
                        </a>
                    </div>
                    <Sidebar visible={visible} onToggleSidebar={this.toggleSidebar}>
                        <ul className={cx('menu')}>
                            <Link to="/#top" className={cx('menuItem')}>Home</Link>
                            <Link to="/#services" className={cx('menuItem')}>Services</Link>
                            <Link to="/#pricing" className={cx('menuItem')}>Price Calculator</Link>
                            <Link to="/ourstory#top" className={cx('menuItem')}>Our Story</Link>
                            <Link to="/faq#top" className={cx('menuItem')}>FAQs</Link>
                            <Link to="/#contacts" className={cx('menuItem')}>Contact Us</Link>
                        </ul>
                    </Sidebar>
                </div> */}
          <div className={cx('horizontalMenu')}>
            <ul className={cx('menu')}>
              <HashLink to="/#about" className={cx('menuItem')}>Home</HashLink>
              <Link to="/issues" className={cx('menuItem')}>Issues</Link>
            </ul>
          </div>
        </div>
        <div className={cx('contentBorder')}>
        </div>
      </div>
    );
  }
}

export default Header;
