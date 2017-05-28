import React from 'react';
import reactDOM from 'react-dom'
import App from './App'
import configureStore from './configureStore'
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';


reactDOM.render(
    <Provider store={configureStore(window.__REDUX_DATA__)}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
)