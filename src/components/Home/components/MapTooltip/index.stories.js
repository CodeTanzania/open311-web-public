import React from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';

import MapTooltip from './index.jsx';

storiesOf('MapTooltip', module)
    .addWithInfo('Default', 'MapTooltip is the tooltip displayed when hovering over map markers', () => <MapTooltip
        service='Water Leakage'
        ticket='HLK170006'
        address='Ohio'
        area='Tabata'
        date='2017-09-22T11:56:39.585Z'
        status='Open'
    />)

