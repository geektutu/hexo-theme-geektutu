import React from 'react';
import reactDOM from 'react-dom'
import App from './routes'
import store from './store'
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';


reactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
)