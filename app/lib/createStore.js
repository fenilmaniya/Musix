import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Reactotron from 'reactotron-react-native'

import reducers from '../reducers';
import sagas from '../sagas';

let sagaMiddleware;
let enhancers;

if (__DEV__) {
	const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
	sagaMiddleware = createSagaMiddleware({
		sagaMonitor: Reactotron.createSagaMonitor()
	});

  enhancers = compose(
		applyMiddleware(reduxImmutableStateInvariant),
		applyMiddleware(sagaMiddleware),
		Reactotron.createEnhancer(),
	);
} else {
  sagaMiddleware = createSagaMiddleware();
	enhancers = compose(
		applyMiddleware(sagaMiddleware)
	);
}

const store = createStore(reducers, enhancers);
sagaMiddleware.run(sagas);

export default store;