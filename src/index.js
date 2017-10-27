import React from 'react';
import { render } from 'react-dom';
// import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import store from './store';
import Home from 'Home';
import './index.css';


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
