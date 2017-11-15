import React from 'react';
import { storiesOf } from '@storybook/react';

import { Provider } from 'react-redux';

import store from 'store';

import SRSearchBox from './index.jsx';

storiesOf('SR Search Box', module)
    .addDecorator(getStory => (<Provider store={store}>{getStory()}</Provider>))
    .addDecorator(getStory => (<div style={{ width: '500px' }} >{getStory()}</div>))
    .addWithInfo('Default', 'Service Request Search Box', () => <SRSearchBox />);