import React from 'react';
import { storiesOf } from '@storybook/react';
import MapKey from './mapKey';
import { Provider } from 'react-redux';

import store from 'store';

import SRMapLegend from './index.jsx';

storiesOf('SR Map Legend', module)
    .addDecorator(getStory => (<Provider store={store}>{getStory()}</Provider>))
    .addWithInfo('Default', 'Service Request Map legend to describe symbols used on the map', () => <SRMapLegend />)

