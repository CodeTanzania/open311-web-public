import React from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';

import IssueCard from './index.jsx';

const issue = {
    service: {
        name: 'Water Leakage'
    },
    address: '792 Becker Knoll',
    description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    code: 'HLK170006'
}

storiesOf('Issue Card', module)
    .addWithInfo('Default', 'Issuecard is the card with issue info displayed on the map on marker click', () => <IssueCard issue={issue} />
    )
    .addWithInfo('Show', '', () => <IssueCard issue={issue} />);