import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import todoSagas from './sagas/todoSagas';

const sagaMiddleware = createSagaMiddleware(); 

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware) 
);

sagaMiddleware.run(todoSagas); 

export default store;
