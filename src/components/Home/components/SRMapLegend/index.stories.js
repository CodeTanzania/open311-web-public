import React from 'react';
import { storiesOf } from '@storybook/react';
import MapKey from './mapKey';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store'

// const middlewares = []
// const mockStore = configureStore(middlewares)
// import { RECEIVE_SERVICES, TOGGLE_SERVICE } from 'actions';

// // import store from 'store';
// const actions = [
//     { type: RECEIVE_SERVICES },
//     { type: TOGGLE_SERVICE },
// ]
// const store = mockStore({ services: [] }, actions);

// import SRMapLegend from './index.jsx';

// const mapKeys = [
//     {
//         code: 'WTH',
//         name: 'Water Theft'
//     },
//     {
//         code: 'LW',
//         name: 'Lack of Water',
//         selected: true
//     },
//     {
//         code: 'WL',
//         name: 'Water Leakage'
//     },
//     {
//         code: 'MP',
//         name: 'Meter Problem'
//     },
//     {
//         code: 'SL',
//         name: 'Seawage Leakage'
//     },
//     {
//         code: 'WQ',
//         name: 'Water Quality'
//     },
//     {
//         code: 'NW',
//         name: 'New Connection'
//     },
//     {
//         code: 'RO',
//         name: 'Other'
//     }
// ];
// storiesOf('Service Request Map Legend', module)
//     .addDecorator(getStory => (<Provider store={store}>{getStory()}</Provider>))
//     .addWithInfo('Default', 'Service Request Map legend to describe symbols used on the map', () => <SRMapLegend mapKeys={mapKeys} />)
const mapKey = {
    code: 'WL',
    name: 'Water Leakage',
    selected: false
}
const selectedMapKey = {
    code: 'WL',
    name: 'Water Leakage',
    selected: true
}
storiesOf('Map Key', module)
    .addWithInfo('Default', 'Map Key', () => <MapKey mapKey={mapKey} />)
    .addWithInfo('Selected', 'Map Key', () => <MapKey mapKey={selectedMapKey} />);

