import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './reducers/user';
import registerReducer from './reducers/register';
import createSagaMiddleware from 'redux-saga';
import rootSaga, { watcherSaga } from './sagas/rootSaga';

const sagaMidleware = createSagaMiddleware();

const rootReducer = combineReducers({
  user: userReducer,
  register: registerReducer,
});

export const store = createStore(
  rootReducer,
  {},
  applyMiddleware(sagaMidleware)
);

sagaMidleware.run(watcherSaga);

export default store;
