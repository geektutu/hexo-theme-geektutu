import React from "react";
import {Route} from "react-router-dom";
import Hello from "./components/Hello";
import Counter from "./components/Counter";

export default () => (
    <div>
      <Route path="/hello" component={Hello} />
      <Route path="/counter" component={Counter} />
    </div>
)

