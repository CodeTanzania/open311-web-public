import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'reducers';
import { routerMiddleware } from 'react-router-redux';






function init(history) {
    // Build the middleware for intercepting and dispatching navigation actions
    const navMiddleware = routerMiddleware(history);

    let store = createStore(reducers, applyMiddleware(thunk, navMiddleware));

    if (module.hot) {
        module.hot.accept('./reducers/index.js', () => {
            const newReducer = require('./reducers/index.js').default;
            store.replaceReducer(newReducer);
        });
    }

    return store;
}

export default init;