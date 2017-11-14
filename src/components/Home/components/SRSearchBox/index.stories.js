import React from 'react';
import { storiesOf } from '@storybook/react';


import SRSearchBox from './index.jsx';

storiesOf('SR Search Box', module)
    .addDecorator(getStory => (<div style={{ width: '500px' }} >{getStory()}</div>))
    .addWithInfo('Default', 'Service Request Search Box', () => <SRSearchBox />);