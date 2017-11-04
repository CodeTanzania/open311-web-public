import React from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';

import SRTooltip from './index.jsx';

const serviceRequest = {
    service: {
        name: 'Water Leakage'
    },
    address: '792 Becker Knoll',
    description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    code: 'HLK170006',
    jurisdiction: {
        name: 'Tabata'
    },
    createdAt: '2017-09-22T11:56:39.585Z',
    status: {
        name: 'Pending'
    }
}

storiesOf('SR Tooltip', module)
    .addWithInfo('Default', 'Service Request Tooltip is the tooltip displayed when hovering over map markers', () => <SRTooltip serviceRequest={serviceRequest} />)

