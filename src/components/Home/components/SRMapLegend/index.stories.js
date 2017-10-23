import React from 'react';
import { storiesOf } from '@storybook/react';

import SRMapLegend from './index.jsx';


storiesOf('Service Request Map Legend', module)
    .addWithInfo('Default', 'Service Request Map legend to describe symbols used on the map', () => <SRMapLegend />)

