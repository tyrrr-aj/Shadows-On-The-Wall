import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export default () => {
  const store = createStore(
    combineReducers({
    }),
    composeEnhancers(applyMiddleware(...middleware))
  );

  sagaMiddleware.run(rootSaga);
  return store;
};
