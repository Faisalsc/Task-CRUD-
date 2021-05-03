import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './index.css';
import TaskManagement from './components/task';
import store from './actions/store';
ReactDOM.render(
  <Provider store={store}>
    <TaskManagement />
  </Provider>,
  document.getElementById('root')
);
