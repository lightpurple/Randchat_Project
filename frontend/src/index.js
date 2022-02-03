import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from "react-modal";
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer, { rootSaga } from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
ReactModal.setAppElement("#root");

const rootElement = document.getElementById("root");
// import { tempSetUser } from './modules/user';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  rootElement
);


