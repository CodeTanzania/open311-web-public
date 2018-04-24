import React, { Component } from 'react';
import classnames from 'classnames/bind';
import styles from './issue.scss';

const cx = classnames.bind(styles);

class Issue extends Component {
  constructor() {
    super();
    this.onClickIssue = this.onClickIssue.bind(this);
  }

  onClickIssue() {
    this.props.onIssueClicked(this.props.issue.id);
  }

  render() {
    const { issue } = this.props;
    const issueIconName = issue.name.toLowerCase().replace(/ /g, '_');
    const imgUrl = `icons/issues/${issueIconName}.svg`;
    const imgStyle = {
      border: `3px solid ${issue.color}`,
      borderRadius: '50%',
    };
    return (
      <div className={cx('issue', { selected: issue.selected })}
        onClick={this.onClickIssue} title={`Click to filter by ${issue.name}`} >
        <div className={cx('issueIconHolder')}>
          <img src={imgUrl} className={cx('issueIcon')} style={imgStyle} />
        </div>
        <span className={cx('issueText')} >{issue.name}</span>
      </div>
    );
  }
}

export default Issue;
