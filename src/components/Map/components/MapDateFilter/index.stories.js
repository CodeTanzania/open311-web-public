import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import store from 'store';
import 'react-dates/initialize';
import DateFilter from './index.jsx';

import moment from 'moment';


const handleDatesChange = ({ startDate, endDate }) => {
  console.log(startDate);
  console.log(endDate);
};

storiesOf('Date Filter', module)
  .addDecorator(story => (<Provider store={store}>{story()}</Provider>))
  .addWithInfo('Default', 'Date Filter', () => (<DateFilter onDatesChange={handleDatesChange}
    />));
