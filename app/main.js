import React from "react";
import reactDOM from "react-dom";
import App from "./components/App/index";
import configureStore from "./configureStore";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import './style/reset.css'
import './style/normal.css'
import './style/layout.css'
import './style/color.css'

reactDOM.render(
    <Provider store={configureStore(window.__REDUX_DATA__)}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
)