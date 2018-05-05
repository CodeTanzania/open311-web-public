/* eslint no-unused-vars: "off" */
/* eslint no-trailing-spaces: "off" */
/* eslint max-len: "off" */
import React, { Component } from 'react';
import classnames from 'classnames/bind';
import { connect } from 'react-redux';
import { unselectMapPoint } from 'actions';
import Moment from 'react-moment';
import moment from 'moment';
// import the core library.
import ReactEcharts from 'echarts-for-react/lib/core';
// then import echarts modules those you have used manually.
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import Lightbox from 'react-images';
import styles from './styles.scss';

const cx = classnames.bind(styles);

const getSRPriorityClass = (priority) => {
  switch (priority) {
    case 'Low':
      return 'priorityLow';
    case 'Normal':
      return 'priorityNormal';
    case 'Critical':
      return 'priorityCritical';
    default:
      return '';
  }
};
const getSRStatusClass = (status) => {
  switch (status) {
    case 'Open':
      return 'statusOpen';
    case 'In Progress':
      return 'statusInProgress';
    case 'Closed':
      return 'statusClosed';
    case 'Escallated':
      return 'statusEscallated';
    default:
      return '';
  }
};

class SRCard extends Component {
  constructor(props) {
    super(props);
    this.state = { showIssueImg: false, currentIssueImg: 0 };
    // bind functions
    this.onBackBtnClicked = this.onBackBtnClicked.bind(this);
    this.closeViewer = this.closeViewer.bind(this);
    this.openImgViewer = this.openImgViewer.bind(this);
    this.goToNextLightboxImg = this.goToNextLightboxImg.bind(this);
    this.goToPrevLightboxImg = this.goToPrevLightboxImg.bind(this);
    this.toggleTimeline = this.toggleTimeline.bind(this);
  }

  onBackBtnClicked() {
    this.props.unselectMapPoint();
  }

  openImgViewer() {
    this.setState({
      showIssueImg: true,
    });
  }

  closeViewer() {
    this.setState({
      showIssueImg: false,
    });
  }

  goToNextLightboxImg() {
    this.setState({
      currentIssueImg: this.state.currentIssueImg + 1,
    });
  }

  goToPrevLightboxImg() {
    this.setState({
      currentIssueImg: this.state.currentIssueImg - 1,
    });
  }

  toggleTimeline() {
    this.setState({
      timelineOpen: !this.state.timelineOpen,
    });
  }

  render() {
    const { selectedSR, SRSummary, publicServices, dateRange, } = this.props; // eslint-disable-line
    const { startDate, endDate } = dateRange;
    const { showIssueImg, currentIssueImg, timelineOpen } = this.state;
    const diff = endDate.diff(startDate, 'days');

    let totalCount = 0;
    let barChartOption;
    let serviceStatusChartOption;
    if (Object.keys(SRSummary).length) {
      totalCount = SRSummary.overall.count;
      // calculate public services
      const services = SRSummary.services.filter(service =>
        publicServices.some(publicService => publicService.name === service.name));
      // create service bar chart data
      const barChartData = services.map((service) => {
        const serie = {
          name: service.name,
          value: service.count / 1000,
          itemStyle: {
            normal: {
              color: '#555555',
            },
            emphasis: {
              color: '#2db34b',
            },
          },
        };

        return serie;
      });
      // create echart service chart options
      barChartOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
          },
          backgroundColor: '#ffffff',
          textStyle: {
            color: '#2db34b',
          },
          formatter(params) {
            return `${params[0].value * 1000}`;
          },
          extraCssText: 'box-shadow: -1px 1px 7px rgba(0, 0, 0, 0.4); border-radius:0',
        },
        yAxis: [{
          type: 'category',
          data: barChartData.map(serie => serie.name),
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontFamily: 'Open Sans',
            color: '#555555',
          },
        }],
        xAxis: [
          {
            type: 'value',
            show: false,
            axisLabel: { formatter: '{value}k' },
          }],
        calculable: true,
        series: [
          {
            type: 'bar',
            data: barChartData,
            legendHoverLink: true,
          },
        ],
        grid: {
          top: 5,
          bottom: 45,
          left: 110,
        },
      };

      // create service per status data
      const serviceStatusData = [
        { value: SRSummary.overall.pending, name: 'pending', itemStyle: { color: '#999999' } },
        { value: SRSummary.overall.resolved, name: 'resolved', itemStyle: { color: '#e5e5e5' } },
        { value: SRSummary.overall.unattended, name: 'unattended', itemStyle: { color: '#4c4c4c' } },
        { value: SRSummary.overall.late, name: 'late', itemStyle: { color: '#000000' } },
      ];

      serviceStatusChartOption = {
        tooltip: {
          trigger: 'item',
          // formatter: '{a} <br/>{b} : {c} ({d}%)',
          formatter(item) {
            return `<span style="color:#a9a9a9">${item.data.name.toUpperCase()}</span><br/> ${item.data.value}`;
          },
          backgroundColor: '#ffffff',
          textStyle: {
            color: '#2db34b',
            fontWeight: 'bold',
          },
          extraCssText: 'box-shadow: -1px 1px 7px rgba(0, 0, 0, 0.4); border-radius:0; text-align:center;',
        },
        series: [
          {
            name: 'Complains',
            type: 'pie',
            hoverAnimation: false,
            radius: '85%',
            center: ['50%', '50%'],
            label: { show: false },
            data: serviceStatusData,
            itemStyle: {
              emphasis: {
                color: '#2db34b',
              },
            },
          },
        ],
      };
    }


    if (selectedSR) {
      const issueIconStyle = {
        border: `3px solid ${selectedSR.service.color}`,
        borderRadius: '50%',
      };
      const serviceName = selectedSR.service.name;
      const alias = serviceName.replace(/\s/g, '_').toLowerCase();
      const issueIconUrl = `icons/issues/${alias}.svg`;
      let sampleIssueImgUrl;
      let lightboxImgs = [];
      if (selectedSR.attachments && selectedSR.attachments.length > 0) {
        const sampleImg = selectedSR.attachments[0];
        sampleIssueImgUrl = `data:${sampleImg.mime};base64,${sampleImg.content}`;
        lightboxImgs = selectedSR
          .attachments
          .map(attachment => ({ src: `data:${attachment.mime};base64,${attachment.content}` }));
      }
      const today = moment();
      const createdAt = moment(selectedSR.createdAt);
      const days = today.diff(createdAt, 'days');
      return (
        <div className={cx('cardContainer')} style={{ zIndex: 500 }}>
          {
            sampleIssueImgUrl ? (<div className={cx('cardItem', 'noPadding')}>
              <div className={cx('issueImgHolder')}>
                <img src={sampleIssueImgUrl} alt="Issue Attachment" className={cx('issueImg')} />
                <div className={cx('showIssueImg')} onClick={this.openImgViewer}>
                  <span>CLICK FOR FULL PHOTO</span>
                </div>
              </div>
            </div>) : ''
          }
          <div className={cx('cardItem')}>
            <div className={cx('cardItemTitle')}>Issue Type</div>
            <div className={cx('cardItemContent', 'icon')}>
              <img src={issueIconUrl} className={cx('cardItemIcon')} style={issueIconStyle} />
              <div className={cx('cardItemCaption')}>{serviceName}</div>
            </div>
          </div>
          <div className={cx('cardItem')}>
            <div className={cx('cardItemTitle')}>Status</div>
            <div className={cx('cardItemContent')}>
              {selectedSR.status.name}
            </div>
          </div>
          <div className={cx('cardItem')}>
            <div className={cx('cardItemTitle')}>Priority</div>
            <div className={cx('cardItemContent')}>
              {selectedSR.priority.name}
            </div>
          </div>
          {selectedSR.changelogs.length ? (<div className={cx('cardItem')}>
            <div
              title={timelineOpen ? 'Click to hide the resolution' : 'Click to display the resolution'}
              className={cx('cardItemTitle', 'collapsible', { closed: !timelineOpen, open: timelineOpen })}
              onClick={this.toggleTimeline}
            >
              Resolution Timeline</div>
            <div className={cx('cardItemContent', 'small')}>
              <div className={cx('timeline', { open: timelineOpen })}>
                {
                  selectedSR.changelogs.map(changelog => (
                    <div className={cx('timelineItem')}
                      date-is={moment(changelog.createdAt).format('ddd MMM D, YYYY')}>
                      {
                        changelog.status ?
                          (<span className={cx('timelineContent')}>Change status to {changelog.status.name}</span>) : ''
                      }
                      {
                        changelog.priority ?
                          (<span>Change priority to {changelog.priority.name}</span>) : ''
                      }
                      {
                        changelog.assignee ?
                          (<span>Assignee to {changelog.assignee.name}</span>) : ''
                      }
                    </div>
                  ))
                }
              </div>
            </div>
          </div>) : ''}
          <div className={cx('cardItem')}>
            <div className={cx('cardItemTitle', 'small')}>Ticket No:</div>
            <div className={cx('cardItemContent', 'small')}>
              {selectedSR.code}
            </div>
          </div>
          <div className={cx('cardItem')}>
            <div className={cx('cardItemTitle', 'small')}>Days since submission:</div>
            <div className={cx('cardItemContent', 'small')}>
              {days} <span>(<Moment format='DD/MM/YYYY' date={selectedSR.createdAt} />)</span>
            </div>
          </div>
          <div className={cx('cardItem')}>
            <div className={cx('cardItemTitle', 'small')}>Address:</div>
            <div className={cx('cardItemContent', 'small')}>
              {selectedSR.address}
            </div>
          </div>
          <div className={cx('cardItem')}>
            <div className={cx('cardItemTitle', 'small')}>Area:</div>
            <div className={cx('cardItemContent', 'small')}>
              {selectedSR.jurisdiction.name}
            </div>
          </div>
          <div className={cx('cardItem')} onClick={this.onBackBtnClicked}>
            <div className={cx('cardItemLink')}>
              <span>&#x3c;</span><span>&#x3c;</span><span> Back to summary statistics</span>
            </div>
          </div>
          {
            lightboxImgs.length ? (<Lightbox
              currentImage={currentIssueImg}
              images={lightboxImgs}
              isOpen={showIssueImg}
              onClose={this.closeViewer}
              onClickNext={this.goToNextLightboxImg}
              onClickPrev={this.goToPrevLightboxImg}
            />) : ''
          }

        </div>
      );
    }
    return (
      <div className={cx('cardContainer')} style={{ zIndex: 500 }}>
        <div className={cx('header')} >
          <span className={cx('cardTitle')}> SUMMARY STATISTICS</span>
          <span className={cx('cardSubtitle')}> LAST {diff - 1} DAYS</span>
        </div>
        <div className={cx('cardItem', 'withPadding')}>
          <div className={cx('cardItemTitle')}>Total Reports</div>
          <div className={cx('cardItemContent', 'big', 'green')}>
            {totalCount}
          </div>
        </div>
        {
          barChartOption ? (<div className={cx('cardItem', 'noTopPadding')}>
            <div className={cx('cardItemTitle')}>Issue Type</div>
            <div>
              <ReactEcharts echarts={echarts} notMerge={true}
                lazyUpdate={true} style={{ height: '250px', width: '100%' }} option={barChartOption} />
            </div>
          </div>) : ''
        }
        {/* {
          jurisdictionPieChartOption ? (<div className={cx('chartItem')}>
            <div className={cx('chartTitle')}>Area</div>
            <div>
              <ReactEcharts echarts={echarts} notMerge={false}
                lazyUpdate={true} style={{ height: '250px' }} option={jurisdictionPieChartOption} />
            </div>
          </div>) : ''
        } */}
        {
          serviceStatusChartOption ? (<div className={cx('cardItem', 'noTopPadding')}>
            <div className={cx('cardItemTitle')}>Status</div>
            <div>
              <ReactEcharts echarts={echarts} notMerge={true}
                lazyUpdate={true} style={{ height: '150px', width: '200px' }} option={serviceStatusChartOption} />
            </div>
          </div>) : ''
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedSR: state.selectedMapPoint,
  SRSummary: state.SRSummary,
  dateRange: state.dateFilter,
  publicServices: state.serviceFilter.services,
});

export default connect(mapStateToProps, { unselectMapPoint })(SRCard);
