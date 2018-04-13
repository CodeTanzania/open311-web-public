import { configure, setAddon } from '@storybook/react';
import infoAddon, { setDefaults } from '@storybook/addon-info';

import 'font-awesome/css/font-awesome.css';
// import 'bootstrap/dist/css/bootstrap.css';
import 'react-select/dist/react-select.css';
import '../src/site.css';

import 'react-dates/initialize';

setDefaults({
  header: false, // Toggles display of header with component name and description
  inline: true, // Displays info inline vs click button to view
  source: true
});
setAddon(infoAddon);

const req = require.context('../src/components', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
