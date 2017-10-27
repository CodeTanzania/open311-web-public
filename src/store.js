import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'reducers';

let store = createStore(reducers, applyMiddleware(thunk));

function init() {

    if (module.hot) {
        module.hot.accept('./reducers/index.js', () => {
            const newReducer = require('./reducers/index.js').default;
            store.replaceReducer(newReducer);
        });
    }

    return store;
}

export default init();