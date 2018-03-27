import React from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import 'react-select/dist/react-select.css';
import { Provider } from 'react-redux';

import store from 'store';

import SRFilter from './index.jsx';

storiesOf('SR Filter', module)
  .addDecorator(story => (<Provider store={store}>{story()}</Provider>))
  .addWithInfo('Default', 'Service Request Filter', () => <SRFilter />);
