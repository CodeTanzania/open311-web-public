import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from 'reducers';
import Home from 'Home';
import './index.css';
// import { BrowserRouter as Router } from 'react-router-dom';

//create redux store
const getStore = () => {
	const locStore = createStore(reducers, applyMiddleware(thunk));

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('reducers', () => {
			const nextRootReducer = require('reducers/index');
			locStore.replaceReducer(nextRootReducer);
		});
	}

	return locStore;
};


render(
	//Connect redux store with react components
	<Provider store={getStore()}>
		<Home />
	</Provider>,
	document.getElementById('root')
);

// if (module.hot) {
// 	module.hot.accept();
// }
