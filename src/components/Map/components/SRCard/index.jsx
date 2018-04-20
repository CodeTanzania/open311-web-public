/* eslint no-unused-vars: "off" */
/* eslint no-trailing-spaces: "off" */
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
import './streamline.css';
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

const renderCard = (props, onBackBtnClicked) => {
  const { selectedSR, SRSummary, publicServices } = props;

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
        },
      ],
      grid: {
        top: 5,
        bottom: 45,
        left: 100,
      },
    };

    // create jurisdictions chart data
    // const jurisdictionChartData = SRSummary.jurisdictions.map(jurisdiction => ({
    //   name: jurisdiction.name,
    //   value: jurisdiction.count,
    //   color: jurisdiction.color,
    // }));

    // // create echart jurisdiction pie chart options
    // jurisdictionPieChartOption = {
    //   title: {
    //     text: 'Total',
    //     subtext: jurisdictionChartData.reduce((prev, curr) => prev + curr.value, 0),
    //     x: 'center',
    //     y: 'center',
    //     textStyle: {
    //       fontWeight: 'normal',
    //       fontSize: 16,
    //     },
    //   },
    //   tooltip: {
    //     show: true,
    //     trigger: 'item',
    //     formatter: '{b}:<br/> Count: {c} <br/> Percent: ({d}%)',
    //   },
    //   series: [{
    //     type: 'pie',
    //     selectedMode: 'single',
    //     radius: ['45%', '55%'],
    //     color: jurisdictionChartData.map(data => data.color),
    //     label: {
    //       normal: {
    //         formatter: '{b}\n{d}%',
    //       },
    //     },
    //     data: jurisdictionChartData,
    //   }],
    // };

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
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }


  if (selectedSR) {
    const serviceName = selectedSR.service.name;
    const alias = serviceName.replace(/\s/g, '_').toLowerCase();
    const imgUrl = `icons/issues/${alias}.svg`;
    const today = moment();
    const createdAt = moment(selectedSR.createdAt);
    const days = today.diff(createdAt, 'days');
    return (
      <div className={cx('cardContainer')} style={{ zIndex: 500 }}>
        <div className={cx('cardItem')}>
          <div className={cx('cardItemTitle')}>Issue Type</div>
          <div className={cx('cardItemContent')}>
            <img src={imgUrl} className={cx('cardItemIcon')} />
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
        {selectedSR.changelogs ? (<div className={cx('cardItem')}>
          <div className={cx('cardItemTitle')}>Resolution Timeline</div>
          <div className={cx('cardItemContent')}>
          </div>
        </div>) : ''}
        <div className={cx('cardItem')}>
          <div className={cx('cardItemTitle', 'small')}>Ticket No:</div>
          <div className={cx('cardItemContent', 'gray')}>
            {selectedSR.code}
          </div>
        </div>
        <div className={cx('cardItem')}>
          <div className={cx('cardItemTitle', 'small')}>Days since submission:</div>
          <div className={cx('cardItemContent', 'gray')}>
            {days} <span>(<Moment format='DD/MM/YYYY' date={selectedSR.createdAt} />)</span>
          </div>
        </div>
        <div className={cx('cardItem')}>
          <div className={cx('cardItemTitle', 'small')}>Address:</div>
          <div className={cx('cardItemContent', 'gray', 'small')}>
            {selectedSR.address}
          </div>
        </div>
        <div className={cx('cardItem')}>
          <div className={cx('cardItemTitle', 'small')}>Area:</div>
          <div className={cx('cardItemContent', 'gray', 'small')}>
            {selectedSR.jurisdiction.name}
          </div>
        </div>
        <div className={cx('cardItem')} onClick={onBackBtnClicked}>
          <div className={cx('cardItemLink')}>
            <span>&#x3c;</span><span>&#x3c;</span><span> Back to summary statistics</span>
          </div>
        </div>
        {/* <div>
          <div className={cx('serviceName')}>
            <span>{selectedSR.service.name}</span>
          </div>
          <div className={cx('item')}>
            <div className={cx('itemTitle', 'horizontal')}>Ticket No:</div>
            <div className={cx('itemValue', 'horizontal')}>{selectedSR.code}</div>
          </div>
          <div className={cx('item', 'grid')}>
            <div className={cx('itemLeft')}>
              <div className={cx('itemTitle', 'vertical')}>Address:</div>
              <div className={cx('itemValue')}>{selectedSR.address}</div>
            </div>
            <div className={cx('itemRight')}>
              <div className={cx('itemTitle', 'vertical')}>Area:</div>
              <div className={cx('itemValue')}>{selectedSR.jurisdiction.name}</div>
            </div>
          </div>
          <div className={cx('item', 'grid')}>
            <div className={cx('itemLeft')}>
              <div className={cx('itemBtn', getSRStatusClass(selectedSR.status.name))}>
                Status - {selectedSR.status.name}
              </div>
            </div>
            <div className={cx('itemRight')}>
              <div className={cx('itemBtn', getSRPriorityClass(selectedSR.priority.name))}>
                Priority - {selectedSR.priority.name}
              </div>
            </div>
          </div>
          <div className={cx('item', 'last')}>
            <div className="streamline">
              {
                selectedSR.changelogs ?
                  selectedSR.changelogs.map(changelog => (
                    <div 
                    className="sl-item" 
                    key={changelog.id} 
                    style={{ borderColor: changelog.status.color }}>
                      <div className="sl-content">
                        <div className="sl-date">
                          <span className="sl-dateTitle"> 
                          {changelog.changer ? changelog.changer.name : ''} 
                          </span>
                          <Moment format='ddd MMM D, YYYY' date={changelog.createdAt} />
                        </div>
                        {
                          changelog.status ? (<p>Change status to
                                            <span className='labelBadge' style={{ 
                                              backgroundColor: changelog.status.color, 
                                              color: changelog.status.color }}>
                              <span className='labelText'>{changelog.status.name}</span>
                            </span>
                          </p>) : ''
                        }
                        {
                          changelog.priority ? (<p>Change priority to
                                            <span className='labelBadge' style={{ 
                                              backgroundColor: changelog.priority.color, 
                                              color: changelog.priority.color }}>
                              <span className='labelText'>{changelog.priority.name}</span>
                            </span>
                          </p>) : ''
                        }
                        {
                          changelog.assignee ? (
                            <p>
                              Assignee to {changelog.assignee.name}
                            </p>
                          ) : ''
                        }

                      </div>
                    </div>
                  )) : ''
              }
            </div>
          </div>
        </div> */}
      </div>
    );
  }
  return (
    <div className={cx('cardContainer')} style={{ zIndex: 500 }}>
      <div className={cx('header')} >
        <span className={cx('cardTitle')}> Summary Statistics</span>
        <span className={cx('cardSubtitle')}> LAST 30 DAYS</span>
      </div>
      <div className={cx('cardItem', 'withPadding')}>
        <div className={cx('cardItemTitle')}>Total Reports</div>
        <div className={cx('cardItemContent', 'big', 'green')}>
          {totalCount}
        </div>
      </div>
      {
        barChartOption ? (<div className={cx('cardItem', 'withPadding')}>
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
        serviceStatusChartOption ? (<div className={cx('cardItem', 'noPadding')}>
          <div className={cx('cardItemTitle')}>Status</div>
          <div>
            <ReactEcharts echarts={echarts} notMerge={true}
              lazyUpdate={true} style={{ height: '150px' }} option={serviceStatusChartOption} />
          </div>
        </div>) : ''
      }
    </div>
  );
};

class SRCard extends Component {
  constructor(props) {
    super(props);
    this.state = { showCard: true };
    // bind functions
    this.onBackBtnClicked = this.onBackBtnClicked.bind(this);
  }

  onBackBtnClicked() {
    this.props.unselectMapPoint();
  }

  render() {
    return renderCard(this.props, this.onBackBtnClicked);
  }
}

const mapStateToProps = state => ({
  selectedSR: state.selectedMapPoint,
  SRSummary: state.SRSummary,
  publicServices: state.serviceFilter.services,
});

export default connect(mapStateToProps, { unselectMapPoint })(SRCard);