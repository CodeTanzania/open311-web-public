import React from 'react';
import { render } from 'react-dom';
// import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Home from 'Home';
import Issues from 'Map';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import 'react-dates/initialize';
import 'font-awesome/css/font-awesome.css';
import 'react-select/dist/react-select.css';
import './site.css';
import './leaflet.css';
import store from './store';


// Create a browser history in this case
const history = createHistory();

render(
  // Connect redux store with react components
  <Provider store={store(history)}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/issues" component={Issues} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
