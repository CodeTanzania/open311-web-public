import React from 'react';
import { render } from 'react-dom';
// import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import store from './store';
import Home from 'Home';
//Boostraping css
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-select/dist/react-select.css';
import './main.css';

import 'react-dates/initialize';



render(
	//Connect redux store with react components
	<Provider store={store}>
		<Home />
	</Provider>,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept();
}
