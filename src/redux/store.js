import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagaMiddlewareCustom from './middleware';
import sagas from './sagas';

const middleware = [];
const sagaMiddleware = createSagaMiddleware();


middleware.push(sagaMiddlewareCustom)
middleware.push(sagaMiddleware)
const store = createStore(
    reducers,
    applyMiddleware(...middleware)
);

sagaMiddleware.run(sagas);

export default store