import React from 'react';
import classnames from 'classnames/bind';

import styles from './styles.scss';

const cx = classnames.bind(styles);

export default function Footer() {
  return (
    <div className={cx('footer')}>
      <div className={cx('footerPrimaryItem')}>
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
      </div>
      <div className={cx('footerSecondaryItem')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={cx('githubIcon')} viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        <a href="https://github.com/CodeTanzania/open311-web-public" className={cx('githubText')} target="_blank" >View GitHub Repo</a>
      </div>
    </div >
  );
}
