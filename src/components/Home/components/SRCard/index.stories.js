import React from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';

import SRCard from './index.jsx';

const issue = {
    service: {
        name: 'Water Leakage'
    },
    address: 'Mbezi Juu',
    description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    code: 'HLK170006',
    jurisdiction: {
        name: 'Mabibo'
    }
}

storiesOf('Service Request Card', module)
    .addWithInfo('Default', 'ServiceRequestcard is the card with issue info displayed on the map on marker click', () => <SRCard serviceRequest={issue} />
    )
    .addWithInfo('Show', '', () => <SRCard serviceRequest={issue} />);