import React from 'react';
import classnames from 'classnames/bind';

import styles from './styles.scss';

const cx = classnames.bind(styles);

export default function Footer() {
  return (
    <div className={cx('footer')}>
      <a href="https://play.google.com/store/apps/details?id=com.customerinfo" target="_blank" className={cx('phone', 'smart')}>
        <div className={cx('phoneContent', 'smart')}>
          <svg xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
            width="29px" height="49px" viewBox="0 0 29 49" className={cx('icon')}>
            <image x="0" y="0" width="29" height="49" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAxCAQAAACM9GrJAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAF6SURBVEjH7da/S8NAFAfw73tJdRCkmyCKIIji7uRW/A8cuncQFHF38w/Q0cWpi6CLg/+AoKUgLdVVdBcdCgWlQi7vOWiqJHfXpAguvSWB3Cd370fCkYGCdnmH5pBzaFfOdJ8VEeJTLTzkzkzCVItDVdX4CNIYjWorpKlsNHKNAxJSAAAJUOXtbMgh+pZMPEVXCkrmoDSLLDWhLYdcKy3rB9G3JK7YZlkpwOvDi8R5q/mndLBhPYwviYZNFw0WuZ6i1KAbAeDTCgbfo57e8EyAwLuighEAC9ZYGQHUD91pcuEstGTYhm3QWpw0tkNHXX9jF3S2RILd0NnDX++MPdBDAQZ5G8Tbw/6+/J8vZ0zHdEwBdHOK5+Tm5y+xipVcdGlwp80RzxJNb6zqXd5DzWZcNmv6WpjKsVygJ+14q/iqYepqiaftykNUi8qmIi+Ox7eQluck+OZ51mY5dyfKdpIbjAdEkE7xosq7mScDneAT2qBp5B196cgeP34C8cbaKe9gQeAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDQtMjFUMTA6MjE6MDQrMDA6MDCO6GLhAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA0LTIxVDEwOjIxOjA0KzAwOjAw/7XaXQAAAABJRU5ErkJggg==" />
          </svg>
          <span className={cx('text')}>Download the <strong>Android</strong> App </span>
        </div>
      </a>
      <div className={cx('phone')}>
        <div className={cx('phoneContent')}>
          <svg xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
            width="27px" height="54px" viewBox="0 0 27 54" className={cx('icon')}>
            <image x="0" y="0" width="27" height="54" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAA2CAQAAACc7yo2AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAGwSURBVEjH7ZYxLwRREMd/b3fdLU44oVGc0Cl1GiFRKWhO7UsotXKJQqHSuUTofAGNuPgAag2NRCE57k4E2dtRmPcuTji7ckRitvnP7vzzZv7zZrImQgCDT0fLcc4AAPtB52hnHmOKRrwENKGh6D4J7c3BXac1iC0MQDAwQ39HWh89jiaYor9lxpMlGZiif5iitjSkH1Hy+zR7J5/Z4rlDbIY1Mq/QiABQY+gLh9wxCEDZJunpSHxmA62S/oSS/7R/WtdpsdvvH9vb9QpAL6UvTHevhXa6k1n5dzaXcO8qyNLkQb0+fJ5c1TmMjX+1uoxKKKGEsiEix4pDORaRDcWjUtfoXXtazI2iK6DGo3o14Eq9x1YDrJJNTmkCMMEkVc70+zTDXHAJgM+s/lCUUzbg/TKfZ45L9vT9KhNUOFGx3DK3klQFfVZE5MB5ByKy4rxquyRZllT0ZWCKBX0/BSxzq83ItkuSsjac5AEBsWtwBo+ISL3QBtvL1aBAnjx5NoGK4jwVYFNxoTVcf6Ld6QbHT0UTPFIkGR8RLUpCa5YiTARFb90U3CX9NDu5jnfYNrwA3970uBVV1q4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDQtMjFUMTA6MjE6MTArMDA6MDC2DUZsAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA0LTIxVDEwOjIxOjEwKzAwOjAwx1D+0AAAAABJRU5ErkJggg==" />
          </svg>
          <div className={cx('text')}> text <strong>Dawasco</strong>  to <strong>"15900"</strong> for free
          <span className={cx('subtext')}> Vodacom &nbsp;&nbsp;Airtel &nbsp;&nbsp;Tigo &nbsp;&nbsp;Halotel</span>
          </div>
        </div>
      </div>
    </div >
  );
}
